/// <reference no-default-lib="true"/>
/// <reference path="lib/lib.webworker.d.ts" />
var Camera_1 = require("./Camera");
var Color_1 = require("./Color/Color");
var Ray_1 = require("./Ray");
var RGBColor_1 = require("./Color/RGBColor");
var Scene_1 = require("./Scene");
var Sphere_1 = require("./Objects/Sphere");
var Vector_1 = require("./Vector");
var SphericalLight_1 = require("./Lights/SphericalLight");
var Material_1 = require("./Material");
var Polygon_1 = require("./Objects/Polygon");
var Tracer = (function () {
    function Tracer() {
        this.pixelSamples = 1;
        this.shadowSamples = 10;
        this.giSamples = 35;
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
        return Vector_1.Vector.add(Vector_1.Vector.scaled(normal, Math.sqrt(1 - u)), Vector_1.Vector.add(Vector_1.Vector.scaled(sdir, r * Math.cos(angle)), Vector_1.Vector.scaled(tdir, r * Math.sin(angle))));
        /*let basisTransform: Vector,
            bitangent: Vector,
            u1: number = Math.random(),
            u2: number = Math.random(),
            sin_theta: number = Math.sqrt(u1),
            cos_theta: number = Math.sqrt(1 - u1),
            theta: number = 2 * Math.PI * u2,
            dir: Vector = new Vector(
                sin_theta * Math.cos(theta),
                sin_theta * Math.sin(theta),
                Math.sqrt(Math.max(0, 1 - u1))
            ),
            tangent: Vector;

        if (normal.getCoordinates()['x'] == 0) {
            tangent = new Vector(1, 0, 0);
        } else {
            tangent = Vector.normalized(
                new Vector(
                    normal.getCoordinates()['z'],
                    0,
                    -normal.getCoordinates()['x']
                )
            );
        }

        bitangent = Vector.cross(tangent, normal);

        basisTransform = new Vector(
            Vector.dot(tangent, dir),
            Vector.dot(normal, dir),
            Vector.dot(bitangent, dir)
        );

        return Vector.normalized(basisTransform);*/
    };
    Tracer.prototype.getColor = function (ray, recurcive) {
        if (recurcive === void 0) { recurcive = true; }
        var intersect = this.trace(ray), diffuseColor, reflectColor = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
        if (intersect['owner'] === null) {
            return new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
        }
        diffuseColor = this.getDiffuseColor(ray, intersect, recurcive);
        if (recurcive) {
            reflectColor = this.getReflectionColor(ray, intersect);
        }
        return diffuseColor.add(reflectColor);
    };
    Tracer.prototype.getDiffuseColor = function (ray, intersect, recursive) {
        if (recursive === void 0) { recursive = true; }
        var lambColor, radianceColor, radianceRandomDirection, phongColor, pixelColor = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0)), lightDirection, lightPower, reflectPhongVectorDir, lambCos, phongCos, phong;
        for (var _i = 0, _a = this.scene.getLights(); _i < _a.length; _i++) {
            var light = _a[_i];
            if (intersect['ownerType'] === 'light') {
                return intersect['owner']
                    .getMaterial()
                    .getColor();
            }
            lightPower = this.getLightPower(intersect, light);
            lambColor = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
            radianceColor = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
            phongColor = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
            lightDirection = Vector_1.Vector.normalized(Vector_1.Vector.substract(intersect['point'], light.getPosition()));
            //gi
            if (recursive) {
                for (var i = 0; i < this.giSamples; i++) {
                    var radianceInRandomDirection = void 0;
                    radianceRandomDirection = this.cosineSampleHemisphere(intersect['owner'].getNormal(intersect['point']));
                    radianceInRandomDirection = this.getColor(new Ray_1.Ray(intersect['point'], radianceRandomDirection), false);
                    radianceColor = radianceColor
                        .add(radianceInRandomDirection);
                }
            }
            radianceColor = radianceColor.divide(this.giSamples);
            // lambert
            lambCos = -Vector_1.Vector.dot(lightDirection, intersect['normal']);
            lambColor = lambColor.add(intersect['owner']
                .getMaterial()
                .getColor()
                .add(radianceColor)
                .multiple(light.getMaterial()
                .getColor()
                .scaled(lightPower * lambCos * intersect['owner'].getMaterial().getLambertCoeff())));
            // phong
            reflectPhongVectorDir = Vector_1.Vector.reflect(lightDirection, intersect['normal']);
            phongCos = -Vector_1.Vector.dot(reflectPhongVectorDir, ray.getDirection());
            if (phongCos > 0) {
                phong = Math.pow(phongCos, 35);
                phongColor = phongColor.add(intersect['owner']
                    .getMaterial()
                    .getColor()
                    .multiple(light.getMaterial()
                    .getColor()
                    .scaled(lightPower * phong * intersect['owner'].getMaterial().getPhongCoeff())));
            }
            pixelColor = pixelColor.add(lambColor.add(phongColor));
        }
        return pixelColor;
    };
    Tracer.prototype.getReflectionColor = function (ray, intersect) {
        var rayIteration = ray.getIteration(), reflectionColor, reflectionValue = intersect['owner'].getMaterial().getReflectionValue(), reflectedRay;
        ray.setIteration(--rayIteration);
        if (rayIteration === 0 ||
            reflectionValue === 0) {
            return new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
        }
        reflectedRay = Vector_1.Vector.reflect(ray.getDirection(), intersect['normal']);
        reflectionColor = this.getColor(new Ray_1.Ray(intersect['point'], reflectedRay, rayIteration)).scaled(reflectionValue);
        return reflectionColor;
    };
    Tracer.prototype.getPerspectiveVector = function (x, y) {
        var camera = this.scene.getCamera();
        return Vector_1.Vector.normalized(Vector_1.Vector.add(camera.getForwardVector(), Vector_1.Vector.add(Vector_1.Vector.scaled(camera.getRightVector(), camera.recenterX(x)), Vector_1.Vector.scaled(camera.getUpVector(), camera.recenterY(y)))));
    };
    Tracer.prototype.getLightPower = function (intersect, light) {
        var lightPower = light.getPower(), lightRandomPoint, lightRay, resultPower = 0;
        for (var i = 0; i < this.shadowSamples; i++) {
            lightRandomPoint = light.getRandomPoint();
            lightRay = this.trace(new Ray_1.Ray(intersect['point'], Vector_1.Vector.substract(Vector_1.Vector.substract(light.getPosition(), lightRandomPoint), intersect['point'])));
            if (lightRay['point'] === null) {
                continue;
            }
            if (lightRay['owner'] !== light) {
                continue;
            }
            resultPower += (lightPower -
                (Vector_1.Vector.substract(Vector_1.Vector.substract(light.getPosition(), lightRandomPoint), intersect['point']).getLength() * (lightPower / light.getFadeRadius()))) / this.shadowSamples;
        }
        return resultPower;
    };
    Tracer.prototype.trace = function (ray) {
        var result = {
            distance: 0,
            point: null,
            normal: null,
            owner: null,
            ownerType: null
        }, intersectData, sceneObjectsWithLights = this.scene.getObjects().concat(this.scene.getLights());
        for (var _i = 0, sceneObjectsWithLights_1 = sceneObjectsWithLights; _i < sceneObjectsWithLights_1.length; _i++) {
            var object = sceneObjectsWithLights_1[_i];
            intersectData = object.getIntersectData(ray);
            if (intersectData &&
                intersectData['distance'] > 0 &&
                (result['owner'] === null ||
                    intersectData['distance'] < result['distance'])) {
                result['distance'] = intersectData['distance'];
                result['point'] = intersectData['point'];
                result['owner'] = object;
                result['ownerType'] = object.getType();
                result['normal'] = result['owner'].getNormal(result['point']);
            }
        }
        return result;
    };
    Tracer.prototype.render = function (screenWidth, screenHeight, x, y) {
        var randoMultiplier = 0.5;
        var color, rand, ray, rgbColor;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        color = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
        for (var iter = 0; iter < this.pixelSamples; iter++) {
            rand = 0;
            if (this.pixelSamples > 1) {
                if (iter % 2) {
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
            new SphericalLight_1.SphericalLight(new Vector_1.Vector(0, 640, 0), 0.7, 50)
                .setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 255, 255)))),
            new SphericalLight_1.SphericalLight(new Vector_1.Vector(0, 0, 0), 0.7, 150)
                .setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 235, 200))))
        ],
        objects: [
            //new Plane(new Vector(0, 1, 0), new Vector (0, -400, 0)).setMaterial(new Material(new Color(new RGBColor(115, 115, 115)), 0)),
            // bottom plane
            new Polygon_1.Polygon(new Vector_1.Vector(-700, -700, -700), new Vector_1.Vector(700, -700, -700), new Vector_1.Vector(700, -700, 700), new Vector_1.Vector(-700, -700, 700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(79, 166, 242)), 0).setLambertCoeff(1)),
            // front plane
            new Polygon_1.Polygon(new Vector_1.Vector(-700, -700, 700), new Vector_1.Vector(700, -700, 700), new Vector_1.Vector(700, 700, 700), new Vector_1.Vector(-700, 700, 700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
            // top plane
            new Polygon_1.Polygon(new Vector_1.Vector(-700, 700, -700), new Vector_1.Vector(-700, 700, 700), new Vector_1.Vector(700, 700, 700), new Vector_1.Vector(700, 700, -700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(245, 130, 130)), 0).setLambertCoeff(1)),
            //right plane
            new Polygon_1.Polygon(new Vector_1.Vector(700, -700, 700), new Vector_1.Vector(700, -700, -700), new Vector_1.Vector(700, 700, -700), new Vector_1.Vector(700, 700, 700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
            //left plane
            new Polygon_1.Polygon(new Vector_1.Vector(-700, -700, -700), new Vector_1.Vector(-700, -700, 700), new Vector_1.Vector(-700, 700, 700), new Vector_1.Vector(-700, 700, -700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
            // back plane
            new Polygon_1.Polygon(new Vector_1.Vector(700, -700, -700), new Vector_1.Vector(-700, -700, -700), new Vector_1.Vector(-700, 700, -700), new Vector_1.Vector(700, 700, -700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0)), 0).setLambertCoeff(1)),
            new Sphere_1.Sphere(new Vector_1.Vector(-250, -500, 450), 200)
                .setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0)), 1)),
            new Sphere_1.Sphere(new Vector_1.Vector(250, -500, -100), 200)
                .setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0, 255, 0)), 0))
        ]
    }));
    tracer.render(data[0], data[1], data[2], data[3]);
};
//# sourceMappingURL=TracerWorker.js.map