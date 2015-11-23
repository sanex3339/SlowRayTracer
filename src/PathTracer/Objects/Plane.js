var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractObject_1 = require("./AbstractObject");
var Color_1 = require("../Color/Color");
var Material_1 = require("../Material");
var RGBColor_1 = require("../Color/RGBColor");
var Vector_1 = require("../Vector");
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane(normal, offset) {
        if (offset === void 0) { offset = 0; }
        _super.call(this);
        this.material = new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(115, 115, 115)), 0);
        this.type = 'surface';
        this.offset = offset;
        this.normal = normal;
    }
    Plane.prototype.getIntersectData = function (ray) {
        var hitPoint, normal = this.getNormal(), numerator, denominator, distance;
        numerator = -Vector_1.Vector.dot(normal, ray.getOrigin()) + this.offset;
        denominator = Vector_1.Vector.dot(normal, ray.getDirection());
        if (denominator > 0) {
            return;
        }
        distance = numerator / denominator;
        ray.setDistance(distance);
        hitPoint = ray.getHitPoint();
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