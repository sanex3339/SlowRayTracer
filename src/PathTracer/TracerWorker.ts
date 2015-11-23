/// <reference no-default-lib="true"/>
/// <reference path="lib/lib.webworker.d.ts" />

import { Camera } from "./Camera";
import { Color } from "./Color/Color";
import { Ray } from "./Ray";
import { RGBColor } from "./Color/RGBColor";
import { RTMath } from "./RTMath";
import { Scene } from "./Scene";
import { Sphere } from "./Objects/Sphere";
import { Vector } from "./Vector";
import { Plane } from "./Objects/Plane";
import { AbstractLight } from "./Lights/AbstractLight";
import { SphericalLight } from "./Lights/SphericalLight";
import { Material } from "./Material";
import { Polygon } from "./Objects/Polygon";

class Tracer {
    private scene: Scene;
    private raysPerPixel: number = 8;
    private screenWidth: number = 250;
    private screenHeight: number = 250;

    private getColor (ray: Ray, recurcive: boolean = true): Color {
        let intersect = this.trace(ray),
            diffuseColor: Color = new Color(new RGBColor(0, 0, 0)),
            reflectColor: Color = new Color(new RGBColor(0, 0, 0));

        if (intersect['owner'] === null) {
            return new Color(new RGBColor(0, 0, 0));
        }

        diffuseColor = this.getDiffuseColor(ray, intersect, recurcive);

        if (recurcive) {
            reflectColor = this.getReflectionColor(ray, intersect);
        }

        return diffuseColor.add(reflectColor);
    }

    private getDiffuseColor (ray: Ray, intersect: any, recursive: boolean = true): Color {
        const radianceSamples = 50;
        
        let lambColor: Color,
            radianceColor: Color,
            phongColor: Color,
            pixelColor: Color = new Color(new RGBColor(0, 0, 0)),
            lightDirection: Vector,
            reflectPhongVectorDir: Vector,
            lambCos: number,
            phongCos: number,
            phong: number;

        for (let light of this.scene.getLights()) {
            // if light - return only light color
            if (intersect['ownerType'] === 'light') {
                return intersect['owner']
                    .getMaterial()
                    .getColor();
            }

            let lightPower = this.getLightPower(intersect, light);

            lambColor = new Color(new RGBColor(0, 0, 0));
            radianceColor = new Color(new RGBColor(0, 0, 0));
            phongColor = new Color(new RGBColor(0, 0, 0));
            lightDirection = Vector.normalized(
                Vector.substract(
                    intersect['point'],
                    light.getPosition()
                )
            );

            // lambert

            lambCos = -Vector.dot(
                lightDirection,
                intersect['normal']
            );

            lambColor = lambColor.add(
                intersect['owner']
                    .getMaterial()
                    .getColor()
                    .multiple(
                        light.getMaterial()
                            .getColor()
                            .scaled(
                                lightPower * lambCos * intersect['owner'].getMaterial().getLambertCoeff()
                            )
                    )
            );

            if (recursive) {
                let randDir = (normal: Vector) => {
                    while (true) {
                        let dir: Vector = new Vector(
                            Math.random() - 0.5,
                            Math.random() - 0.5,
                            Math.random() - 0.5
                        );

                        if (Vector.dot(dir, dir) > 1) {
                            continue;
                        }

                        dir = Vector.normalized(dir);

                        if (Vector.dot(dir, normal) < 0) {
                            dir = Vector.inverse(dir);
                        }

                        return dir;

                        /*let u1 = Math.random();
                        let u2 = Math.random();

                        let sin_theta = Math.sqrt(u1);
                        let cos_theta = Math.sqrt(1 - u1);

                        let  phi = 2 * Math.PI * u2;

                        let dir: Vector = new Vector(sin_theta * Math.Cos(phi),
                            cos_theta,
                            sin_theta * Math.Sin(phi));

                        let tangent: Vector;

                        if (normal.x == 0) {
                            tangent = new Vector(1, 0, 0);
                        } else {
                            tangent = Vector.normalized(new Vector(normal.z, 0, -normal.x));
                        }

                        let bitangent: Vector = Vector.cross(tangent, normal);

                        let basisTransform = new Matrix(tangent, normal, bitangent);

                        return Vector.normalized(basisTransform * dir);*/
                    }
                };

                for (let i = 0; i < radianceSamples; ++i) {
                    let dir: Vector = randDir(intersect['owner'].getNormal(intersect['point'])),
                        radianceInThatDir: Color = this.getColor(new Ray(intersect['point'], dir), false),
                        cosI: number = Vector.dot(
                            dir,
                            intersect['owner'].getNormal(intersect['point'])
                        );

                    radianceColor = radianceColor
                        .add(
                            intersect['owner']
                                .getMaterial()
                                .getColor()
                                .divide(Math.PI)
                                .multiple(
                                    radianceInThatDir
                                        .scaled(cosI)
                                )

                        )
                }
            }

            // phong

            reflectPhongVectorDir = Vector.reflect(
                lightDirection,
                intersect['normal']
            );
            phongCos = -Vector.dot(reflectPhongVectorDir, ray.getDirection());

            if (phongCos > 0) {
                phong = Math.pow(phongCos, 35);
                phongColor = phongColor.add(
                    intersect['owner']
                        .getMaterial()
                        .getColor()
                        .multiple(
                            light.getMaterial()
                                .getColor()
                                .scaled(
                                    lightPower * phong * intersect['owner'].getMaterial().getPhongCoeff()
                                )
                        )
                );
            }

            pixelColor = pixelColor.add(lambColor.add(radianceColor.divide(radianceSamples))).add(phongColor);
        }

        return pixelColor;
    }

    private getReflectionColor (ray: Ray, intersect: any): any {
        let reflectionColor: Color,
            reflectionValue: number = intersect['owner'].getMaterial().getReflectionValue(),
            reflectedRay: Vector;

        ray.setIteration(ray.getIteration() - 1);

        if (
            ray.getIteration() === 0 ||
            reflectionValue === 0
        ) {
            return new Color(new RGBColor(0, 0, 0));
        }

        reflectedRay = Vector.reflect(
            ray.getDirection(),
            intersect['normal']
        );

        reflectionColor = this.getColor(
            new Ray(intersect['point'], reflectedRay, ray.getIteration())
        ).scaled(reflectionValue);

        return reflectionColor;
    }

    private getPerspectiveVector (x: number, y: number, screenWidth: number, screenHeight: number) {
        let camera: Camera = this.scene.getCamera();

        return Vector.normalized(
            Vector.add(
                camera.getForwardVector(),
                Vector.add(
                    Vector.scaled(
                        camera.getRightVector(),
                        camera.recenterX(x)
                    ),
                    Vector.scaled(
                        camera.getUpVector(),
                        camera.recenterY(y)
                    )
                )
            )
        );
    }

    private getLightPower (intersect: any, light: AbstractLight): number {
        const sampling = 200;

        let lightPower = light.getPower(),
            lightRandomPoint: Vector,
            resultPower = 0;

        for (let i = 0; i < sampling; i++) {
            lightRandomPoint = light.getRandomPoint();

            let lightRay = this.trace(
                new Ray(
                    intersect['point'],
                    Vector.substract(
                        Vector.substract(
                            light.getPosition(),
                            lightRandomPoint
                        ),
                        intersect['point']
                    )
                )
            );

            if (lightRay['point'] === null) {
                continue;
            }

            if (lightRay['owner'] !== light) {
                continue;
            }

            resultPower += (
                lightPower -
                (
                    Vector.substract(
                        Vector.substract(
                            light.getPosition(),
                            lightRandomPoint
                        ),
                        intersect['point']
                    ).getLength() * (lightPower / light.getFadeRadius())
                )
            ) / sampling;
        }

        return resultPower;
    }

    private trace (ray: Ray): {distance: number, point: Vector, owner: any, ownerType: string} {
        let result = {
                distance: 0,
                point: null,
                normal: null,
                owner: null,
                ownerType: null
            },
            intersectData: any,
            sceneObjectsWithLights: any[] = this.scene.getObjects().concat(this.scene.getLights());

        for (let object of sceneObjectsWithLights) {
            intersectData = object.getIntersectData(ray);

            if (
                intersectData &&
                intersectData['distance'] > 0 &&
                (
                    result['owner'] === null ||
                    intersectData['distance'] < result['distance']
                )
            ) {
                result['distance'] = intersectData['distance'];
                result['point'] = intersectData['point'];
                result['owner'] = object;
                result['ownerType'] = object.getType();
                result['normal'] = result['owner'].getNormal(result['point']);
            }
        }

        return result;
    }

    public render (screenWidth: number, screenHeight: number, x: number, y: number): void {
        const randoMultiplier = 0.5;

        let color: Color,
            rand: number,
            ray: Ray,
            rgbColor: {
                red: number,
                green: number,
                blue: number
            };

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        color = new Color(new RGBColor(0, 0, 0));

        for (let iter = 0; iter < this.raysPerPixel; iter++) {
            rand = 0;

            if (this.raysPerPixel > 1) {
                if (iter % 2) {
                    rand += Math.random() * randoMultiplier;
                }  else {
                    rand -= Math.random() * randoMultiplier;
                }
            }

            ray = new Ray(
                this.scene.getCamera().getPosition(),
                this.getPerspectiveVector(x + rand, y + rand, screenWidth, screenHeight)
            );

            color = color.add(this.getColor(ray));
        }

        color = color.divide(this.raysPerPixel);

        for (let component in color) {
            color[component] = Color.sRGBEncode(color[component]);
        }

        rgbColor = Color.toRGB(color);

        self.postMessage([x, y, rgbColor.red, rgbColor.green, rgbColor.blue]);
    }

    public setScene (scene: Scene): void {
        this.scene = scene;
    }
}

onmessage = function (message) {
    var data = message.data;

    if (typeof(data) == 'string') {
        data = JSON.parse('['+data+']');
    }

    let tracer = new Tracer();

    tracer.setScene(
        new Scene({
            camera: new Camera(
                new Vector(0, 0, -699),
                new Vector(0, 0, 1),
                data[0],
                data[1]
            ),
            lights: [
                new SphericalLight(new Vector (0, 640, 0), 1.2, 50)
                    .setMaterial(new Material(new Color(new RGBColor(255, 255, 255))))
            ],
            objects: [
                //new Plane(new Vector(0, 1, 0), -400).setMaterial(new Material(new Color(new RGBColor(115, 115, 115)), 0)),
                // bottom plane
                new Polygon(
                    new Vector(-700, -700, -700),
                    new Vector(700, -700, -700),
                    new Vector(700, -700, 700),
                    new Vector(-700, -700, 700)
                ).setMaterial(new Material(new Color(new RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
                // front plane
                new Polygon(
                    new Vector(-700, -700, 700),
                    new Vector(700, -700, 700),
                    new Vector(700, 700, 700),
                    new Vector(-700, 700, 700)
                ).setMaterial(new Material(new Color(new RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
                // top plane
                new Polygon(
                    new Vector(-700, 700, -700),
                    new Vector(-700, 700, 700),
                    new Vector(700, 700, 700),
                    new Vector(700, 700, -700)
                ).setMaterial(new Material(new Color(new RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
                //right plane
                new Polygon(
                    new Vector(700, -700, 700),
                    new Vector(700, -700, -700),
                    new Vector(700, 700, -700),
                    new Vector(700, 700, 700)
                ).setMaterial(new Material(new Color(new RGBColor(0, 0, 255)), 0).setLambertCoeff(1)),
                //left plane
                new Polygon(
                    new Vector(-700, -700, -700),
                    new Vector(-700, -700, 700),
                    new Vector(-700, 700, 700),
                    new Vector(-700, 700, -700)
                ).setMaterial(new Material(new Color(new RGBColor(255, 0, 0)), 0).setLambertCoeff(1)),
                // back plane
                new Polygon(
                    new Vector(700, -700, -700),
                    new Vector(-700, -700, -700),
                    new Vector(-700, 700, -700),
                    new Vector(700, 700, -700)
                ).setMaterial(new Material(new Color(new RGBColor(0, 0, 0)), 0).setLambertCoeff(1)),
                new Sphere(new Vector(-250, -500, 450), 200)
                    .setMaterial(new Material(new Color(new RGBColor(0, 0, 0)), 1)),
                new Sphere(new Vector(250, -500, 400), 200)
                    .setMaterial(new Material(new Color(new RGBColor(0, 255, 0)), 0))
            ]
        })
    );

    tracer.render(data[0], data[1], data[2], data[3]);
};