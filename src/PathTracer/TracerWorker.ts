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
    private pixelSamples: number = 4;
    private shadowSamples: number = 35;
    private aoSamples: number = 100;
    private giSamples: number = 35;
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
        let lambColor: Color,
            radianceColor: Color,
            ambientOcclusionColor: Color,
            radianceRandomDirection: Vector,
            phongColor: Color,
            pixelColor: Color = new Color(new RGBColor(0, 0, 0)),
            lightDirection: Vector,
            lightPower: number,
            reflectPhongVectorDir: Vector,
            lambCos: number,
            phongCos: number,
            phong: number;

        for (let light of this.scene.getLights()) {
            if (intersect['ownerType'] === 'light') {
                return intersect['owner']
                    .getMaterial()
                    .getColor();
            }

            lightPower = this.getLightPower(intersect, light);

            lambColor = new Color(new RGBColor(0, 0, 0));
            radianceColor = new Color(new RGBColor(0, 0, 0));
            ambientOcclusionColor = new Color(new RGBColor(0, 0, 0));
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

            let cosineWeightedDirectionSource = (normal: Vector) => {
                let Xi1 = Math.random();
                let Xi2 = Math.random();

                let theta = Math.acos(Math.sqrt(1 - Xi1));
                let  phi = 2 * Math.PI * Xi2;

                let xs = Math.sin(theta) * Math.cos(phi);
                let ys = Math.cos(theta);
                let zs = Math.sin(theta) * Math.sin(phi);

                let y = normal;
                let h = normal;
                if (
                    Math.abs(h.getCoordinates()['x']) <= Math.abs(h.getCoordinates()['y']) &&
                    Math.abs(h.getCoordinates()['x']) <= Math.abs(h.getCoordinates()['z'])
                ) {
                    h = new Vector(1, h.getCoordinates()['y'], h.getCoordinates()['z']);
                } else if (
                    Math.abs(h.getCoordinates()['y']) <= Math.abs(h.getCoordinates()['x']) &&
                    Math.abs(h.getCoordinates()['x']) <= Math.abs(h.getCoordinates()['z'])
                ) {
                    h = new Vector(h.getCoordinates()['x'], 1, h.getCoordinates()['z']);
                } else {
                    h = new Vector(h.getCoordinates()['x'], h.getCoordinates()['y'], 1);
                }


                let x = Vector.normalized(
                    new Vector(
                        h.getCoordinates()['x'] ** y.getCoordinates()['x'],
                        h.getCoordinates()['y'] ** y.getCoordinates()['y'],
                        h.getCoordinates()['z'] ** y.getCoordinates()['z']
                    )
                );

                let z = Vector.normalized(
                    new Vector(
                        x.getCoordinates()['x'] ** y.getCoordinates()['x'],
                        x.getCoordinates()['y'] ** y.getCoordinates()['y'],
                        x.getCoordinates()['z'] ** y.getCoordinates()['z']
                    )
                );

                let direction = Vector.add(
                    Vector.add(
                        Vector.scaled(x, xs),
                        Vector.scaled(y, ys)
                    ),
                    Vector.scaled(z, zs)
                );

                return Vector.normalized(direction);

                /*let basisTransform: Vector,
                    bitangent: Vector,
                    u1: number = Math.random(),
                    u2: number = Math.random(),
                    sin_theta: number = Math.sqrt(u1),
                    cos_theta: number = Math.sqrt(1 - u1),
                    phi: number = 2 * Math.PI * u2,
                    dir: Vector = new Vector(
                        sin_theta * Math.cos(phi),
                        cos_theta,
                        sin_theta * Math.sin(phi)
                    ),
                    tangent: Vector;

                if (normal.getCoordinates()['x'] == 0) {
                    tangent = new Vector(1, 0, 0);
                } else {
                    tangent = Vector.normalized(
                        new Vector(
                            normal.getCoordinates()['z'],
                            0,
                            -normal.getCoordinates()['x']
                        )
                    );
                }

                bitangent = Vector.cross(tangent, normal);

                basisTransform = new Vector(
                    Vector.dot(tangent, dir),
                    Vector.dot(normal, dir),
                    Vector.dot(bitangent, dir)
                );*/

                //return Vector.normalized(basisTransform);
            };

            if (recursive) {
                for (let i = 0; i < this.giSamples; ++i) {
                    let radianceInRandomDirection: Color,
                            cosI: number;

                    radianceRandomDirection = cosineWeightedDirectionSource(intersect['owner'].getNormal(intersect['point']));
                    radianceInRandomDirection = this.getColor(
                        new Ray(
                            intersect['point'],
                            radianceRandomDirection
                        ),
                        false
                    );
                    cosI = Vector.dot(
                        radianceRandomDirection,
                        intersect['owner'].getNormal(intersect['point'])
                    );

                    radianceColor = radianceColor
                        .add(
                            intersect['owner']
                                .getMaterial()
                                .getColor()
                                .divide(Math.PI)
                                .multiple(
                                    radianceInRandomDirection
                                        .scaled(cosI)
                                )

                        )
                }
            }

            //ambient occlusion
            let c = 0;

            for (let i = 0; i < this.aoSamples; i++) {
                let dir = cosineWeightedDirectionSource(intersect['owner'].getNormal(intersect['point']));

                let aoIntersect = this.trace(
                    new Ray(
                        intersect['point'],
                        dir
                    )
                );

                if (aoIntersect['point'] === null) {
                    continue;
                }

                if (aoIntersect['distance'] > 250) {
                    continue;
                }

                c++;
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

            pixelColor = pixelColor
                .add(
                    lambColor.add(
                        radianceColor.divide(this.giSamples)
                    )
                ).add(phongColor);

            pixelColor = pixelColor.substract(pixelColor.scaled(0.3 * c / this.aoSamples));
        }

        return pixelColor;
    }

    private getReflectionColor (ray: Ray, intersect: any): any {
        let rayIteration: number = ray.getIteration(),
            reflectionColor: Color,
            reflectionValue: number = intersect['owner'].getMaterial().getReflectionValue(),
            reflectedRay: Vector;

        ray.setIteration(--rayIteration);

        if (
            rayIteration === 0 ||
            reflectionValue === 0
        ) {
            return new Color(new RGBColor(0, 0, 0));
        }

        reflectedRay = Vector.reflect(
            ray.getDirection(),
            intersect['normal']
        );

        reflectionColor = this.getColor(
            new Ray(intersect['point'], reflectedRay, rayIteration)
        ).scaled(reflectionValue);

        return reflectionColor;
    }

    private getPerspectiveVector (x: number, y: number) {
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
        let lightPower = light.getPower(),
            lightRandomPoint: Vector,
            lightRay: any,
            resultPower: number = 0;

        for (let i = 0; i < this.shadowSamples; i++) {
            lightRandomPoint = light.getRandomPoint();

            lightRay = this.trace(
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
            ) / this.shadowSamples;
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

        for (let iter = 0; iter < this.pixelSamples; iter++) {
            rand = 0;

            if (this.pixelSamples > 1) {
                if (iter % 2) {
                    rand += Math.random() * randoMultiplier;
                }  else {
                    rand -= Math.random() * randoMultiplier;
                }
            }

            ray = new Ray(
                this.scene.getCamera().getPosition(),
                this.getPerspectiveVector(x + rand, y + rand)
            );

            color = color.add(this.getColor(ray));
        }

        color = color.divide(this.pixelSamples);

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
                new SphericalLight(new Vector (0, 640, 0), 0.7, 50)
                    .setMaterial(new Material(new Color(new RGBColor(255, 255, 255)))),
                new SphericalLight(new Vector (0, 0, 0), 0.7, 150)
                    .setMaterial(new Material(new Color(new RGBColor(255, 235, 200))))
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
                ).setMaterial(new Material(new Color(new RGBColor(79, 166, 242)), 0).setLambertCoeff(1)),
                //left plane
                new Polygon(
                    new Vector(-700, -700, -700),
                    new Vector(-700, -700, 700),
                    new Vector(-700, 700, 700),
                    new Vector(-700, 700, -700)
                ).setMaterial(new Material(new Color(new RGBColor(245, 130, 130)), 0).setLambertCoeff(1)),
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