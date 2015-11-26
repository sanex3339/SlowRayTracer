var IntersectPoint = (function () {
    function IntersectPoint() {
        this.intersected = false;
    }
    IntersectPoint.prototype.getIntersect = function () {
        return this.intersected;
    };
    IntersectPoint.prototype.getHitPoint = function () {
        return this.hitPoint;
    };
    IntersectPoint.prototype.getNormal = function () {
        return this.normal;
    };
    IntersectPoint.prototype.getOwner = function () {
        return this.owner;
    };
    IntersectPoint.prototype.getDistanceFromOrigin = function () {
        return this.distanceFromOrigin;
    };
    IntersectPoint.prototype.setIntersect = function () {
        this.intersected = true;
    };
    IntersectPoint.prototype.setHitPoint = function (hitPoint) {
        this.hitPoint = hitPoint;
    };
    IntersectPoint.prototype.setNormal = function (normal) {
        this.normal = normal;
    };
    IntersectPoint.prototype.setOwner = function (owner) {
        this.owner = owner;
    };
    IntersectPoint.prototype.setDistanceFromOrigin = function (distanceFromOrigin) {
        this.distanceFromOrigin = distanceFromOrigin;
    };
    return IntersectPoint;
})();
exports.IntersectPoint = IntersectPoint;
//# sourceMappingURL=IntersectPoint.js.map