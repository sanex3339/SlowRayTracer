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
    private material: Material = new Material(new Color(new RGBColor(115, 115, 115)), 0);
    private type: string = 'surface';

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
            Vector.scaled(
                ray.getDirection(),
                t
            )
        );

        distance = Vector.substract(
            hitPoint,
            ray.getOrigin()
        ).getLength();

        return {
            point: hitPoint,
            distance
        };
    }

    public getMaterial (): Material {
        return this.material;
    }

    public getNormal (): Vector {
        return this.normal;
    }

    public getType (): string {
        return this.type;
    }

    public setMaterial (material: Material): this {
        this.material = material;

        return this;
    }
}
