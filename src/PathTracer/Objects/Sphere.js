var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RTMath_1 = require("../RTMath");
var AbstractObject_1 = require("./AbstractObject");
var Color_1 = require("../Color/Color");
var Material_1 = require("../Material");
var RGBColor_1 = require("../Color/RGBColor");
var Vector_1 = require("../Vector");
var Sphere = (function (_super) {
    __extends(Sphere, _super);
    function Sphere(center, radius) {
        _super.call(this);
        this.material = new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 0, 0)), 0);
        this.type = 'surface';
        this.center = center;
        this.radius = radius;
    }
    Sphere.prototype.getIntersectData = function (ray) {
        var k = Vector_1.Vector.substract(ray.getOrigin(), this.center), b = Vector_1.Vector.dot(k, ray.getDirection()), c = Vector_1.Vector.dot(k, k) - Math.pow(this.radius, 2), d = Math.pow(b, 2) - c, t1, t2, minT, maxT, intersectionPoint, point, distance;
        if (b > 0 || d < 0) {
            return;
        }
        if (d >= 0) {
            t1 = -b + Math.sqrt(d);
            t2 = -b - Math.sqrt(d);
            minT = Math.min(t1, t2);
            maxT = Math.max(t1, t2);
            if (minT > RTMath_1.RTMath.EPSILON) {
                intersectionPoint = minT;
            }
            else {
                intersectionPoint = maxT;
            }
            if (intersectionPoint < RTMath_1.RTMath.EPSILON) {
                return;
            }
        }
        point = Vector_1.Vector.add(Vector_1.Vector.scaled(ray.getDirection(), intersectionPoint), ray.getOrigin());
        distance = Vector_1.Vector.substract(point, ray.getOrigin()).getLength();
        return {
            point: point,
            distance: distance
        };
    };
    Sphere.prototype.getMaterial = function () {
        return this.material;
    };
    Sphere.prototype.getNormal = function (point) {
        return Vector_1.Vector.normalized(Vector_1.Vector.scaled(Vector_1.Vector.substract(point, this.center), 1 / this.radius));
    };
    Sphere.prototype.getType = function () {
        return this.type;
    };
    Sphere.prototype.setMaterial = function (material) {
        this.material = material;
        return this;
    };
    return Sphere;
})(AbstractObject_1.AbstractObject);
exports.Sphere = Sphere;
//# sourceMappingURL=Sphere.js.map