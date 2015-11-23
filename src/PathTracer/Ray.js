var Vector_1 = require("./Vector");
var Ray = (function () {
    function Ray(origin, direction, iteration) {
        this.distance = 0;
        this.iteration = 8;
        this.origin = origin;
        this.direction = Vector_1.Vector.normalized(direction);
        if (iteration) {
            this.iteration = iteration;
        }
    }
    Ray.prototype.getDirection = function () {
        return this.direction;
    };
    Ray.prototype.getDistance = function () {
        return this.distance;
    };
    Ray.prototype.getIteration = function () {
        return this.iteration;
    };
    Ray.prototype.getOrigin = function () {
        return this.origin;
    };
    Ray.prototype.getHitPoint = function () {
        return Vector_1.Vector.add(this.origin, Vector_1.Vector.scaled(this.direction, this.distance));
    };
    Ray.prototype.setDistance = function (distance) {
        this.distance = distance;
    };
    Ray.prototype.setIteration = function (iteration) {
        this.iteration = iteration;
    };
    return Ray;
})();
exports.Ray = Ray;
//# sourceMappingURL=Ray.js.map