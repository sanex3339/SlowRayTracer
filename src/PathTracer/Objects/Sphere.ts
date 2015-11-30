import { RTMath } from "../RTMath";
import { AbstractObject } from "./AbstractObject";
import { Color } from "../Color/Color";
import { Material } from "../Material";
import { Ray } from "../Ray";
import { RGBColor } from "../Color/RGBColor";
import { Vector } from "../Vector";

export class Sphere extends AbstractObject {
    private position: Vector;
    private radius: number;
    private material: Material = new Material(Color.red);

    constructor (center: Vector, radius: number) {
        super ();

        this.position = center;
        this.radius = radius;
    }

    public getIntersectData (ray: Ray): any {
        let k = Vector.substract(ray.getOrigin(), this.position),
            b: number = Vector.dot(k, ray.getDirection()),
            c: number = Vector.dot(k, k) - this.radius ** 2,
            d: number = b ** 2 - c,
            t1: number,
            t2: number,
            minT: number,
            maxT: number,
            intersectionPoint: number,
            hitPoint: Vector,
            distance: number;

        if (b > 0 || d < 0) {
            return;
        }

        if (d >= 0) {
            t1 = -b + Math.sqrt(d);
            t2 = -b - Math.sqrt(d);
            minT = Math.min(t1, t2);
            maxT = Math.max(t1, t2);

            if (minT > RTMath.EPSILON) {
                intersectionPoint = minT;
            } else {
                intersectionPoint = maxT;
            }

            if (intersectionPoint < RTMath.EPSILON) {
                return;
            }
        }

        hitPoint = Vector.add(
            Vector.scale(ray.getDirection(), intersectionPoint),
            ray.getOrigin()
        );
        distance = Vector.substract(
            hitPoint,
            ray.getOrigin()
        ).getLength();

        return {
            hitPoint: hitPoint,
            normal: this.getNormal(hitPoint),
            distance: distance
        };
    }

    public getMaterial (): Material {
        return this.material;
    }

    public getPosition (): Vector {
        return this.position;
    }

    public getRandomPoint (): Vector {
        let u = Math.random(),
            v = Math.random(),
            q = 2 * Math.PI * u,
            f = Math.pow(Math.cos(2 * v - 1), -1);

        return new Vector(
            this.radius * Math.cos(q) * Math.sin(f),
            this.radius * Math.sin(q) * Math.sin(f),
            this.radius * Math.cos(f)
        );
    }

    public getRadius (): number {
        return this.radius;
    }

    public getNormal (point: Vector): Vector {
        return Vector.normalize(
            Vector.scale(
                Vector.substract(point, this.position),
                1 / this.radius
            )
        );
    }

    public setMaterial (material: Material): this {
        this.material = material;

        return this;
    }
}
