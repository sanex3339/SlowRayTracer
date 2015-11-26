var Vector_1 = require("./Vector");
var Camera = (function () {
    function Camera(position, direction, screenWidth, screenHeight) {
        this.position = position;
        this.direction = Vector_1.Vector.normalize(direction);
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.forwardVector = Vector_1.Vector.normalize(Vector_1.Vector.substract(this.direction, this.position));
        this.rightVector = Vector_1.Vector.scale(Vector_1.Vector.normalize(Vector_1.Vector.cross(this.forwardVector, new Vector_1.Vector(0, -1, 0))), 3);
        this.upVector = Vector_1.Vector.scale(Vector_1.Vector.normalize(Vector_1.Vector.cross(this.forwardVector, this.rightVector)), 3);
    }
    Camera.prototype.getDirection = function () {
        return this.direction;
    };
    Camera.prototype.getPosition = function () {
        return this.position;
    };
    Camera.prototype.getForwardVector = function () {
        return this.forwardVector;
    };
    Camera.prototype.getRightVector = function () {
        return this.rightVector;
    };
    Camera.prototype.getUpVector = function () {
        return this.upVector;
    };
    Camera.prototype.recenterX = function (x) {
        var aspectCoeff = (this.screenHeight / this.screenWidth) * 2;
        return (x - (this.screenWidth / 2)) / aspectCoeff / this.screenWidth;
    };
    Camera.prototype.recenterY = function (y) {
        return -(y - (this.screenHeight / 2)) / 2 / this.screenHeight;
    };
    return Camera;
})();
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map