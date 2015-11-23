import { Vector } from "./Vector";

export class Ray {
    private origin: Vector;
    private direction:  Vector;
    private distance: number = 0;
    private iteration: number = 8;

    constructor (origin: Vector, direction: Vector, iteration?: number) {
        this.origin = origin;
        this.direction = Vector.normalized(direction);

        if (iteration) {
            this.iteration = iteration;
        }
    }

    public getDirection (): Vector {
        return this.direction;
    }

    public getDistance (): number {
        return this.distance;
    }

    public getIteration (): number {
        return this.iteration;
    }

    public getOrigin (): Vector {
        return this.origin;
    }

    public getHitPoint (): Vector {
        return Vector.add(this.origin, Vector.scaled(this.direction, this.distance));
    }

    public setDistance (distance: number): void {
        this.distance = distance;
    }

    public setIteration (iteration: number): void {
        this.iteration = iteration;
    }
}
