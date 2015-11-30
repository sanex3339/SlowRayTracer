import { Color } from "./Color/Color";
import { RGBColor } from "./Color/RGBColor";
import { Vector } from "./Vector";

export class Material {
    private color: Color;
    private emission: Color = Color.black;
    private lambertCoeff: number = 0.5;
    private phongCoeff: number = 0.5;
    private reflectionCoeff: number = 0;

    constructor (
        color?: Color,
        emission?: Color,
        reflectionCoeff?: number
    ) {
        if (color) {
            this.color = color;
        }

        if (emission) {
            this.emission = emission;
        }

        if (reflectionCoeff) {
            this.reflectionCoeff = reflectionCoeff;
        }
    }

    public getColor (): Color {
        return this.color;
    }

    public getEmission (): Color {
        return this.emission;
    }

    public getEmissionValue (): number {
        return (
            this.emission.getColor().red + this.emission.getColor().green + this.emission.getColor().blue
        ) / 3;
    }

    public getLambertCoeff(): number {
        return this.lambertCoeff;
    }

    public getPhongCoeff(): number {
        return this.phongCoeff;
    }

    public getReflectionValue (): number {
        return this.reflectionCoeff;
    }

    public setLambertCoeff(lambertCoeff: number): this {
        this.lambertCoeff = lambertCoeff;
        this.phongCoeff = 1 - lambertCoeff;

        return this;
    }

    public setPhongCoeff(phongCoeff: number): this {
        this.phongCoeff = phongCoeff;
        this.lambertCoeff = 1 - phongCoeff;

        return this;
    }
}