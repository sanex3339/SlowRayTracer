import { Vector } from "./Vector";

export class Camera {
    private direction: Vector;
    private position: Vector;
    private forwardVector: Vector;
    private rightVector: Vector;
    private upVector: Vector;
    private screenWidth: number;
    private screenHeight: number;

    constructor (position: Vector, direction: Vector, screenWidth: number, screenHeight: number) {
        this.position = position;
        this.direction = Vector.normalize(direction);
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.forwardVector = Vector.normalize(Vector.substract(this.direction, this.position));
        this.rightVector = Vector.scale(
            Vector.normalize(
                Vector.cross(
                    this.forwardVector,
                    new Vector(0, -1, 0)
                )
            ),
            3
        );
        this.upVector = Vector.scale(
            Vector.normalize(
                Vector.cross(
                    this.forwardVector,
                    this.rightVector
                )
            ),
            3
        );
    }

    public getDirection (): Vector {
        return this.direction;
    }

    public getPosition (): Vector {
        return this.position;
    }

    public getForwardVector (): Vector {
        return this.forwardVector;
    }

    public getRightVector (): Vector {
        return this.rightVector;
    }

    public getUpVector (): Vector {
        return this.upVector;
    }

    public recenterX (x: number): number {
        let aspectCoeff = (this.screenHeight / this.screenWidth) * 2;

        return (x - (this.screenWidth / 2)) / aspectCoeff / this.screenWidth;
    }

    public recenterY (y: number): number {
        return -(y - (this.screenHeight / 2)) / 2 / this.screenHeight;
    }
}
