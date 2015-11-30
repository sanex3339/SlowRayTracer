import { Material } from "../Material";
import { Ray } from "../Ray";
import { Vector } from "../Vector";

export abstract class AbstractObject {
    abstract getIntersectData (ray: Ray): any;
    abstract getMaterial (): Material;
    abstract getPosition (): Vector;
    abstract getRandomPoint (): Vector;
    abstract setMaterial (material: Material): this;
}
