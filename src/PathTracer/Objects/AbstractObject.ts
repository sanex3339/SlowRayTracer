import { Material } from "../Material";
import { Ray } from "../Ray";
import { Vector } from "../Vector";

export abstract class AbstractObject {
    abstract getMaterial (): Material;
    abstract setMaterial (material: Material): this;
    abstract getIntersectData (ray: Ray): any;
}
