export class Vector {
    private x: number;
    private y: number;
    private z: number;

    constructor (x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getCoordinates (): {x: number, y: number, z: number} {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }

    public asArray (): number[] {
        return [
            this.x,
            this.y,
            this.z
        ];
    }

    public getLength (): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    public static scale (vector: Vector, multiplier: number): Vector {
        return new Vector(vector.x * multiplier, vector.y * multiplier, vector.z * multiplier);
    }

    public static add (vector1: Vector, vector2: Vector): Vector {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);
    }

    public static substract (vector1: Vector, vector2: Vector): Vector {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z);
    }

    public static dot (vector1: Vector, vector2: Vector): number {
        return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    }

    public static cross (vector1: Vector, vector2: Vector): Vector {
        return new Vector(
            vector1.y * vector2.z - vector1.z * vector2.y,
            vector1.z * vector2.x - vector1.x * vector2.z,
            vector1.x * vector2.y - vector1.y * vector2.x
        );
    }

    public static normalize (vector: Vector): Vector {
        return Vector.scale(vector, 1 / vector.getLength());
    }

    public static pow (vector: Vector, value: number): Vector {
        return new Vector(
            vector.y ** value,
            vector.z ** value,
            vector.x ** value
        );
    }

    public static inverse (vector: Vector): Vector {
        return Vector.scale(vector, -1);
    }

    public static reflect (vector: Vector, normal: Vector): Vector {
        let f = 2 * Vector.dot(vector, normal);

        return Vector.substract(
            vector,
            Vector.scale(normal, f)
        );
    }
}
