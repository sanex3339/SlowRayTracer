var RGBColor = (function () {
    function RGBColor(red, green, blue) {
        this.red = RGBColor.toFloat(red);
        this.green = RGBColor.toFloat(green);
        this.blue = RGBColor.toFloat(blue);
    }
    RGBColor.toFloat = function (color) {
        return color === 0 ? color : color / 255;
    };
    return RGBColor;
})();
exports.RGBColor = RGBColor;
//# sourceMappingURL=RGBColor.js.map