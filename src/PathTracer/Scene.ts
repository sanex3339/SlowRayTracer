import { Camera } from "./Camera";
import { AbstractLight } from "./Lights/AbstractLight";

export class Scene {
    private camera: Camera;
    private objects: any[] = [];
    private lights: AbstractLight[] = [];

    constructor (objects: any) {
        this.objects = objects.objects;
        this.camera = objects.camera;
        this.lights = objects.lights;
    }

    public addObject (object: any): void {
        this.objects.push(object);
    }

    public getCamera (): Camera {
        return this.camera;
    }

    public getLights (): AbstractLight[] {
        return this.lights;
    }

    public getObjects (): any[] {
        return this.objects;
    }
}
