import { Camera } from "./Camera";
import { Color } from "./Color/Color";
import { SphericalLight } from "./Lights/SphericalLight";
import { Material } from "./Material";
import { Plane } from "./Objects/Plane";
import { Polygon } from "./Objects/Polygon";
import { Ray } from "./Ray";
import { RGBColor } from "./Color/RGBColor";
import { Scene } from "./Scene";
import { Sphere } from "./Objects/Sphere";
import { Tracer } from "./Tracer";
import { Vector } from "./Vector";

const screenWidth = 100,
    screenHeight = 100;

let canvas: HTMLCanvasElement = document.createElement("canvas"),
    ctx: CanvasRenderingContext2D = canvas.getContext('2d'),
    image: any,
    tracer = new Tracer();

canvas.width = screenWidth;
canvas.height = screenHeight;
canvas.style.display = 'none';
document.body.appendChild(canvas);

tracer.setScene(
    new Scene({
        camera: new Camera(
            new Vector(0, 0, -699),
            new Vector(0, 0, 1),
            screenWidth,
            screenHeight
        ),
        lights: [
            new SphericalLight(new Vector (0, 640, 0), 1.2, 50)
                .setMaterial(new Material(new Color(new RGBColor(255, 255, 255))))
        ],
        objects: [
            //new Plane(new Vector(0, 1, 0), -400).setMaterial(new Material(new Color(new RGBColor(115, 115, 115)), 0)),
            // bottom plane
            new Polygon(
                new Vector(-700, -700, -700),
                new Vector(700, -700, -700),
                new Vector(700, -700, 700),
                new Vector(-700, -700, 700)
            ).setMaterial(new Material(new Color(new RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
            // front plane
            new Polygon(
                new Vector(-700, -700, 700),
                new Vector(700, -700, 700),
                new Vector(700, 700, 700),
                new Vector(-700, 700, 700)
            ).setMaterial(new Material(new Color(new RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
            // top plane
            new Polygon(
                new Vector(-700, 700, -700),
                new Vector(-700, 700, 700),
                new Vector(700, 700, 700),
                new Vector(700, 700, -700)
            ).setMaterial(new Material(new Color(new RGBColor(255, 255, 255)), 0).setLambertCoeff(1)),
            //right plane
            new Polygon(
                new Vector(700, -700, 700),
                new Vector(700, -700, -700),
                new Vector(700, 700, -700),
                new Vector(700, 700, 700)
            ).setMaterial(new Material(new Color(new RGBColor(0, 0, 255)), 0).setLambertCoeff(1)),
            //left plane
            new Polygon(
                new Vector(-700, -700, -700),
                new Vector(-700, -700, 700),
                new Vector(-700, 700, 700),
                new Vector(-700, 700, -700)
            ).setMaterial(new Material(new Color(new RGBColor(255, 0, 0)), 0).setLambertCoeff(1)),
            // back plane
            new Polygon(
                new Vector(700, -700, -700),
                new Vector(-700, -700, -700),
                new Vector(-700, 700, -700),
                new Vector(700, 700, -700)
            ).setMaterial(new Material(new Color(new RGBColor(0, 0, 0)), 0).setLambertCoeff(1)),
            new Sphere(new Vector(-250, -500, 450), 200)
                .setMaterial(new Material(new Color(new RGBColor(0, 0, 0)), 1)),
            new Sphere(new Vector(250, -500, 400), 200)
                .setMaterial(new Material(new Color(new RGBColor(0, 255, 0)), 0))
        ]
    })
);

tracer.render(ctx, screenWidth, screenHeight);
image = canvas.toDataURL("image/png");
document.write(`<img src=\'${image}\' />`);
