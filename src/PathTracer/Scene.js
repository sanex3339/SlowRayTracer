"use strict";
var Scene = (function () {
    function Scene(objects) {
        this.objects = [];
        this.lights = [];
        this.objects = objects.objects;
        this.camera = objects.camera;
        this.lights = objects.lights;
    }
    Scene.prototype.addObject = function (object) {
        this.objects.push(object);
    };
    Scene.prototype.getCamera = function () {
        return this.camera;
    };
    Scene.prototype.getLights = function () {
        return this.lights;
    };
    Scene.prototype.getObjects = function () {
        return this.objects;
    };
    return Scene;
})();
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map