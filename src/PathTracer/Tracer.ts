import { Camera } from "./Camera";
import { Color } from "./Color/Color";
import { Ray } from "./Ray";
import { RGBColor } from "./Color/RGBColor";
import { RTMath } from "./RTMath";
import { Scene } from "./Scene";
import { Sphere } from "./Objects/Sphere";
import { Vector } from "./Vector";
import {Plane} from "./Objects/Plane";
import {AbstractLight} from "./Lights/AbstractLight";

export class Tracer {
    private scene: Scene;
    private raysPerPixel: number = 1;
    private screenWidth: number = 250;
    private screenHeight: number = 250;

    private getColor (ray: Ray, recurcive: boolean = true): Color {
        let intersect = this.trace(ray),
            diffuseColor: Color = new Color(new RGBColor(0, 0, 0)),
            reflectColor: Color = new Color(new RGBColor(0, 0, 0));

        if (intersect['owner'] === null) {
            return new Color(new RGBColor(0, 0, 0));
        }

        diffuseColor = this.getDiffuseColor(ray, intersect, recurcive);

        if (recurcive) {
            reflectColor = this.getReflectionColor(ray, intersect);
        }

        return diffuseColor.add(reflectColor);
    }

    private getDiffuseColor (ray: Ray, intersect: any, recursive: boolean = true): Color {
        let lambColor: Color,
            radianceColor: Color,
            phongColor: Color,
            pixelColor: Color = new Color(new RGBColor(0, 0, 0)),
            lightDirection: Vector,
            reflectPhongVectorDir: Vector,
            lambCos: number,
            phongCos: number,
            phong: number;

        for (let light of this.scene.getLights()) {
            // if light - return only light color
            if (intersect['ownerType'] === 'light') {
                return intersect['owner']
                    .getMaterial()
                    .getColor();
            }

            let lightPower = this.getLightPower(intersect, light);

            lambColor = new Color(new RGBColor(0, 0, 0));
            radianceColor = new Color(new RGBColor(0, 0, 0));
            phongColor = new Color(new RGBColor(0, 0, 0));
            lightDirection = Vector.normalized(
                Vector.substract(
                    intersect['point'],
                    light.getPosition()
                )
            );

            // lambert

            lambCos = Math.max(
                0,
                -Vector.dot(
                    lightDirection,
                    intersect['owner'].getNormal(intersect['point'])
                )
            );

            lambColor = lambColor.add(
                intersect['owner']
                    .getMaterial()
                    .getColor()
                    .multiple(
                        light.getMaterial()
                            .getColor()
                            .scaled(
                                lightPower * lambCos * intersect['owner'].getMaterial().getLambertCoeff()
                            )
                    )
            );

            if (recursive) {
                const NUM_DIRECTIONS = 35;

                let randDir = (normal: Vector) => {
                    while (true) {
                        let dir: Vector = new Vector(
                            Math.random() - 0.5,
                            Math.random() - 0.5,
                            Math.random() - 0.5
                        );

                        if (Vector.dot(dir, dir) > 0.5 ** 2) {
                            continue;
                        }

                        dir = Vector.normalized(dir);

                        if (Vector.dot(dir, normal) < 0) {
                            dir = Vector.inverse(dir);
                        }

                        return dir;
                    }
                };

                for (let i = 0; i < NUM_DIRECTIONS; ++i) {
                    let dir: Vector = randDir(intersect['owner'].getNormal(intersect['point']));

                    let radianceInThatDir: Color = this.getColor(new Ray(intersect['point'], dir), false);

                    let cosI: number = Vector.dot(
                        dir,
                        intersect['owner'].getNormal(intersect['point'])
                    );

                    radianceColor = radianceColor
                        .add(
                            intersect['owner']
                                .getMaterial()
                                .getColor()
                                .divide(Math.PI)
                                .multiple(
                                    radianceInThatDir
                                        .scaled(cosI)
                                )

                        )
                }
            }

            // phong

            reflectPhongVectorDir = Vector.reflect(
                lightDirection,
                intersect['owner'].getNormal(intersect['point'])
            );
            phongCos = -Vector.dot(reflectPhongVectorDir, ray.getDirection());

            if (phongCos > 0) {
                phong = Math.pow(phongCos, 35);
                phongColor = phongColor.add(
                    intersect['owner']
                        .getMaterial()
                        .getColor()
                        .multiple(
                            light.getMaterial()
                                .getColor()
                                .scaled(
                                    lightPower * phong * intersect['owner'].getMaterial().getPhongCoeff()
                                )
                        )
                );
            }

            pixelColor = pixelColor.add(lambColor.add(radianceColor.divide(15))).add(phongColor);
        }

        return pixelColor;
    }

    private getReflectionColor (ray: Ray, intersect: any): any {
        let reflectionColor: Color,
            reflectedRay: Vector;

        ray.setIteration(ray.getIteration() - 1);

        if (
            ray.getIteration() === 0 ||
            intersect['owner'].getMaterial().getReflectionValue() === 0
        ) {
            return new Color(new RGBColor(0, 0, 0));
        }

        reflectedRay = Vector.reflect(
            ray.getDirection(),
            intersect['owner'].getNormal(intersect['point'])
        );

        reflectionColor = this.getColor(
            new Ray(intersect['point'], reflectedRay, ray.getIteration())
        ).scaled(
            intersect['owner']
                .getMaterial()
                .getReflectionValue()
        );

        return reflectionColor;
    }

    private getPerspectiveVector (x: number, y: number, screenWidth: number, screenHeight: number) {
        let camera: Camera = this.scene.getCamera();

        return Vector.normalized(
            Vector.add(
                camera.getForwardVector(),
                Vector.add(
                    Vector.scaled(
                        camera.getRightVector(),
                        camera.recenterX(x)
                    ),
                    Vector.scaled(
                        camera.getUpVector(),
                        camera.recenterY(y)
                    )
                )
            )
        );
    }

    private getLightPower (intersect: any, light: AbstractLight): number {
        const sampling = 10;

        let lightPower = light.getPower(),
            lightRandomPoint: Vector,
            resultPower = 0;

        for (let i = 0; i < sampling; i++) {
            lightRandomPoint = light.getRandomPoint();

            let lightRay = this.trace(
                new Ray(
                    intersect['point'],
                    Vector.substract(
                        Vector.substract(
                            light.getPosition(),
                            lightRandomPoint
                        ),
                        intersect['point']
                    )
                )
            );

            if (lightRay['point'] === null) {
                continue;
            }

            if (lightRay['owner'] !== light) {
                continue;
            }

            resultPower += (
                lightPower -
                (
                    Vector.substract(
                        Vector.substract(
                            light.getPosition(),
                            lightRandomPoint
                        ),
                        intersect['point']
                    ).getLength() * (lightPower / light.getFadeRadius())
                )
            ) / sampling;
        }

        return resultPower;
    }

    private trace (ray: Ray): {distance: number, point: Vector, owner: any, ownerType: string} {
        let result = {
                distance: 0,
                point: null,
                owner: null,
                ownerType: null
            },
            intersectData: any,
            sceneObjectsWithLights: any[] = this.scene.getObjects().concat(this.scene.getLights());

        for (let object of sceneObjectsWithLights) {
            intersectData = object.getIntersectData(ray);

            if (
                intersectData &&
                intersectData['distance'] > 0 &&
                (
                    result['owner'] === null ||
                    intersectData['distance'] < result['distance']
                )
            ) {
                result['distance'] = intersectData['distance'];
                result['point'] = intersectData['point'];
                result['owner'] = object;
                result['ownerType'] = object.getType();
            }
        }

        return result;
    }

    public render (ctx: CanvasRenderingContext2D, screenWidth?: number, screenHeight?: number): void {
        const randoMultiplier = 0.5;

        let color: Color,
            rand: number,
            ray: Ray,
            rgbColor: {
                red: number,
                green: number,
                blue: number
            };

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        for (let y = 0; y < screenHeight; y++) {
            for (let x = 0; x < screenWidth; x++) {
                color = new Color(new RGBColor(0, 0, 0));
                console.log(y, x);

                for (let iter = 0; iter < this.raysPerPixel; iter++) {
                    rand = 0;

                    console.log(iter);

                    if (this.raysPerPixel > 1) {
                        if (iter % 2) {
                            rand += Math.random() * randoMultiplier;
                        }  else {
                            rand -= Math.random() * randoMultiplier;
                        }
                    }

                    ray = new Ray(
                        this.scene.getCamera().getPosition(),
                        this.getPerspectiveVector(x + rand, y + rand, screenWidth, screenHeight)
                    );

                    color = color.add(this.getColor(ray));
                }

                color = color.divide(this.raysPerPixel);

                for (let component in color) {
                    color[component] = Color.sRGBEncode(color[component]);
                }

                rgbColor = Color.toRGB(color);

                ctx.fillStyle = `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`;
                ctx.fillRect(x, y, x + 1, y + 1);
            }
        }

    }

    public setScene (scene: Scene): void {
        this.scene = scene;
    }
}
