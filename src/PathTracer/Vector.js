var Vector = (function () {
    function Vector(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector.prototype.getCoordinates = function () {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    };
    Vector.prototype.asArray = function () {
        return [
            this.x,
            this.y,
            this.z
        ];
    };
    Vector.prototype.getLength = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    };
    Vector.add = function (vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);
    };
    Vector.substract = function (vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z);
    };
    Vector.scaled = function (vector, multiplier) {
        return new Vector(vector.x * multiplier, vector.y * multiplier, vector.z * multiplier);
    };
    Vector.cross = function (vector1, vector2) {
        return new Vector(vector1.y * vector2.z - vector1.z * vector2.y, vector1.z * vector2.x - vector1.x * vector2.z, vector1.x * vector2.y - vector1.y * vector2.x);
    };
    Vector.inverse = function (vector) {
        return Vector.scaled(vector, -1);
    };
    Vector.dot = function (vector1, vector2) {
        return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    };
    Vector.normalized = function (vector) {
        return Vector.scaled(vector, 1 / vector.getLength());
    };
    Vector.reflect = function (vector, normal) {
        var f = 2 * Vector.dot(vector, normal);
        return Vector.substract(vector, Vector.scaled(normal, f));
    };
    return Vector;
})();
exports.Vector = Vector;
//# sourceMappingURL=Vector.js.map