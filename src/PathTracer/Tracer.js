var Color_1 = require("./Color/Color");
var Ray_1 = require("./Ray");
var RGBColor_1 = require("./Color/RGBColor");
var Vector_1 = require("./Vector");
var Tracer = (function () {
    function Tracer() {
        this.raysPerPixel = 1;
        this.screenWidth = 250;
        this.screenHeight = 250;
    }
    Tracer.prototype.getColor = function (ray, recurcive) {
        if (recurcive === void 0) { recurcive = true; }
        var intersect = this.trace(ray), diffuseColor = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0)), reflectColor = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
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
        var lambColor, radianceColor, phongColor, pixelColor = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0)), lightDirection, reflectPhongVectorDir, lambCos, phongCos, phong;
        for (var _i = 0, _a = this.scene.getLights(); _i < _a.length; _i++) {
            var light = _a[_i];
            // if light - return only light color
            if (intersect['ownerType'] === 'light') {
                return intersect['owner']
                    .getMaterial()
                    .getColor();
            }
            var lightPower = this.getLightPower(intersect, light);
            lambColor = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
            radianceColor = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
            phongColor = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
            lightDirection = Vector_1.Vector.normalized(Vector_1.Vector.substract(intersect['point'], light.getPosition()));
            // lambert
            lambCos = Math.max(0, -Vector_1.Vector.dot(lightDirection, intersect['owner'].getNormal(intersect['point'])));
            lambColor = lambColor.add(intersect['owner']
                .getMaterial()
                .getColor()
                .multiple(light.getMaterial()
                .getColor()
                .scaled(lightPower * lambCos * intersect['owner'].getMaterial().getLambertCoeff())));
            if (recursive) {
                var NUM_DIRECTIONS = 35;
                var randDir = function (normal) {
                    while (true) {
                        var dir = new Vector_1.Vector(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                        if (Vector_1.Vector.dot(dir, dir) > Math.pow(0.5, 2)) {
                            continue;
                        }
                        dir = Vector_1.Vector.normalized(dir);
                        if (Vector_1.Vector.dot(dir, normal) < 0) {
                            dir = Vector_1.Vector.inverse(dir);
                        }
                        return dir;
                    }
                };
                for (var i = 0; i < NUM_DIRECTIONS; ++i) {
                    var dir = randDir(intersect['owner'].getNormal(intersect['point']));
                    var radianceInThatDir = this.getColor(new Ray_1.Ray(intersect['point'], dir), false);
                    var cosI = Vector_1.Vector.dot(dir, intersect['owner'].getNormal(intersect['point']));
                    radianceColor = radianceColor
                        .add(intersect['owner']
                        .getMaterial()
                        .getColor()
                        .divide(Math.PI)
                        .multiple(radianceInThatDir
                        .scaled(cosI)));
                }
            }
            // phong
            reflectPhongVectorDir = Vector_1.Vector.reflect(lightDirection, intersect['owner'].getNormal(intersect['point']));
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
            pixelColor = pixelColor.add(lambColor.add(radianceColor.divide(15))).add(phongColor);
        }
        return pixelColor;
    };
    Tracer.prototype.getReflectionColor = function (ray, intersect) {
        var reflectionColor, reflectedRay;
        ray.setIteration(ray.getIteration() - 1);
        if (ray.getIteration() === 0 ||
            intersect['owner'].getMaterial().getReflectionValue() === 0) {
            return new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
        }
        reflectedRay = Vector_1.Vector.reflect(ray.getDirection(), intersect['owner'].getNormal(intersect['point']));
        reflectionColor = this.getColor(new Ray_1.Ray(intersect['point'], reflectedRay, ray.getIteration())).scaled(intersect['owner']
            .getMaterial()
            .getReflectionValue());
        return reflectionColor;
    };
    Tracer.prototype.getPerspectiveVector = function (x, y, screenWidth, screenHeight) {
        var camera = this.scene.getCamera();
        return Vector_1.Vector.normalized(Vector_1.Vector.add(camera.getForwardVector(), Vector_1.Vector.add(Vector_1.Vector.scaled(camera.getRightVector(), camera.recenterX(x)), Vector_1.Vector.scaled(camera.getUpVector(), camera.recenterY(y)))));
    };
    Tracer.prototype.getLightPower = function (intersect, light) {
        var sampling = 10;
        var lightPower = light.getPower(), lightRandomPoint, resultPower = 0;
        for (var i = 0; i < sampling; i++) {
            lightRandomPoint = light.getRandomPoint();
            var lightRay = this.trace(new Ray_1.Ray(intersect['point'], Vector_1.Vector.substract(Vector_1.Vector.substract(light.getPosition(), lightRandomPoint), intersect['point'])));
            if (lightRay['point'] === null) {
                continue;
            }
            if (lightRay['owner'] !== light) {
                continue;
            }
            resultPower += (lightPower -
                (Vector_1.Vector.substract(Vector_1.Vector.substract(light.getPosition(), lightRandomPoint), intersect['point']).getLength() * (lightPower / light.getFadeRadius()))) / sampling;
        }
        return resultPower;
    };
    Tracer.prototype.trace = function (ray) {
        var result = {
            distance: 0,
            point: null,
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
            }
        }
        return result;
    };
    Tracer.prototype.render = function (ctx, screenWidth, screenHeight) {
        var randoMultiplier = 0.5;
        var color, rand, ray, rgbColor;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        for (var y = 0; y < screenHeight; y++) {
            for (var x = 0; x < screenWidth; x++) {
                color = new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0));
                console.log(y, x);
                for (var iter = 0; iter < this.raysPerPixel; iter++) {
                    rand = 0;
                    console.log(iter);
                    if (this.raysPerPixel > 1) {
                        if (iter % 2) {
                            rand += Math.random() * randoMultiplier;
                        }
                        else {
                            rand -= Math.random() * randoMultiplier;
                        }
                    }
                    ray = new Ray_1.Ray(this.scene.getCamera().getPosition(), this.getPerspectiveVector(x + rand, y + rand, screenWidth, screenHeight));
                    color = color.add(this.getColor(ray));
                }
                color = color.divide(this.raysPerPixel);
                for (var component in color) {
                    color[component] = Color_1.Color.sRGBEncode(color[component]);
                }
                rgbColor = Color_1.Color.toRGB(color);
                ctx.fillStyle = "rgb(" + rgbColor.red + ", " + rgbColor.green + ", " + rgbColor.blue + ")";
                ctx.fillRect(x, y, x + 1, y + 1);
            }
        }
    };
    Tracer.prototype.setScene = function (scene) {
        this.scene = scene;
    };
    return Tracer;
})();
exports.Tracer = Tracer;
//# sourceMappingURL=Tracer.js.map