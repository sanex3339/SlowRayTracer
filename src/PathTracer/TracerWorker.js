/// <reference no-default-lib="true"/>
/// <reference path="lib/lib.webworker.d.ts" />
var AbstractLight_1 = require("./Lights/AbstractLight");
var Camera_1 = require("./Camera");
var Color_1 = require("./Color/Color");
var IntersectPoint_1 = require("./IntersectPoint");
var Material_1 = require("./Material");
var Plane_1 = require("./Objects/Plane");
var Ray_1 = require("./Ray");
var RGBColor_1 = require("./Color/RGBColor");
var Scene_1 = require("./Scene");
var Sphere_1 = require("./Objects/Sphere");
var SphericalLight_1 = require("./Lights/SphericalLight");
var Vector_1 = require("./Vector");
var Tracer = (function () {
    function Tracer() {
        this.buffer = [];
        this.screenWidth = 250;
        this.screenHeight = 250;
        for (var i = 0; i < this.screenWidth * this.screenHeight * 3; i++) {
            this.buffer.push(Color_1.Color.black);
        }
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
    Tracer.prototype.getColor = function (ray) {
        var intersection = this.trace(ray), diffuseColor = Color_1.Color.black, reflectColor = Color_1.Color.black, rayIteration = ray.getIteration();
        ray.setIteration(--rayIteration);
        if (rayIteration === 0) {
            return Color_1.Color.black;
        }
        if (!intersection.getIntersect()) {
            return Color_1.Color.black;
        }
        diffuseColor = this.getDiffuseColor(ray, intersection);
        reflectColor = this.getReflectionColor(ray, intersection);
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
            var radianceInRandomDirection = void 0;
            radianceRandomDirection = this.cosineSampleHemisphere(intersect.getOwner().getNormal(intersect.getHitPoint()));
            radianceInRandomDirection = this.getColor(new Ray_1.Ray(intersect.getHitPoint(), radianceRandomDirection, ray.getIteration()));
            radianceColor = radianceColor
                .add(radianceInRandomDirection);
            // lambert
            lambCos = -Vector_1.Vector.dot(lightDirection, intersect.getNormal());
            lambColor = lambColor.add(intersect
                .getOwner()
                .getMaterial()
                .getColor()
                .multiple(light.getMaterial()
                .getColor()
                .scaled(lightPower * lambCos * intersect.getOwner().getMaterial().getLambertCoeff())
                .add(radianceColor.divide(Math.PI))));
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
            /*let c = 0;

            for (let i = 0; i < this.aoSamples; i++) {
                let dir = this.cosineSampleHemisphere(intersect.getOwner().getNormal(intersect.getHitPoint()));

                let aoIntersect = this.trace(
                    new Ray(
                        intersect.getHitPoint(),
                        dir
                    )
                );

                if (!aoIntersect.getIntersect()) {
                    continue;
                }

                if (aoIntersect.getDistanceFromOrigin() > 200) {
                    continue;
                }

                c++;
            }*/
            /*pixelColor = pixelColor.add(
                lambColor.multiple(Color.white.scaled(1 - (c * 0.67 / this.aoSamples))).add(phongColor)
            );*/
            pixelColor = pixelColor.add(lambColor.add(phongColor));
        }
        return pixelColor;
    };
    Tracer.prototype.getReflectionColor = function (ray, intersect) {
        var reflectionColor, reflectionValue = intersect.getOwner().getMaterial().getReflectionValue(), reflectedRay;
        if (reflectionValue === 0) {
            return Color_1.Color.black;
        }
        reflectedRay = Vector_1.Vector.reflect(ray.getDirection(), intersect.getNormal());
        reflectionColor = this.getColor(new Ray_1.Ray(intersect.getHitPoint(), reflectedRay, ray.getIteration())).scaled(reflectionValue);
        return reflectionColor;
    };
    Tracer.prototype.getPerspectiveVector = function (x, y) {
        var camera = this.scene.getCamera();
        return Vector_1.Vector.normalize(Vector_1.Vector.add(camera.getForwardVector(), Vector_1.Vector.add(Vector_1.Vector.scale(camera.getRightVector(), camera.recenterX(x)), Vector_1.Vector.scale(camera.getUpVector(), camera.recenterY(y)))));
    };
    Tracer.prototype.getLightPower = function (intersect, light) {
        var lightPower = light.getPower(), lightRandomPoint, shadowRay, resultPower = 0;
        /*lightRandomPoint = light.getRandomPoint();

        shadowRay = this.trace(
            new Ray(
                intersect.getHitPoint(),
                Vector.substract(
                    Vector.substract(
                        light.getPosition(),
                        lightRandomPoint
                    ),
                    intersect.getHitPoint()
                )
            )
        );

        if (
            shadowRay.getIntersect() &&
            shadowRay.getOwner() instanceof AbstractLight
        ) {
            resultPower += (
                lightPower -
                (
                    Vector.substract(
                        Vector.substract(
                            light.getPosition(),
                            lightRandomPoint
                        ),
                        intersect.getHitPoint()
                    ).getLength() * (lightPower / light.getFadeRadius())
                )
            );
        }*/
        lightRandomPoint = this.cosineSampleHemisphere(intersect.getOwner().getNormal(intersect.getHitPoint()));
        shadowRay = this.trace(new Ray_1.Ray(intersect.getHitPoint(), lightRandomPoint));
        if (shadowRay.getIntersect() &&
            shadowRay.getOwner() instanceof AbstractLight_1.AbstractLight) {
            resultPower += (lightPower -
                (Vector_1.Vector.substract(Vector_1.Vector.substract(light.getPosition(), lightRandomPoint), intersect.getHitPoint()).getLength() * (lightPower / light.getFadeRadius())));
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
    Tracer.prototype.render = function (screenWidth, screenHeight) {
        var randoMultiplier = 0.5;
        var buffer, color, rand, ray;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        while (true) {
            buffer = [];
            for (var iteration = 0; iteration < 1; iteration++) {
                var i = 0;
                for (var y = 0; y < this.screenHeight; y++) {
                    for (var x = 0; x < this.screenWidth; x++) {
                        rand = 0;
                        if (Math.random() > 0.5) {
                            rand += Math.random() * randoMultiplier;
                        }
                        else {
                            rand -= Math.random() * randoMultiplier;
                        }
                        ray = new Ray_1.Ray(this.scene.getCamera().getPosition(), this.getPerspectiveVector(x + rand, y + rand));
                        this.buffer[i] = Color_1.Color.black.add(this.getColor(ray));
                        for (var component in this.buffer[i].getColor()) {
                            this.buffer[i][component] = Color_1.Color.sRGBEncode(this.buffer[i][component]);
                        }
                        buffer.push(this.buffer[i].getColor()['red']);
                        buffer.push(this.buffer[i].getColor()['green']);
                        buffer.push(this.buffer[i].getColor()['blue']);
                        i++;
                    }
                }
            }
            for (var i = 0; i < this.buffer.length; i++) {
                this.buffer[i].getColor()['red'] = 0.0;
                this.buffer[i].getColor()['green'] = 0.0;
                this.buffer[i].getColor()['blue'] = 0.0;
            }
            self.postMessage(buffer);
        }
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
            new SphericalLight_1.SphericalLight(new Vector_1.Vector(0, 600, 0), 1, 100)
                .setMaterial(new Material_1.Material(Color_1.Color.white)),
            new SphericalLight_1.SphericalLight(new Vector_1.Vector(0, 0, 0), 0.6, 150)
                .setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 235, 200))))
        ],
        objects: [
            new Plane_1.Plane(new Vector_1.Vector(0, 1, 0), new Vector_1.Vector(0, -700, 0)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0.75 * 255, 0.75 * 255, 0.75 * 255)), 0)),
            new Plane_1.Plane(new Vector_1.Vector(0, -1, 0), new Vector_1.Vector(0, 700, 0)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0.75 * 255, 0.75 * 255, 0.75 * 255)), 0)),
            new Plane_1.Plane(new Vector_1.Vector(-1, 0, 0), new Vector_1.Vector(700, 0, 0)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0.25 * 255, 0.25 * 255, 0.75 * 255)), 0)),
            new Plane_1.Plane(new Vector_1.Vector(1, 0, 0), new Vector_1.Vector(-700, 0, 0)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0.75 * 255, 0.25 * 255, 0.25 * 255)), 0)),
            new Plane_1.Plane(new Vector_1.Vector(0, 0, -1), new Vector_1.Vector(0, 0, 700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0.75 * 255, 0.75 * 255, 0.75 * 255)), 0)),
            new Plane_1.Plane(new Vector_1.Vector(0, 0, 1), new Vector_1.Vector(0, 0, -700)).setMaterial(new Material_1.Material(Color_1.Color.black, 0)),
            // bottom plane
            /*new Polygon(
                new Vector(-700, -700, -700),
                new Vector(700, -700, -700),
                new Vector(700, -700, 700),
                new Vector(-700, -700, 700)
            ).setMaterial(new Material(Color.white, 0).setLambertCoeff(1)),
            // front plane
            new Polygon(
                new Vector(-700, -700, 700),
                new Vector(700, -700, 700),
                new Vector(700, 700, 700),
                new Vector(-700, 700, 700)
            ).setMaterial(new Material(Color.white, 0).setLambertCoeff(1)),
            // top plane
            new Polygon(
                new Vector(-700, 700, 700),
                new Vector(700, 700, 700),
                new Vector(700, 700, -700),
                new Vector(-700, 700, -700)
            ).setMaterial(new Material(Color.white, 0).setLambertCoeff(1)),
            //right plane
            new Polygon(
                new Vector(700, -700, 700),
                new Vector(700, -700, -700),
                new Vector(700, 700, -700),
                new Vector(700, 700, 700)
            ).setMaterial(new Material(Color.blue).setLambertCoeff(1)),
            //left plane
            new Polygon(
                new Vector(-700, -700, -700),
                new Vector(-700, -700, 700),
                new Vector(-700, 700, 700),
                new Vector(-700, 700, -700)
            ).setMaterial(new Material(Color.red, 0).setLambertCoeff(1)),
            // back plane
            new Polygon(
                new Vector(700, -700, -700),
                new Vector(-700, -700, -700),
                new Vector(-700, 700, -700),
                new Vector(700, 700, -700)
            ).setMaterial(new Material(Color.black, 0).setLambertCoeff(1)),*/
            new Sphere_1.Sphere(new Vector_1.Vector(-250, -500, 450), 200)
                .setMaterial(new Material_1.Material(Color_1.Color.black, 1)),
            new Sphere_1.Sphere(new Vector_1.Vector(250, -500, 400), 200)
                .setMaterial(new Material_1.Material(Color_1.Color.green, 0))
        ]
    }));
    tracer.render(data[0], data[1]);
};
//# sourceMappingURL=TracerWorker.js.map