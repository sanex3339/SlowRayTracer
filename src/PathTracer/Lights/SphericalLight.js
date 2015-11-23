var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractLight_1 = require("./AbstractLight");
var Color_1 = require("./../Color/Color");
var Material_1 = require("./../Material");
var RGBColor_1 = require("./../Color/RGBColor");
var RTMath_1 = require("./../RTMath");
var Vector_1 = require("./../Vector");
var SphericalLight = (function (_super) {
    __extends(SphericalLight, _super);
    function SphericalLight(position, power, radius) {
        _super.call(this);
        this.radius = 50;
        this.fadeRadius = 2500;
        this.material = new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(244, 244, 244)), 0).setLambertCoeff(1);
        this.type = 'light';
        this.position = position;
        this.power = power;
        if (radius) {
            this.radius = radius;
        }
    }
    SphericalLight.prototype.getFadeRadius = function () {
        return this.radius + this.fadeRadius;
    };
    SphericalLight.prototype.getPosition = function () {
        return this.position;
    };
    SphericalLight.prototype.getPower = function () {
        return this.power;
    };
    SphericalLight.prototype.getRadius = function () {
        return this.radius;
    };
    SphericalLight.prototype.getRandomPoint = function () {
        var u = Math.random(), v = Math.random(), q = 2 * Math.PI * u, f = Math.pow(Math.cos(2 * v - 1), -1);
        return new Vector_1.Vector(this.radius * Math.cos(q) * Math.sin(f), this.radius * Math.sin(q) * Math.sin(f), this.radius * Math.cos(f));
    };
    SphericalLight.prototype.getIntersectData = function (ray) {
        var k = Vector_1.Vector.substract(ray.getOrigin(), this.position), b = Vector_1.Vector.dot(k, ray.getDirection()), c = Vector_1.Vector.dot(k, k) - Math.pow(this.radius, 2), d = Math.pow(b, 2) - c, t1, t2, minT, maxT, intersectionPoint, point, distance;
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
    SphericalLight.prototype.getNormal = function (point) {
        return Vector_1.Vector.normalized(Vector_1.Vector.scaled(Vector_1.Vector.substract(point, this.position), 1 / this.radius));
    };
    SphericalLight.prototype.getMaterial = function () {
        return this.material;
    };
    SphericalLight.prototype.getType = function () {
        return this.type;
    };
    SphericalLight.prototype.setMaterial = function (material) {
        this.material = material;
        return this;
    };
    return SphericalLight;
})(AbstractLight_1.AbstractLight);
exports.SphericalLight = SphericalLight;
//# sourceMappingURL=SphericalLight.js.map