import { AbstractObject } from "./AbstractObject";
import { Color } from "../Color/Color";
import { Material } from "../Material";
import { Ray } from "../Ray";
import { RTMath } from "../RTMath";
import { RGBColor } from "../Color/RGBColor";
import { Vector } from "../Vector";

export class Plane extends AbstractObject {
    private normal: Vector;
    private point: Vector = new Vector(0, 0, 0);
    private material: Material = new Material(Color.gray, 0);

    constructor (normal: Vector, point?: Vector) {
        super ();

        this.normal = normal;

        if (point) {
            this.point = point;
        }
    }

    public getIntersectData (ray: Ray): any {
        let distance: number,
            hitPoint: Vector,
            t: number =
            Vector.dot(
                Vector.substract(
                    this.point,
                    ray.getOrigin()
                ),
                this.normal
            ) /
            Vector.dot(
                ray.getDirection(),
                this.getNormal()
            );

        if (t <= RTMath.EPSILON) {
            return;
        }

        hitPoint = Vector.add(
            ray.getOrigin(),
            Vector.scale(
                ray.getDirection(),
                t
            )
        );

        distance = Vector.substract(
            hitPoint,
            ray.getOrigin()
        ).getLength();

        return {
            hitPoint: hitPoint,
            normal: this.getNormal(),
            distance: distance
        };
    }

    public getMaterial (): Material {
        return this.material;
    }

    public getNormal (): Vector {
        return this.normal;
    }

    public setMaterial (material: Material): this {
        this.material = material;

        return this;
    }
}
