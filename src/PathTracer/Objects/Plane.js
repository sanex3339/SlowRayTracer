var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractObject_1 = require("./AbstractObject");
var Color_1 = require("../Color/Color");
var Material_1 = require("../Material");
var RTMath_1 = require("../RTMath");
var RGBColor_1 = require("../Color/RGBColor");
var Vector_1 = require("../Vector");
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane(normal, point) {
        _super.call(this);
        this.point = new Vector_1.Vector(0, 0, 0);
        this.material = new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(115, 115, 115)), 0);
        this.type = 'surface';
        this.normal = normal;
        if (point) {
            this.point = point;
        }
    }
    Plane.prototype.getIntersectData = function (ray) {
        var distance, hitPoint, t = Vector_1.Vector.dot(Vector_1.Vector.substract(this.point, ray.getOrigin()), this.normal) /
            Vector_1.Vector.dot(ray.getDirection(), this.getNormal());
        if (t <= RTMath_1.RTMath.EPSILON) {
            return;
        }
        hitPoint = Vector_1.Vector.add(ray.getOrigin(), Vector_1.Vector.scaled(ray.getDirection(), t));
        distance = Vector_1.Vector.substract(hitPoint, ray.getOrigin()).getLength();
        return {
            point: hitPoint,
            distance: distance
        };
    };
    Plane.prototype.getMaterial = function () {
        return this.material;
    };
    Plane.prototype.getNormal = function () {
        return this.normal;
    };
    Plane.prototype.getType = function () {
        return this.type;
    };
    Plane.prototype.setMaterial = function (material) {
        this.material = material;
        return this;
    };
    return Plane;
})(AbstractObject_1.AbstractObject);
exports.Plane = Plane;
//# sourceMappingURL=Plane.js.map