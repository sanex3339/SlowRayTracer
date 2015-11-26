import { Vector } from "./Vector";

export class Ray {
    private origin: Vector;
    private direction:  Vector;
    private iteration: number = 5;

    constructor (origin: Vector, direction: Vector, iteration?: number) {
        this.origin = origin;
        this.direction = Vector.normalize(direction);

        if (iteration) {
            this.iteration = iteration;
        }
    }

    public getOrigin (): Vector {
        return this.origin;
    }

    public getDirection (): Vector {
        return this.direction;
    }

    public getIteration (): number {
        return this.iteration;
    }

    public getHitPoint (distance: number): Vector {
        return Vector.add(this.origin, Vector.scale(this.direction, distance));
    }

    public setIteration (iteration: number): void {
        this.iteration = iteration;
    }
}
