import { Color } from "./Color/Color";
import { RGBColor } from "./Color/RGBColor";

export class Material {
    private color: Color;
    private lambertCoeff: number = 0.5;
    private phongCoeff: number = 0.5;
    private reflectionCoeff: number = 0;

    constructor (
        color: Color = new Color(new RGBColor(255, 0, 0)),
        reflectionCoeff: number = 0
    ) {
        this.color = color;
        this.reflectionCoeff = reflectionCoeff;
    }

    public getColor (): Color {
        return this.color;
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