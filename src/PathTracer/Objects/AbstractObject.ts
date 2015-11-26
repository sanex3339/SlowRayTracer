import { Material } from "../Material";
import { Ray } from "../Ray";
import { Vector } from "../Vector";

export abstract class AbstractObject {
    abstract getIntersectData (ray: Ray): any;
    abstract getMaterial (): Material;
    abstract setMaterial (material: Material): this;
}
