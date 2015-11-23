import { RTMath } from "../RTMath";
import { AbstractObject } from "./AbstractObject";
import { Color } from "../Color/Color";
import { Material } from "../Material";
import { Ray } from "../Ray";
import { RGBColor } from "../Color/RGBColor";
import { Vector } from "../Vector";

export class Polygon extends AbstractObject {
    private vertices: Vector[];
    private material: Material = new Material(new Color(new RGBColor(115, 115, 115)), 0);
    private type: string = 'surface';

    constructor (...vertices: Vector[]) {
        super ();

        this.vertices = vertices;
    }

    public getIntersectData (ray: Ray): any {
        let distance: number,
            distanceFromAxisCenter: number,
            hitPoint: Vector,
            numerator: number,
            denominator: number;

        distanceFromAxisCenter = Vector.dot(this.vertices[0], this.getNormal());

        denominator = Vector.dot(this.getNormal(), ray.getDirection());
        numerator = -Vector.dot(this.getNormal(), ray.getOrigin()) + distanceFromAxisCenter;

        distance = numerator / denominator;

        if (distance < RTMath.EPSILON) {
            return;
        }

        ray.setDistance(distance);

        hitPoint = ray.getHitPoint();

        for(let i = 0; i < this.vertices.length; i++) {
            let vertex1: Vector = this.vertices[i],
                vertex2: Vector;

            if (i === this.vertices.length - 1) {
                vertex2 = this.vertices[0];
            } else {
                vertex2 = this.vertices[i + 1];
            }

            if (
                !Polygon.checkSameClockDir(
                    Vector.substract(vertex2, vertex1),
                    Vector.substract(hitPoint, vertex1),
                    this.getNormal()
                )
            ) {
                return;
            }
        }

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
        let edge1: Vector = Vector.substract(this.vertices[2], this.vertices[0]),
            edge2: Vector = Vector.substract(this.vertices[1], this.vertices[0]);

        return Vector.normalized(Vector.cross(edge1, edge2));
    }

    public getType (): string {
        return this.type;
    }

    public setMaterial (material: Material): this {
        this.material = material;

        return this;
    }

    private static checkSameClockDir (vector1: Vector, vector2: Vector, normal: Vector): boolean {
        let normalV1V2: Vector = Vector.cross(vector2, vector1);

        return Vector.dot(normalV1V2, normal) >= 0;
    }
}