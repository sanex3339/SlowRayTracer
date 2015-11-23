import { RTMath } from "../RTMath";
import { AbstractObject } from "./AbstractObject";
import { Color } from "../Color/Color";
import { Material } from "../Material";
import { Ray } from "../Ray";
import { RGBColor } from "../Color/RGBColor";
import { Vector } from "../Vector";

export class Sphere extends AbstractObject {
    private center: Vector;
    private radius: number;
    private material: Material = new Material(new Color(new RGBColor(255, 0, 0)), 0);
    private type: string = 'surface';

    constructor (center: Vector, radius: number) {
        super ();

        this.center = center;
        this.radius = radius;
    }

    public getIntersectData (ray: Ray): any {
        let k = Vector.substract(ray.getOrigin(), this.center),
            b: number = Vector.dot(k, ray.getDirection()),
            c: number = Vector.dot(k, k) - this.radius ** 2,
            d: number = b ** 2 - c,
            t1: number,
            t2: number,
            minT: number,
            maxT: number,
            intersectionPoint: number,
            point: Vector,
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

        point = Vector.add(
            Vector.scaled(ray.getDirection(), intersectionPoint),
            ray.getOrigin()
        );
        distance = Vector.substract(
            point,
            ray.getOrigin()
        ).getLength();

        return {
            point,
            distance
        };
    }

    public getMaterial (): Material {
        return this.material;
    }

    public getNormal (point: Vector): Vector {
        return Vector.normalized(
            Vector.scaled(
                Vector.substract(point, this.center),
                1 / this.radius
            )
        );
    }

    public getType (): string {
        return this.type;
    }

    public setMaterial (material: Material): this {
        this.material = material;

        return this;
    }
}
