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
import {FloatColor} from "./Color/FloatColor";

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
        let u: number = Math.random(),
            v: number = Math.random(),
            r: number = Math.sqrt(u),
            angle: number = 2 * Math.PI * v,
            sdir: Vector,
            tdir: Vector;

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
        let color: Color = Color.black,
            cost: number,
            intersection = this.trace(ray),
            lightSamplingColor: Color,
            newDirection: Vector,
            newPoint: Vector,
            randFactor = 1,
            rayIteration: number = ray.getIteration(),
            tempColor: Color;

        if (rayIteration >= 5) {
            if (Math.random() <= 0.1) {
                return Color.black;
            }

            randFactor = 1 / (1 - 0.1);
        }

        if (!intersection.getIntersect()) {
            return Color.black;
        }

        lightSamplingColor = Color.black;

        for (let light of this.scene.getObjects()) {
            if (light.getMaterial().getEmission() == Color.black) {
                continue;
            }

            lightSamplingColor = lightSamplingColor
                .add(this.getLightPower(ray, intersection, light));
        }

        color = lightSamplingColor.scaled(ray.getIteration()).add(
            intersection
                .getOwner()
                .getMaterial()
                .getColor()
                .multiple(
                    intersection
                        .getOwner()
                        .getMaterial()
                        .getEmission()
                        .scaled(randFactor)
                )
        );

        newDirection = this.cosineSampleHemisphere(intersection.getNormal());

        if (Vector.dot(newDirection, ray.getDirection()) > 0) {
            newPoint = Vector.add(
                ray.getOrigin(),
                Vector.scale(
                    ray.getDirection(),
                    intersection.getDistanceFromOrigin() * (1 + RTMath.EPSILON)
                )
            );
        } else {
            newPoint = Vector.add(
                ray.getOrigin(),
                Vector.scale(
                    ray.getDirection(),
                    intersection.getDistanceFromOrigin() * (1 - RTMath.EPSILON)
                )
            );
        }

        cost = Vector.dot(newDirection, intersection.getNormal());
        tempColor = this.getColor(
            new Ray(
                newPoint,
                newDirection,
                ++rayIteration
            )
        );

        return color.add(
            tempColor
                .multiple(
                    intersection
                        .getOwner()
                        .getMaterial()
                        .getColor()
                )
                .scaled(cost)
                .scaled(0.1)
                .scaled(randFactor)
        );
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

    private getLightPower (ray: Ray, intersect: any, object: AbstractObject): any {
        let l = object.getRandomPoint();

        let shadowRay = this.trace(
            new Ray(
                intersect.getHitPoint(),
                Vector.substract(
                    Vector.substract(
                        object.getPosition(),
                        l
                    ),
                    intersect.getHitPoint()
                )
            )
        );

        if (
            shadowRay.getIntersect() &&
            shadowRay.getOwner().getMaterial().getEmissionValue() > 0
        ) {
            return intersect
                .getOwner()
                .getMaterial()
                .getColor();
        } else {
            return Color.black;
        }

        /*let lightPower = object.getMaterial().getEmission(),
            lightRandomPoint: Vector,
            shadowRay: IntersectPoint,
            resultPower: number = 0;

        lightRandomPoint = object.getRandomPoint();

        shadowRay = this.trace(
            new Ray(
                intersect.getHitPoint(),
                Vector.substract(
                    Vector.substract(
                        object.getPosition(),
                        lightRandomPoint
                    ),
                    intersect.getHitPoint()
                )
            )
        );

        if (
            shadowRay.getIntersect() &&
            shadowRay.getOwner().getMaterial().getEmissionValue() > 0
        ) {
            resultPower = 1;
        }

        return resultPower;

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

        /*return resultPower;*/
    }

    private trace (ray: Ray): IntersectPoint {
        let intersection = new IntersectPoint(),
            intersectData: any,
            minDistance: number = Infinity,
            sceneObjects: AbstractObject[] = this.scene.getObjects();

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
        const randoMultiplier = 0.5,
              spp = 1;

        let buffer: number[],
            color: Color,
            rand: number,
            ray: Ray;

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        while (true) {
            buffer = [];

            let i = 0;

            for (let y = 0; y < this.screenHeight; y++) {
                for (let x = 0; x < this.screenWidth; x++) {
                    color = Color.black;

                    for (let iteration = 0; iteration < spp; iteration++) {
                        rand = 0;

                        if (Math.random() > 0.5) {
                            rand += Math.random() * randoMultiplier;
                        } else {
                            rand -= Math.random() * randoMultiplier;
                        }

                        ray = new Ray(
                            this.scene.getCamera().getPosition(),
                            this.getPerspectiveVector(x + rand, y + rand)
                        );

                        color = color.add(this.getColor(ray))
                    }

                    this.buffer[i] = color.divide(spp);

                    for (let component in this.buffer[i].getColor()) {
                        this.buffer[i][component] = Color.sRGBEncode(this.buffer[i][component]);
                    }

                    buffer.push(this.buffer[i].getColor()['red']);
                    buffer.push(this.buffer[i].getColor()['green']);
                    buffer.push(this.buffer[i].getColor()['blue']);

                    i++;
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
            objects: [
                /*new Sphere(new Vector(0, 630, 0), 150)
                    .setMaterial(new Material(Color.gray, new Color(new FloatColor(10000, 10000, 10000)))),*/
                new Polygon(
                    new Vector(-700, 700, -700),
                    new Vector(700, 700, -700),
                    new Vector(-700, 700, 700)
                ).setMaterial(new Material(new Color(new RGBColor(0.75 * 255, 0.75 * 255, 0.75 * 255))).setLambertCoeff(1)),
                new Plane(new Vector(0, -1, 0), new Vector (0, 700, 0))
                    .setMaterial(new Material(new Color(new RGBColor(215, 215, 215)), new Color(new FloatColor(30, 30, 30)))),
                new Plane(new Vector(-1, 0, 0), new Vector (700, 0, 0)).setMaterial(new Material(new Color(new RGBColor(0.3 * 255, 255, 0.1 * 255))).setLambertCoeff(1)),
                new Plane(new Vector(1, 0, 0), new Vector (-700, 0, 0)).setMaterial(new Material(new Color(new RGBColor(255, 0.3 * 255, 0.1 * 255))).setLambertCoeff(1)),
                new Plane(new Vector(0, 0, -1), new Vector (0, 0, 700)).setMaterial(new Material(new Color(new RGBColor(0.75 * 255, 0.75 * 255, 0.75 * 255))).setLambertCoeff(1)),
                new Plane(new Vector(0, 0, 1), new Vector (0, 0, -700)).setMaterial(new Material(Color.black).setLambertCoeff(1)),
                // bottom plane
                /*new Sphere(new Vector(-250, -500, 450), 200)
                    .setMaterial(new Material(Color.black, 1)),*/
                new Sphere(new Vector(0, -300, 400), 400)
                    .setMaterial(new Material(Color.gray))
            ]
        })
    );

    tracer.render(data[0], data[1]);
};