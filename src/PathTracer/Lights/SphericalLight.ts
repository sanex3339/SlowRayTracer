import { AbstractLight } from "./AbstractLight";
import { Color } from "./../Color/Color";
import { Material } from "./../Material";
import { Ray } from "./../Ray";
import { RGBColor } from "./../Color/RGBColor";
import { RTMath } from "./../RTMath"
import { Vector } from "./../Vector";

export class SphericalLight extends AbstractLight {
    private center: Vector;
    private radius: number = 50;
    private power: number;
    private fadeRadius: number = 2500;
    private material: Material = new Material(new Color(new RGBColor(244, 244, 244)), 0).setLambertCoeff(1);

    constructor (position: Vector, power: number, radius?: number) {
        super();

        this.center = position;
        this.power = power;

        if (radius) {
            this.radius = radius;
        }
    }

    public getFadeRadius (): number {
        return this.radius + this.fadeRadius;
    }

    public getPosition (): Vector {
        return this.center;
    }

    public getPower (): number {
        return this.power;
    }

    public getRadius (): number {
        return this.radius;
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

    public getNormal (point: Vector): Vector {
        return Vector.normalize(
            Vector.scale(
                Vector.substract(point, this.center),
                1 / this.radius
            )
        );
    }

    public getMaterial (): Material {
        return this.material;
    }

    public setMaterial (material: Material): this {
        this.material = material;

        return this;
    }
}
