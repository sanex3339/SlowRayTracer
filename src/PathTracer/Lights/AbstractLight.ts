import { Material } from "../Material";
import { Ray } from "../Ray";
import { Vector } from "../Vector";

export abstract class AbstractLight {
    public abstract getFadeRadius (): number;
    public abstract getPosition (): Vector;
    public abstract getPower (): number;
    public abstract getRadius (): number;
    public abstract getIntersectData (ray: Ray): any;
    public abstract getNormal (point: Vector): Vector;
    public abstract getMaterial (): Material;
    public abstract getRandomPoint (): Vector;
    public abstract setMaterial (material: Material): this;
}
