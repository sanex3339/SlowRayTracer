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
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon() {
        var vertices = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vertices[_i - 0] = arguments[_i];
        }
        _super.call(this);
        this.material = new Material_1.Material(Color_1.Color.gray, 0);
        this.vertices = vertices;
    }
    Polygon.prototype.getIntersectData = function (ray) {
        var distance, distanceFromAxisCenter, hitPoint, normal = this.getNormal(), numerator, denominator;
        distanceFromAxisCenter = Vector_1.Vector.dot(this.vertices[0], normal);
        denominator = Vector_1.Vector.dot(normal, ray.getDirection());
        numerator = -Vector_1.Vector.dot(normal, ray.getOrigin()) + distanceFromAxisCenter;
        distance = numerator / denominator;
        if (distance < RTMath_1.RTMath.EPSILON) {
            return;
        }
        hitPoint = ray.getHitPoint(distance);
        for (var i = 0, verticesLength = this.vertices.length; i < verticesLength; i++) {
            var vertex1 = this.vertices[i], vertex2 = void 0;
            if (i === verticesLength - 1) {
                vertex2 = this.vertices[0];
            }
            else {
                vertex2 = this.vertices[i + 1];
            }
            if (!Polygon.checkSameClockDir(Vector_1.Vector.substract(vertex2, vertex1), Vector_1.Vector.substract(hitPoint, vertex1), this.getNormal())) {
                return;
            }
        }
        return {
            hitPoint: hitPoint,
            normal: normal,
            distance: distance
        };
    };
    Polygon.prototype.getMaterial = function () {
        return this.material;
    };
    Polygon.prototype.getNormal = function () {
        var edge1 = Vector_1.Vector.substract(this.vertices[2], this.vertices[0]), edge2 = Vector_1.Vector.substract(this.vertices[1], this.vertices[0]);
        return Vector_1.Vector.normalize(Vector_1.Vector.cross(edge1, edge2));
    };
    Polygon.prototype.setMaterial = function (material) {
        this.material = material;
        return this;
    };
    Polygon.checkSameClockDir = function (vector1, vector2, normal) {
        var normalV1V2 = Vector_1.Vector.cross(vector2, vector1);
        return Vector_1.Vector.dot(normalV1V2, normal) >= 0;
    };
    return Polygon;
})(AbstractObject_1.AbstractObject);
exports.Polygon = Polygon;
//# sourceMappingURL=Polygon.js.map