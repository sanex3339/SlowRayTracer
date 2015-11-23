export class RGBColor {
    public red: number;
    public green: number;
    public blue: number;

    constructor (red: number, green: number, blue: number) {
        this.red = RGBColor.toFloat(red);
        this.green = RGBColor.toFloat(green);
        this.blue = RGBColor.toFloat(blue);
    }

    private static toFloat (color: number): number {
        return color === 0 ? color : color / 255;
    }
}