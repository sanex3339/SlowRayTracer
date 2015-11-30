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
        let p: number;

        let lambColor = Color.black;
        let phongColor = Color.black;

        for (let light of this.scene.getObjects()) {
            if (light.getMaterial().getEmissionValue() === 0) {
                continue;
            }

            //lambColor = lambColor.add(this.getLightPower(ray, intersect, light));
        }

        if (
            intersect.getOwner().getMaterial().getEmissionValue() === 0
        ) {
            p = 0;
        } else {
            p = 0.9;
        }

        let color = lambColor.add(intersect.getOwner().getMaterial().getColor().add(intersect.getOwner().getMaterial().getEmission()));

        if (Math.random() < p) {
            return color;
        }

        return this.getColor(
            new Ray(
                intersect.getHitPoint(),
                this.cosineSampleHemisphere(
                    intersect.getOwner().getNormal(intersect.getHitPoint())
                ),
                ray.getIteration()
            )
        ).multiple(color);
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

        let cos_a_max = Math.sqrt(
            1 - object.getRadius() ** 2 / Vector.dot(Vector.substract(intersect.getHitPoint(), object.getPosition()), Vector.substract(intersect.getHitPoint(), object.getPosition()))
        );

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
            let omega = 2 * Math.PI * (1 - cos_a_max);

            let nl = Vector.dot(intersect.getNormal(), ray.getDirection()) < 0 ? intersect.getNormal() : Vector.scale(intersect.getNormal(), -1);

            return intersect
                .getOwner()
                .getMaterial()
                .getColor()
                .add(
                    object
                        .getMaterial()
                        .getEmission()
                        .scaled(
                            Vector.dot(
                                l,
                                nl
                            )
                        )
                        .scaled(omega)
                )
                .scaled(1 / Math.PI);
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
            objects: [
                new Sphere(new Vector(0, 630, 0), 60)
                    .setMaterial(new Material(Color.gray, new Color(new FloatColor(400, 400, 400)))),
                new Plane(new Vector(0, 1, 0), new Vector (0, -700, 0)).setMaterial(new Material(new Color(new RGBColor(0.75 * 255, 0.75 * 255, 0.75 * 255))).setLambertCoeff(1)),
                new Plane(new Vector(0, -1, 0), new Vector (0, 700, 0)).setMaterial(new Material(new Color(new RGBColor(0.75 * 255, 0.75 * 255, 0.75 * 255))).setLambertCoeff(1)),
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