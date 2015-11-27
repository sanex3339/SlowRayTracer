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
    private buffer: Color[] = [];
    private scene: Scene;
    private screenWidth: number = 250;
    private screenHeight: number = 250;

    constructor () {
        for (let i = 0; i < this.screenWidth * this.screenHeight * 3; i++) {
            this.buffer.push(Color.black);
        }
    }

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

    private getColor (ray: Ray): Color {
        let intersection = this.trace(ray),
            diffuseColor: Color = Color.black,
            reflectColor: Color = Color.black,
            rayIteration: number = ray.getIteration();

        ray.setIteration(--rayIteration);

        if (rayIteration === 0) {
            return Color.black;
        }

        if (!intersection.getIntersect()) {
            return Color.black;
        }

        diffuseColor = this.getDiffuseColor(ray, intersection);
        reflectColor = this.getReflectionColor(ray, intersection);

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
            let radianceInRandomDirection: Color;

            radianceRandomDirection = this.cosineSampleHemisphere(
                intersect.getOwner().getNormal(intersect.getHitPoint())
            );

            radianceInRandomDirection = this.getColor(
                new Ray(
                    intersect.getHitPoint(),
                    radianceRandomDirection,
                    ray.getIteration()
                )
            );

            radianceColor = radianceColor
                .add(radianceInRandomDirection);



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
                    .multiple(
                        light.getMaterial()
                            .getColor()
                            .scaled(
                                lightPower * lambCos
                            )
                            .add(radianceColor.divide(Math.PI))

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
            /*let c = 0;

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
            }*/

            /*pixelColor = pixelColor.add(
                lambColor.multiple(Color.white.scaled(1 - (c * 0.67 / this.aoSamples))).add(phongColor)
            );*/

            pixelColor = pixelColor.add(
                lambColor.add(phongColor)
            );
        }

        return pixelColor;
    }

    private getReflectionColor (ray: Ray, intersect: any): any {
        let reflectionColor: Color,
            reflectionValue: number = intersect.getOwner().getMaterial().getReflectionValue(),
            reflectedRay: Vector;

        if (reflectionValue === 0) {
            return Color.black;
        }

        reflectedRay = Vector.reflect(
            ray.getDirection(),
            intersect.getNormal()
        );

        reflectionColor = this.getColor(
            new Ray(intersect.getHitPoint(), reflectedRay, ray.getIteration())
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

        if (
            shadowRay.getIntersect() &&
            shadowRay.getOwner() instanceof AbstractLight
        ) {
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
            );
        }


        /*lightRandomPoint = this.cosineSampleHemisphere(
            intersect.getOwner().getNormal(intersect.getHitPoint())
        );

        shadowRay = this.trace(
            new Ray(
                intersect.getHitPoint(),
                lightRandomPoint
            )
        );

        if (
            shadowRay.getIntersect() &&
            shadowRay.getOwner() instanceof AbstractLight
        ) {
            resultPower = (
                (
                    Vector.substract(
                        Vector.substract(
                            light.getPosition(),
                            lightRandomPoint
                        ),
                        intersect.getHitPoint()
                    ).getLength() * (lightPower / light.getFadeRadius())
                )
            );

            if (resultPower < 0) {
                resultPower = 0;
            }
        }*/

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

    public render (screenWidth: number, screenHeight: number): void {
        const randoMultiplier = 0.5;

        let buffer: number[],
            color: Color,
            rand: number,
            ray: Ray;

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        while (true) {
            buffer = [];

            for (let iteration = 0; iteration < 1; iteration++) {
                let i = 0;

                for (let y = 0; y < this.screenHeight; y++) {
                    for (let x = 0; x < this.screenWidth; x++) {
                        rand = 0;

                        if (Math.random() > 0.5) {
                            rand += Math.random() * randoMultiplier;
                        }  else {
                            rand -= Math.random() * randoMultiplier;
                        }

                        ray = new Ray(
                            this.scene.getCamera().getPosition(),
                            this.getPerspectiveVector(x + rand, y + rand)
                        );

                        this.buffer[i] = Color.black.add(this.getColor(ray));

                        for (let component in this.buffer[i].getColor()) {
                            this.buffer[i][component] = Color.sRGBEncode(this.buffer[i][component]);
                        }

                        buffer.push(this.buffer[i].getColor()['red']);
                        buffer.push(this.buffer[i].getColor()['green']);
                        buffer.push(this.buffer[i].getColor()['blue']);

                        i++;
                    }
                }
            }

            for(let  i = 0; i < this.buffer.length; i++) {
                this.buffer[i].getColor()['red'] = 0.0;
                this.buffer[i].getColor()['green'] = 0.0;
                this.buffer[i].getColor()['blue'] = 0.0;
            }

            self.postMessage(buffer);
        }
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
                new SphericalLight(new Vector (0, 600, 0), 1, 100)
                    .setMaterial(new Material(Color.white)),
                new SphericalLight(new Vector (0, 0, 0), 0.6, 150)
                    .setMaterial(new Material(new Color(new RGBColor(255, 235, 200))))
            ],
            objects: [
                new Plane(new Vector(0, 1, 0), new Vector (0, -700, 0)).setMaterial(new Material(new Color(new RGBColor(0.75 * 255, 0.75 * 255, 0.75 * 255)), 0)),
                new Plane(new Vector(0, -1, 0), new Vector (0, 700, 0)).setMaterial(new Material(new Color(new RGBColor(0.75 * 255, 0.75 * 255, 0.75 * 255)), 0)),
                new Plane(new Vector(-1, 0, 0), new Vector (700, 0, 0)).setMaterial(new Material(new Color(new RGBColor(0.25 * 255, 0.25 * 255, 0.75 * 255)), 0)),
                new Plane(new Vector(1, 0, 0), new Vector (-700, 0, 0)).setMaterial(new Material(new Color(new RGBColor(0.75 * 255, 0.25 * 255, 0.25 * 255)), 0)),
                new Plane(new Vector(0, 0, -1), new Vector (0, 0, 700)).setMaterial(new Material(new Color(new RGBColor(0.75 * 255, 0.75 * 255, 0.75 * 255)), 0)),
                new Plane(new Vector(0, 0, 1), new Vector (0, 0, -700)).setMaterial(new Material(Color.black, 0)),
                // bottom plane
                /*new Polygon(
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
                ).setMaterial(new Material(Color.black, 0).setLambertCoeff(1)),*/
                new Sphere(new Vector(-250, -500, 450), 200)
                    .setMaterial(new Material(Color.black, 1)),
                new Sphere(new Vector(250, -500, 400), 200)
                    .setMaterial(new Material(Color.green, 0))
            ]
        })
    );

    tracer.render(data[0], data[1]);
};