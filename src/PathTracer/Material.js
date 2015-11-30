var Color_1 = require("./Color/Color");
var Material = (function () {
    function Material(color, emission, reflectionCoeff) {
        this.emission = Color_1.Color.black;
        this.lambertCoeff = 0.5;
        this.phongCoeff = 0.5;
        this.reflectionCoeff = 0;
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
    Material.prototype.getColor = function () {
        return this.color;
    };
    Material.prototype.getEmission = function () {
        return this.emission;
    };
    Material.prototype.getEmissionValue = function () {
        return (this.emission.getColor().red + this.emission.getColor().green + this.emission.getColor().blue) / 3;
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