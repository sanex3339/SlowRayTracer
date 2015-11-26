var RGBColor_1 = require("./RGBColor");
var FloatColor_1 = require("./FloatColor");
var Color = (function () {
    function Color(color) {
        this.red = color.red;
        this.green = color.green;
        this.blue = color.blue;
    }
    Color.prototype.getColor = function () {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue
        };
    };
    Color.prototype.add = function (color) {
        return new Color(new FloatColor_1.FloatColor(this.red + color.red, this.green + color.green, this.blue + color.blue));
    };
    Color.prototype.substract = function (color) {
        return new Color(new FloatColor_1.FloatColor(this.red - color.red, this.green - color.green, this.blue - color.blue));
    };
    Color.prototype.scaled = function (multiplier) {
        return new Color(new FloatColor_1.FloatColor(this.red * multiplier, this.green * multiplier, this.blue * multiplier));
    };
    Color.prototype.multiple = function (color) {
        return new Color(new FloatColor_1.FloatColor(this.red * color.red, this.green * color.green, this.blue * color.blue));
    };
    Color.prototype.divide = function (value) {
        return new Color(new FloatColor_1.FloatColor(this.red / value, this.green / value, this.blue / value));
    };
    Color.sRGBEncode = function (color) {
        if (color <= 0.0031308) {
            return 12.92 * color;
        }
        else {
            return 1.055 * (Math.pow(color, 0.4166667)) - 0.055;
        }
    };
    Color.toRGB = function (color) {
        return {
            red: Math.floor(Color.clampColor(color.red) * 255),
            green: Math.floor(Color.clampColor(color.green) * 255),
            blue: Math.floor(Color.clampColor(color.blue) * 255)
        };
    };
    Color.clampColor = function (color) {
        return color > 1 ? 1 : color;
    };
    Color.black = new Color(new RGBColor_1.RGBColor(0, 0, 0));
    Color.white = new Color(new RGBColor_1.RGBColor(255, 255, 255));
    Color.gray = new Color(new RGBColor_1.RGBColor(127, 127, 127));
    Color.red = new Color(new RGBColor_1.RGBColor(255, 0, 0));
    Color.green = new Color(new RGBColor_1.RGBColor(0, 255, 0));
    Color.blue = new Color(new RGBColor_1.RGBColor(0, 0, 255));
    return Color;
})();
exports.Color = Color;
//# sourceMappingURL=Color.js.map