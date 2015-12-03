"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RTMath_1 = require("../RTMath");
var AbstractObject_1 = require("./AbstractObject");
var Color_1 = require("../Color/Color");
var Material_1 = require("../Material");
var Vector_1 = require("../Vector");
var Sphere = (function (_super) {
    __extends(Sphere, _super);
    function Sphere(center, radius) {
        _super.call(this);
        this.material = new Material_1.Material(Color_1.Color.red);
        this.position = center;
        this.radius = radius;
    }
    Sphere.prototype.getIntersectData = function (ray) {
        var k = Vector_1.Vector.substract(ray.getOrigin(), this.position), b = Vector_1.Vector.dot(k, ray.getDirection()), c = Vector_1.Vector.dot(k, k) - Math.pow(this.radius, 2), d = Math.pow(b, 2) - c, t1, t2, minT, maxT, intersectionPoint, hitPoint, distance;
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
        hitPoint = Vector_1.Vector.add(Vector_1.Vector.scale(ray.getDirection(), intersectionPoint), ray.getOrigin());
        distance = Vector_1.Vector.substract(hitPoint, ray.getOrigin()).getLength();
        return {
            hitPoint: hitPoint,
            normal: this.getNormal(hitPoint),
            distance: distance
        };
    };
    Sphere.prototype.getMaterial = function () {
        return this.material;
    };
    Sphere.prototype.getPosition = function () {
        return this.position;
    };
    Sphere.prototype.getRandomPoint = function () {
        var u = Math.random(), v = Math.random(), q = 2 * Math.PI * u, f = Math.pow(Math.cos(2 * v - 1), -1);
        return new Vector_1.Vector(this.radius * Math.cos(q) * Math.sin(f), this.radius * Math.sin(q) * Math.sin(f), this.radius * Math.cos(f));
    };
    Sphere.prototype.getRadius = function () {
        return this.radius;
    };
    Sphere.prototype.getNormal = function (point) {
        return Vector_1.Vector.normalize(Vector_1.Vector.scale(Vector_1.Vector.substract(point, this.position), 1 / this.radius));
    };
    Sphere.prototype.setMaterial = function (material) {
        this.material = material;
        return this;
    };
    return Sphere;
})(AbstractObject_1.AbstractObject);
exports.Sphere = Sphere;
//# sourceMappingURL=Sphere.js.map