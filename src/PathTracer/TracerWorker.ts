/// <reference no-default-lib="true"/>
/// <reference path="lib/lib.webworker.d.ts" />

import { AbstractLight } from "./Lights/AbstractLight";
import { AbstractObject } from "./Objects/AbstractObject";
import { Camera } from "./Camera";
import { Color } from "./Color/Color";
import { IntersectPoint } from "./IntersectPoint";
import { Material } from "./Material";
import { Plane } from "./Objects/Plane";
import { Polygon } from "./Objects/Polygon";
import { Ray } from "./Ray";
import { RGBColor } from "./Color/RGBColor";
import { RTMath } from "./RTMath";
import { Scene } from "./Scene";
import { Sphere } from "./Objects/Sphere";
import { SphericalLight } from "./Lights/SphericalLight";
import { Vector } from "./Vector";

class Tracer {
    private scene: Scene;
    private pixelSamples: number = 4;
    private shadowSamples: number = 50;
    private giSamples: number = 50;
    private aoSamples: number = 50;
    private screenWidth: number = 250;
    private screenHeight: number = 250;

    private cosineSampleHemisphere (normal: Vector): Vector {
        let u = Math.random();
        let v = Math.random();
        let r = Math.sqrt(u);
        let angle = 2 * Math.PI * v;

        let sdir,
            tdir;

        if (Math.abs(normal.getCoordinates()['x']) < 0.5) {
            sdir = Vector.cross(normal, new Vector(1,0,0));
        } else {
            sdir = Vector.cross(normal, new Vector(0,1,0));
        }

        tdir = Vector.cross(normal, sdir);

        return Vector.add(
            Vector.scale(normal,  Math.sqrt(1 - u)),
            Vector.add(
                Vector.scale(sdir, r * Math.cos(angle)),
                Vector.scale(tdir, r * Math.sin(angle))
            )
        );
    }

    private getColor (ray: Ray, recurcive: boolean = true): Color {
        let intersection = this.trace(ray),
            diffuseColor: Color = Color.black,
            reflectColor: Color = Color.black;

        if (!intersection.getIntersect()) {
            return Color.black;
        }

        diffuseColor = this.getDiffuseColor(ray, intersection, recurcive);

        if (recurcive) {
            reflectColor = this.getReflectionColor(ray, intersection);
        }

        return diffuseColor.add(reflectColor);
    }

    private getDiffuseColor (ray: Ray, intersect: any, recursive: boolean = true): Color {
        let lambColor: Color,
            phongColor: Color,
            radianceColor: Color,
            pixelColor: Color = Color.black,
            radianceRandomDirection: Vector,
            lightDirection: Vector,
            lightPower: number,
            reflectPhongVectorDir: Vector,
            lambCos: number,
            phongCos: number,
            phong: number;

        for (let light of this.scene.getLights()) {
            if (intersect.getOwner() instanceof AbstractLight) {
                return intersect.getOwner()
                    .getMaterial()
                    .getColor();
            }

            lightPower = this.getLightPower(intersect, light);

            lambColor = Color.black;
            phongColor = Color.black;
            radianceColor = Color.black;

            lightDirection = Vector.normalize(
                Vector.substract(
                    intersect.getHitPoint(),
                    light.getPosition()
                )
            );

            //gi
            if (recursive) {
                for (let i = 0; i < this.giSamples; i++) {
                    let radianceInRandomDirection: Color;

                    radianceRandomDirection = this.cosineSampleHemisphere(
                        intersect.getOwner().getNormal(intersect.getHitPoint())
                    );

                    radianceInRandomDirection = this.getColor(
                        new Ray(
                            intersect.getHitPoint(),
                            radianceRandomDirection
                        ),
                        false
                    );

                    radianceColor = radianceColor
                        .add(radianceInRandomDirection)
                }
            }

            radianceColor = radianceColor.divide(this.giSamples);

            // lambert

            lambCos = -Vector.dot(
                lightDirection,
                intersect.getNormal()
            );

            lambColor = lambColor.add(
                intersect
                    .getOwner()
                    .getMaterial()
                    .getColor()
                    .add(radianceColor)
                    .multiple(
                        light.getMaterial()
                            .getColor()
                            .scaled(
                                lightPower * lambCos * intersect.getOwner().getMaterial().getLambertCoeff()
                            )
                    )
            );

            // phong

            reflectPhongVectorDir = Vector.reflect(
                lightDirection,
                intersect.getNormal()
            );
            phongCos = -Vector.dot(reflectPhongVectorDir, ray.getDirection());

            if (phongCos > 0) {
                phong = Math.pow(phongCos, 35);
                phongColor = phongColor.add(
                    intersect.getOwner()
                        .getMaterial()
                        .getColor()
                        .multiple(
                            light.getMaterial()
                                .getColor()
                                .scaled(
                                    lightPower * phong * intersect.getOwner().getMaterial().getPhongCoeff()
                                )
                        )
                );
            }

            //ambient occlusion
            let c = 0;

            for (let i = 0; i < this.aoSamples; i++) {
                let dir = this.cosineSampleHemisphere(intersect.getOwner().getNormal(intersect.getHitPoint()));

                let aoIntersect = this.trace(
                    new Ray(
                        intersect.getHitPoint(),
                        dir
                    )
                );

                if (!aoIntersect.getIntersect()) {
                    continue;
                }

                if (aoIntersect.getDistanceFromOrigin() > 200) {
                    continue;
                }

                c++;
            }

            pixelColor = pixelColor.add(
                lambColor.multiple(Color.white.scaled(1 - (c * 0.67 / this.aoSamples))).add(phongColor)
            );
        }

        return pixelColor;
    }

    private getReflectionColor (ray: Ray, intersect: any): any {
        let rayIteration: number = ray.getIteration(),
            reflectionColor: Color,
            reflectionValue: number = intersect.getOwner().getMaterial().getReflectionValue(),
            reflectedRay: Vector;

        ray.setIteration(--rayIteration);

        if (
            rayIteration === 0 ||
            reflectionValue === 0
        ) {
            return Color.black;
        }

        reflectedRay = Vector.reflect(
            ray.getDirection(),
            intersect.getNormal()
        );

        reflectionColor = this.getColor(
            new Ray(intersect.getHitPoint(), reflectedRay, rayIteration)
        ).scaled(reflectionValue);

        return reflectionColor;
    }

    private getPerspectiveVector (x: number, y: number) {
        let camera: Camera = this.scene.getCamera();

        return Vector.normalize(
            Vector.add(
                camera.getForwardVector(),
                Vector.add(
                    Vector.scale(
                        camera.getRightVector(),
                        camera.recenterX(x)
                    ),
                    Vector.scale(
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
            shadowRay: IntersectPoint,
            resultPower: number = 0;

        for (let i = 0; i < this.shadowSamples; i++) {
            lightRandomPoint = light.getRandomPoint();

            shadowRay = this.trace(
                new Ray(
                    intersect.getHitPoint(),
                    Vector.substract(
                        Vector.substract(
                            light.getPosition(),
                            lightRandomPoint
                        ),
                        intersect.getHitPoint()
                    )
                )
            );

            if (!shadowRay.getIntersect()) {
                continue;
            }

            if (!(shadowRay.getOwner() instanceof AbstractLight)) {
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
                        intersect.getHitPoint()
                    ).getLength() * (lightPower / light.getFadeRadius())
                )
            ) / this.shadowSamples;
        }

        return resultPower;
    }

    private trace (ray: Ray): IntersectPoint {
        let intersection = new IntersectPoint(),
            intersectData: any,
            minDistance: number = Infinity,
            sceneObjects: AbstractObject[]&AbstractLight[] = this.scene.getObjects().concat(this.scene.getLights());

        for (let object of sceneObjects) {
            intersectData = object.getIntersectData(ray);

            if (
                intersectData &&
                intersectData['distance'] < minDistance
            ) {
                minDistance = intersectData['distance'];

                intersection.setIntersect();
                intersection.setHitPoint(intersectData['hitPoint']);
                intersection.setNormal(intersectData['normal']);
                intersection.setDistanceFromOrigin(intersectData['distance']);
                intersection.setOwner(object);
            }
        }

        return intersection;
    }

    public render (screenWidth: number, screenHeight: number, x: number, y: number): void {
        const randoMultiplier = 0.5;

        let color: Color = Color.black,
            rand: number,
            ray: Ray,
            rgbColor: {
                red: number,
                green: number,
                blue: number
            };

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        for (let sample = 0; sample < this.pixelSamples; sample++) {
            rand = 0;

            if (this.pixelSamples > 1) {
                if (sample % 2) {
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
                new SphericalLight(new Vector (0, 600, 0), 0.6, 100)
                    .setMaterial(new Material(Color.white)),
                new SphericalLight(new Vector (0, 0, 0), 0.6, 150)
                    .setMaterial(new Material(new Color(new RGBColor(255, 235, 200))))
            ],
            objects: [
                // new Plane(new Vector(0, 1, 0), new Vector (0, -400, 0)).setMaterial(new Material(Color.gray, 0)),
                // bottom plane
                new Polygon(
                    new Vector(-700, -700, -700),
                    new Vector(700, -700, -700),
                    new Vector(700, -700, 700),
                    new Vector(-700, -700, 700)
                ).setMaterial(new Material(Color.white, 0).setLambertCoeff(1)),
                // front plane
                new Polygon(
                    new Vector(-700, -700, 700),
                    new Vector(700, -700, 700),
                    new Vector(700, 700, 700),
                    new Vector(-700, 700, 700)
                ).setMaterial(new Material(Color.white, 0).setLambertCoeff(1)),
                // top plane
                new Polygon(
                    new Vector(-700, 700, 700),
                    new Vector(700, 700, 700),
                    new Vector(700, 700, -700),
                    new Vector(-700, 700, -700)
                ).setMaterial(new Material(Color.white, 0).setLambertCoeff(1)),
                //right plane
                new Polygon(
                    new Vector(700, -700, 700),
                    new Vector(700, -700, -700),
                    new Vector(700, 700, -700),
                    new Vector(700, 700, 700)
                ).setMaterial(new Material(Color.blue).setLambertCoeff(1)),
                //left plane
                new Polygon(
                    new Vector(-700, -700, -700),
                    new Vector(-700, -700, 700),
                    new Vector(-700, 700, 700),
                    new Vector(-700, 700, -700)
                ).setMaterial(new Material(Color.red, 0).setLambertCoeff(1)),
                // back plane
                new Polygon(
                    new Vector(700, -700, -700),
                    new Vector(-700, -700, -700),
                    new Vector(-700, 700, -700),
                    new Vector(700, 700, -700)
                ).setMaterial(new Material(Color.black, 0).setLambertCoeff(1)),
                new Sphere(new Vector(-250, -500, 450), 200)
                    .setMaterial(new Material(Color.black, 1)),
                new Sphere(new Vector(250, -500, 400), 200)
                    .setMaterial(new Material(Color.green, 0))
            ]
        })
    );

    tracer.render(data[0], data[1], data[2], data[3]);
};