import { Tracer } from "./Tracer";

const screenWidth = 250,
    screenHeight = 250;

let canvas: HTMLCanvasElement = document.createElement("canvas"),
    ctx: CanvasRenderingContext2D = canvas.getContext('2d'),
    image: any,
    tracer: Tracer;

canvas.width = screenWidth;
canvas.height = screenHeight;
document.body.appendChild(canvas);

tracer = new Tracer(ctx, screenWidth, screenHeight);
tracer.run();

image = canvas.toDataURL("image/png");
document.write(`<img src=\'${image}\' />`);
