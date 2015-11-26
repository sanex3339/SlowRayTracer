import { RGBColor } from "./RGBColor";
import { FloatColor } from "./FloatColor";

export class Color {
    private red: number;
    private green: number;
    private blue: number;

    public static black = new Color(new RGBColor(0, 0, 0));
    public static white = new Color(new RGBColor(255, 255, 255));
    public static gray = new Color(new RGBColor(127, 127, 127));
    public static red = new Color(new RGBColor(255, 0, 0));
    public static green = new Color(new RGBColor(0, 255, 0));
    public static blue = new Color(new RGBColor(0, 0, 255));

    constructor (color: RGBColor|FloatColor) {
        this.red = color.red;
        this.green = color.green;
        this.blue = color.blue;
    }

    public getColor (): {red: number, green: number, blue: number} {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue
        }
    }

    public add (color: Color): Color {
        return new Color(
            new FloatColor(
                this.red + color.red,
                this.green + color.green,
                this.blue + color.blue
            )
        );
    }

    public substract (color: Color): Color {
        return new Color(
            new FloatColor(
                this.red - color.red,
                this.green - color.green,
                this.blue - color.blue
            )
        );
    }

    public scaled (multiplier: number): Color {
        return new Color(
            new FloatColor(
                this.red * multiplier,
                this.green * multiplier,
                this.blue * multiplier
            )
        );
    }

    public multiple (color: Color): Color {
        return new Color(
            new FloatColor(
                this.red * color.red,
                this.green * color.green,
                this.blue * color.blue
            )
        );
    }

    public divide (value: number): Color {
        return new Color(
            new FloatColor(
                this.red / value,
                this.green / value,
                this.blue / value
            )
        );
    }

    public static sRGBEncode (color: number) {
        if (color <= 0.0031308) {
            return 12.92 * color;
        } else {
            return 1.055 * (color ** 0.4166667) - 0.055;
        }
    }

    public static toRGB (color: Color): {red: number, green: number, blue: number} {
        return {
            red: Math.floor(Color.clampColor(color.red) * 255),
            green: Math.floor(Color.clampColor(color.green) * 255),
            blue: Math.floor(Color.clampColor(color.blue) * 255)
        }
    }

    private static clampColor (color: number): number {
        return color > 1 ? 1 : color;
    }
}
