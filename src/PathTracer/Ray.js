"use strict";
var Vector_1 = require("./Vector");
var Ray = (function () {
    function Ray(origin, direction, iteration) {
        this.iteration = 0;
        this.origin = origin;
        this.direction = Vector_1.Vector.normalize(direction);
        if (iteration) {
            this.iteration = iteration;
        }
    }
    Ray.prototype.getOrigin = function () {
        return this.origin;
    };
    Ray.prototype.getDirection = function () {
        return this.direction;
    };
    Ray.prototype.getIteration = function () {
        return this.iteration;
    };
    Ray.prototype.getHitPoint = function (distance) {
        return Vector_1.Vector.add(this.origin, Vector_1.Vector.scale(this.direction, distance));
    };
    Ray.prototype.setIteration = function (iteration) {
        this.iteration = iteration;
    };
    return Ray;
})();
exports.Ray = Ray;
//# sourceMappingURL=Ray.js.map