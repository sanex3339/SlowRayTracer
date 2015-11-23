var Color_1 = require("./Color/Color");
var RGBColor_1 = require("./Color/RGBColor");
var Material = (function () {
    function Material(color, reflectionCoeff) {
        if (color === void 0) { color = new Color_1.Color(new RGBColor_1.RGBColor(255, 0, 0)); }
        if (reflectionCoeff === void 0) { reflectionCoeff = 0; }
        this.lambertCoeff = 0.5;
        this.phongCoeff = 0.5;
        this.reflectionCoeff = 0;
        this.color = color;
        this.reflectionCoeff = reflectionCoeff;
    }
    Material.prototype.getColor = function () {
        return this.color;
    };
    Material.prototype.getLambertCoeff = function () {
        return this.lambertCoeff;
    };
    Material.prototype.getPhongCoeff = function () {
        return this.phongCoeff;
    };
    Material.prototype.getReflectionValue = function () {
        return this.reflectionCoeff;
    };
    Material.prototype.setLambertCoeff = function (lambertCoeff) {
        this.lambertCoeff = lambertCoeff;
        this.phongCoeff = 1 - lambertCoeff;
        return this;
    };
    Material.prototype.setPhongCoeff = function (phongCoeff) {
        this.phongCoeff = phongCoeff;
        this.lambertCoeff = 1 - phongCoeff;
        return this;
    };
    return Material;
})();
exports.Material = Material;
//# sourceMappingURL=Material.js.map