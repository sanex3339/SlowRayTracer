/// <reference no-default-lib="true"/>
/// <reference path="lib/lib.webworker.d.ts" />
var AbstractLight_1 = require("./Lights/AbstractLight");
var Camera_1 = require("./Camera");
var Color_1 = require("./Color/Color");
var IntersectPoint_1 = require("./IntersectPoint");
var Material_1 = require("./Material");
var Polygon_1 = require("./Objects/Polygon");
var Ray_1 = require("./Ray");
var RGBColor_1 = require("./Color/RGBColor");
var Scene_1 = require("./Scene");
var Sphere_1 = require("./Objects/Sphere");
var SphericalLight_1 = require("./Lights/SphericalLight");
var Vector_1 = require("./Vector");
var Tracer = (function () {
    function Tracer() {
        this.pixelSamples = 4;
        this.shadowSamples = 50;
        this.giSamples = 50;
        this.aoSamples = 50;
        this.screenWidth = 250;
        this.screenHeight = 250;
    }
    Tracer.prototype.cosineSampleHemisphere = function (normal) {
        var u = Math.random();
        var v = Math.random();
        var r = Math.sqrt(u);
        var angle = 2 * Math.PI * v;
        var sdir, tdir;
        if (Math.abs(normal.getCoordinates()['x']) < 0.5) {
            sdir = Vector_1.Vector.cross(normal, new Vector_1.Vector(1, 0, 0));
        }
        else {
            sdir = Vector_1.Vector.cross(normal, new Vector_1.Vector(0, 1, 0));
        }
        tdir = Vector_1.Vector.cross(normal, sdir);
        return Vector_1.Vector.add(Vector_1.Vector.scale(normal, Math.sqrt(1 - u)), Vector_1.Vector.add(Vector_1.Vector.scale(sdir, r * Math.cos(angle)), Vector_1.Vector.scale(tdir, r * Math.sin(angle))));
    };
    Tracer.prototype.getColor = function (ray, recurcive) {
        if (recurcive === void 0) { recurcive = true; }
        var intersection = this.trace(ray), diffuseColor = Color_1.Color.black, reflectColor = Color_1.Color.black;
        if (!intersection.getIntersect()) {
            return Color_1.Color.black;
        }
        diffuseColor = this.getDiffuseColor(ray, intersection, recurcive);
        if (recurcive) {
            reflectColor = this.getReflectionColor(ray, intersection);
        }
        return diffuseColor.add(reflectColor);
    };
    Tracer.prototype.getDiffuseColor = function (ray, intersect, recursive) {
        if (recursive === void 0) { recursive = true; }
        var lambColor, phongColor, radianceColor, pixelColor = Color_1.Color.black, radianceRandomDirection, lightDirection, lightPower, reflectPhongVectorDir, lambCos, phongCos, phong;
        for (var _i = 0, _a = this.scene.getLights(); _i < _a.length; _i++) {
            var light = _a[_i];
            if (intersect.getOwner() instanceof AbstractLight_1.AbstractLight) {
                return intersect.getOwner()
                    .getMaterial()
                    .getColor();
            }
            lightPower = this.getLightPower(intersect, light);
            lambColor = Color_1.Color.black;
            phongColor = Color_1.Color.black;
            radianceColor = Color_1.Color.black;
            lightDirection = Vector_1.Vector.normalize(Vector_1.Vector.substract(intersect.getHitPoint(), light.getPosition()));
            //gi
            if (recursive) {
                for (var i = 0; i < this.giSamples; i++) {
                    var radianceInRandomDirection = void 0;
                    radianceRandomDirection = this.cosineSampleHemisphere(intersect.getOwner().getNormal(intersect.getHitPoint()));
                    radianceInRandomDirection = this.getColor(new Ray_1.Ray(intersect.getHitPoint(), radianceRandomDirection), false);
                    radianceColor = radianceColor
                        .add(radianceInRandomDirection);
                }
            }
            radianceColor = radianceColor.divide(this.giSamples);
            // lambert
            lambCos = -Vector_1.Vector.dot(lightDirection, intersect.getNormal());
            lambColor = lambColor.add(intersect
                .getOwner()
                .getMaterial()
                .getColor()
                .add(radianceColor)
                .multiple(light.getMaterial()
                .getColor()
                .scaled(lightPower * lambCos * intersect.getOwner().getMaterial().getLambertCoeff())));
            // phong
            reflectPhongVectorDir = Vector_1.Vector.reflect(lightDirection, intersect.getNormal());
            phongCos = -Vector_1.Vector.dot(reflectPhongVectorDir, ray.getDirection());
            if (phongCos > 0) {
                phong = Math.pow(phongCos, 35);
                phongColor = phongColor.add(intersect.getOwner()
                    .getMaterial()
                    .getColor()
                    .multiple(light.getMaterial()
                    .getColor()
                    .scaled(lightPower * phong * intersect.getOwner().getMaterial().getPhongCoeff())));
            }
            //ambient occlusion
            var c = 0;
            for (var i = 0; i < this.aoSamples; i++) {
                var dir = this.cosineSampleHemisphere(intersect.getOwner().getNormal(intersect.getHitPoint()));
                var aoIntersect = this.trace(new Ray_1.Ray(intersect.getHitPoint(), dir));
                if (!aoIntersect.getIntersect()) {
                    continue;
                }
                if (aoIntersect.getDistanceFromOrigin() > 200) {
                    continue;
                }
                c++;
            }
            pixelColor = pixelColor.add(lambColor.multiple(Color_1.Color.white.scaled(1 - (c * 0.67 / this.aoSamples))).add(phongColor));
        }
        return pixelColor;
    };
    Tracer.prototype.getReflectionColor = function (ray, intersect) {
        var rayIteration = ray.getIteration(), reflectionColor, reflectionValue = intersect.getOwner().getMaterial().getReflectionValue(), reflectedRay;
        ray.setIteration(--rayIteration);
        if (rayIteration === 0 ||
            reflectionValue === 0) {
            return Color_1.Color.black;
        }
        reflectedRay = Vector_1.Vector.reflect(ray.getDirection(), intersect.getNormal());
        reflectionColor = this.getColor(new Ray_1.Ray(intersect.getHitPoint(), reflectedRay, rayIteration)).scaled(reflectionValue);
        return reflectionColor;
    };
    Tracer.prototype.getPerspectiveVector = function (x, y) {
        var camera = this.scene.getCamera();
        return Vector_1.Vector.normalize(Vector_1.Vector.add(camera.getForwardVector(), Vector_1.Vector.add(Vector_1.Vector.scale(camera.getRightVector(), camera.recenterX(x)), Vector_1.Vector.scale(camera.getUpVector(), camera.recenterY(y)))));
    };
    Tracer.prototype.getLightPower = function (intersect, light) {
        var lightPower = light.getPower(), lightRandomPoint, shadowRay, resultPower = 0;
        for (var i = 0; i < this.shadowSamples; i++) {
            lightRandomPoint = light.getRandomPoint();
            shadowRay = this.trace(new Ray_1.Ray(intersect.getHitPoint(), Vector_1.Vector.substract(Vector_1.Vector.substract(light.getPosition(), lightRandomPoint), intersect.getHitPoint())));
            if (!shadowRay.getIntersect()) {
                continue;
            }
            if (!(shadowRay.getOwner() instanceof AbstractLight_1.AbstractLight)) {
                continue;
            }
            resultPower += (lightPower -
                (Vector_1.Vector.substract(Vector_1.Vector.substract(light.getPosition(), lightRandomPoint), intersect.getHitPoint()).getLength() * (lightPower / light.getFadeRadius()))) / this.shadowSamples;
        }
        return resultPower;
    };
    Tracer.prototype.trace = function (ray) {
        var intersection = new IntersectPoint_1.IntersectPoint(), intersectData, minDistance = Infinity, sceneObjects = this.scene.getObjects().concat(this.scene.getLights());
        for (var _i = 0, sceneObjects_1 = sceneObjects; _i < sceneObjects_1.length; _i++) {
            var object = sceneObjects_1[_i];
            intersectData = object.getIntersectData(ray);
            if (intersectData &&
                intersectData['distance'] < minDistance) {
                minDistance = intersectData['distance'];
                intersection.setIntersect();
                intersection.setHitPoint(intersectData['hitPoint']);
                intersection.setNormal(intersectData['normal']);
                intersection.setDistanceFromOrigin(intersectData['distance']);
                intersection.setOwner(object);
            }
        }
        return intersection;
    };
    Tracer.prototype.render = function (screenWidth, screenHeight, x, y) {
        var randoMultiplier = 0.5;
        var color = Color_1.Color.black, rand, ray, rgbColor;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        for (var sample = 0; sample < this.pixelSamples; sample++) {
            rand = 0;
            if (this.pixelSamples > 1) {
                if (sample % 2) {
                    rand += Math.random() * randoMultiplier;
                }
                else {
                    rand -= Math.random() * randoMultiplier;
                }
            }
            ray = new Ray_1.Ray(this.scene.getCamera().getPosition(), this.getPerspectiveVector(x + rand, y + rand));
            color = color.add(this.getColor(ray));
        }
        color = color.divide(this.pixelSamples);
        for (var component in color) {
            color[component] = Color_1.Color.sRGBEncode(color[component]);
        }
        rgbColor = Color_1.Color.toRGB(color);
        self.postMessage([x, y, rgbColor.red, rgbColor.green, rgbColor.blue]);
    };
    Tracer.prototype.setScene = function (scene) {
        this.scene = scene;
    };
    return Tracer;
})();
onmessage = function (message) {
    var data = message.data;
    if (typeof (data) == 'string') {
        data = JSON.parse('[' + data + ']');
    }
    var tracer = new Tracer();
    tracer.setScene(new Scene_1.Scene({
        camera: new Camera_1.Camera(new Vector_1.Vector(0, 0, -699), new Vector_1.Vector(0, 0, 1), data[0], data[1]),
        lights: [
            new SphericalLight_1.SphericalLight(new Vector_1.Vector(0, 600, 0), 0.6, 100)
                .setMaterial(new Material_1.Material(Color_1.Color.white)),
            new SphericalLight_1.SphericalLight(new Vector_1.Vector(0, 0, 0), 0.6, 150)
                .setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 235, 200))))
        ],
        objects: [
            // new Plane(new Vector(0, 1, 0), new Vector (0, -400, 0)).setMaterial(new Material(Color.gray, 0)),
            // bottom plane
            new Polygon_1.Polygon(new Vector_1.Vector(-700, -700, -700), new Vector_1.Vector(700, -700, -700), new Vector_1.Vector(700, -700, 700), new Vector_1.Vector(-700, -700, 700)).setMaterial(new Material_1.Material(Color_1.Color.white, 0).setLambertCoeff(1)),
            // front plane
            new Polygon_1.Polygon(new Vector_1.Vector(-700, -700, 700), new Vector_1.Vector(700, -700, 700), new Vector_1.Vector(700, 700, 700), new Vector_1.Vector(-700, 700, 700)).setMaterial(new Material_1.Material(Color_1.Color.white, 0).setLambertCoeff(1)),
            // top plane
            new Polygon_1.Polygon(new Vector_1.Vector(-700, 700, 700), new Vector_1.Vector(700, 700, 700), new Vector_1.Vector(700, 700, -700), new Vector_1.Vector(-700, 700, -700)).setMaterial(new Material_1.Material(Color_1.Color.white, 0).setLambertCoeff(1)),
            //right plane
            new Polygon_1.Polygon(new Vector_1.Vector(700, -700, 700), new Vector_1.Vector(700, -700, -700), new Vector_1.Vector(700, 700, -700), new Vector_1.Vector(700, 700, 700)).setMaterial(new Material_1.Material(Color_1.Color.blue).setLambertCoeff(1)),
            //left plane
            new Polygon_1.Polygon(new Vector_1.Vector(-700, -700, -700), new Vector_1.Vector(-700, -700, 700), new Vector_1.Vector(-700, 700, 700), new Vector_1.Vector(-700, 700, -700)).setMaterial(new Material_1.Material(Color_1.Color.red, 0).setLambertCoeff(1)),
            // back plane
            new Polygon_1.Polygon(new Vector_1.Vector(700, -700, -700), new Vector_1.Vector(-700, -700, -700), new Vector_1.Vector(-700, 700, -700), new Vector_1.Vector(700, 700, -700)).setMaterial(new Material_1.Material(Color_1.Color.black, 0).setLambertCoeff(1)),
            new Sphere_1.Sphere(new Vector_1.Vector(-250, -500, 450), 200)
                .setMaterial(new Material_1.Material(Color_1.Color.black, 1)),
            new Sphere_1.Sphere(new Vector_1.Vector(250, -500, 400), 200)
                .setMaterial(new Material_1.Material(Color_1.Color.green, 0))
        ]
    }));
    tracer.render(data[0], data[1], data[2], data[3]);
};
//# sourceMappingURL=TracerWorker.js.map