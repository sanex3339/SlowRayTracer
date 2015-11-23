import { AbstractObject } from "./AbstractObject";
import { Color } from "../Color/Color";
import { Material } from "../Material";
import { Ray } from "../Ray";
import { RGBColor } from "../Color/RGBColor";
import { Vector } from "../Vector";

export class Plane extends AbstractObject {
    private normal: Vector;
    private offset: number;
    private material: Material = new Material(new Color(new RGBColor(115, 115, 115)), 0);
    private type: string = 'surface';

    constructor (normal: Vector, offset: number = 0) {
        super ();

        this.offset = offset;
        this.normal = normal;
    }

    public getIntersectData (ray: Ray): any {
        let hitPoint: Vector,
            normal: Vector = this.getNormal(),
            numerator: number,
            denominator: number,
            distance: number;

        numerator = - Vector.dot(normal, ray.getOrigin()) + this.offset;
        denominator = Vector.dot(normal, ray.getDirection());

        if (denominator > 0) {
            return;
        }

        distance = numerator / denominator;

        ray.setDistance(distance);
        hitPoint = ray.getHitPoint();

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
