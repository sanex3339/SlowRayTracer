var Tracer_1 = require("./Tracer");
var screenWidth = 450, screenHeight = 450;
var canvas = document.createElement("canvas"), ctx = canvas.getContext('2d'), image, tracer;
canvas.width = screenWidth;
canvas.height = screenHeight;
document.body.appendChild(canvas);
tracer = new Tracer_1.Tracer(ctx, screenWidth, screenHeight);
tracer.run();
image = canvas.toDataURL("image/png");
document.write("<img src='" + image + "' />");
//# sourceMappingURL=PathTracer.js.map