import { AbstractObject } from "./Objects/AbstractObject";
import { Ray } from "./Ray";
import { Vector } from "./Vector";

export class IntersectPoint {
    private intersected: boolean = false;
    private hitPoint: Vector;
    private normal: Vector;
    private distanceFromOrigin: number;
    private owner: AbstractObject;

    public getIntersect (): boolean {
        return this.intersected;
    }

    public getHitPoint (): Vector {
        return this.hitPoint;
    }

    public getNormal (): Vector {
        return this.normal;
    }

    public getOwner (): AbstractObject {
        return this.owner;
    }

    public getDistanceFromOrigin (): number {
        return this.distanceFromOrigin;
    }

    public setIntersect (): void {
        this.intersected = true;
    }

    public setHitPoint (hitPoint: Vector): void {
        this.hitPoint = hitPoint
    }

    public setNormal (normal: Vector): void {
        this.normal = normal;
    }

    public setOwner (owner: AbstractObject): void {
        this.owner = owner;
    }

    public setDistanceFromOrigin (distanceFromOrigin: number): void {
        this.distanceFromOrigin = distanceFromOrigin;
    }
}
