/*import { AbstractLight } from "./AbstractLight";
import { Color } from "./../Color/Color";
import { Material } from "./../Material";
import { Ray } from "./../Ray";
import { RGBColor } from "./../Color/RGBColor";
import { RTMath } from "./../RTMath"
import { Vector } from "./../Vector";
import { Polygon } from "../Objects/Polygon";

export class PlanarLight extends AbstractLight {
    private vertices: Vector[];
    private power: number;
    private fadeRadius: number = 1700;
    private material: Material = new Material(new Color(new RGBColor(244, 244, 244)), 0).setLambertCoeff(1);
    private type: string = 'light';

    constructor (power: number, ...vertices: Vector[]) {
        super();

        this.vertices = vertices;
        this.power = power;
    }

    public getFadeRadius (): number {
        return this.fadeRadius;
    }

    public getPosition (): Vector {
        return this.position;
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
                !PlanarLight.checkSameClockDir(
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
*/ 
//# sourceMappingURL=PlanarLight.js.map