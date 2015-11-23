var Camera_1 = require("./Camera");
var Color_1 = require("./Color/Color");
var SphericalLight_1 = require("./Lights/SphericalLight");
var Material_1 = require("./Material");
var Polygon_1 = require("./Objects/Polygon");
var RGBColor_1 = require("./Color/RGBColor");
var Scene_1 = require("./Scene");
var Sphere_1 = require("./Objects/Sphere");
var Tracer_1 = require("./Tracer");
var Vector_1 = require("./Vector");
var screenWidth = 100, screenHeight = 100;
var canvas = document.createElement("canvas"), ctx = canvas.getContext('2d'), image, tracer = new Tracer_1.Tracer();
canvas.width = screenWidth;
canvas.height = screenHeight;
canvas.style.display = 'none';
document.body.appendChild(canvas);
tracer.setScene(new Scene_1.Scene({
    camera: new Camera_1.Camera(new Vector_1.Vector(0, 0, -699), new Vector_1.Vector(0, 0, 1), screenWidth, screenHeight),
    lights: [
        new SphericalLight_1.SphericalLight(new Vector_1.Vector(0, 640, 0), 1.2, 50)
            .setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 255, 255))))
    ],
    objects: [
        //new Plane(new Vector(0, 1, 0), -400).setMaterial(new Material(new Color(new RGBColor(115, 115, 115)), 0)),
        // bottom plane
        new Polygon_1.Polygon(new Vector_1.Vector(-700, -700, -700), new Vector_1.Vector(700, -700, -700), new Vector_1.Vector(700, -700, 700), new Vector_1.Vector(-700, -700, 700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
        // front plane
        new Polygon_1.Polygon(new Vector_1.Vector(-700, -700, 700), new Vector_1.Vector(700, -700, 700), new Vector_1.Vector(700, 700, 700), new Vector_1.Vector(-700, 700, 700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
        // top plane
        new Polygon_1.Polygon(new Vector_1.Vector(-700, 700, -700), new Vector_1.Vector(-700, 700, 700), new Vector_1.Vector(700, 700, 700), new Vector_1.Vector(700, 700, -700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
        //right plane
        new Polygon_1.Polygon(new Vector_1.Vector(700, -700, 700), new Vector_1.Vector(700, -700, -700), new Vector_1.Vector(700, 700, -700), new Vector_1.Vector(700, 700, 700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 255)), 0).setLambertCoeff(1)),
        //left plane
        new Polygon_1.Polygon(new Vector_1.Vector(-700, -700, -700), new Vector_1.Vector(-700, -700, 700), new Vector_1.Vector(-700, 700, 700), new Vector_1.Vector(-700, 700, -700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255, 0, 0)), 0).setLambertCoeff(1)),
        // back plane
        new Polygon_1.Polygon(new Vector_1.Vector(700, -700, -700), new Vector_1.Vector(-700, -700, -700), new Vector_1.Vector(-700, 700, -700), new Vector_1.Vector(700, 700, -700)).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0)), 0).setLambertCoeff(1)),
        new Sphere_1.Sphere(new Vector_1.Vector(-250, -500, 450), 200)
            .setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0, 0, 0)), 1)),
        new Sphere_1.Sphere(new Vector_1.Vector(250, -500, 400), 200)
            .setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(0, 255, 0)), 0))
    ]
}));
tracer.render(ctx, screenWidth, screenHeight);
image = canvas.toDataURL("image/png");
document.write("<img src='" + image + "' />");
//# sourceMappingURL=PathTracer.js.map