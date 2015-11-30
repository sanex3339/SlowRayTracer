import { RTMath } from "../RTMath";
import { AbstractObject } from "./AbstractObject";
import { Color } from "../Color/Color";
import { Material } from "../Material";
import { Ray } from "../Ray";
import { RGBColor } from "../Color/RGBColor";
import { Vector } from "../Vector";

export class Polygon extends AbstractObject {
    private vertices: Vector[];
    private material: Material = new Material(Color.gray);

    constructor (...vertices: Vector[]) {
        super ();

        this.vertices = vertices;
    }

    public getIntersectData (ray: Ray): any {
        let distance: number,
            distanceFromAxisCenter: number,
            hitPoint: Vector,
            normal: Vector = this.getNormal(),
            numerator: number,
            denominator: number;

        distanceFromAxisCenter = Vector.dot(this.vertices[0], normal);

        denominator = Vector.dot(normal, ray.getDirection());
        numerator = -Vector.dot(normal, ray.getOrigin()) + distanceFromAxisCenter;

        distance = numerator / denominator;

        if (distance < RTMath.EPSILON) {
            return;
        }

        hitPoint = ray.getHitPoint(distance);

        for (let i = 0, verticesLength = this.vertices.length; i < verticesLength; i++) {
            let vertex1: Vector = this.vertices[i],
                vertex2: Vector;

            if (i === verticesLength - 1) {
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

        return {
            hitPoint: hitPoint,
            normal: normal,
            distance: distance
        };
    }

    public getMaterial (): Material {
        return this.material;
    }

    public getNormal (): Vector {
        let edge1: Vector = Vector.substract(this.vertices[2], this.vertices[0]),
            edge2: Vector = Vector.substract(this.vertices[1], this.vertices[0]);

        return Vector.normalize(Vector.cross(edge1, edge2));
    }

    public getPosition (): Vector {
        return this.vertices[0];
    }


    public getRandomPoint (): Vector {
        return new Vector(0, 0, 0);
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
