export class Tracer {
    buffer: number[] = [];
    ctx: CanvasRenderingContext2D;
    image: any;
    imageData: number[];
    iteration: number = 0;
    numberOfWorkers = 6;
    screenWidth: number = 250;
    screenHeight: number = 250;

    constructor (ctx: CanvasRenderingContext2D, screenWidth?: number, screenHeight?: number) {
        this.ctx = ctx;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.image = ctx.getImageData(0, 0, this.screenWidth, this.screenHeight);
        this.imageData = this.image['data'];

        for (let i = 0; i < this.screenWidth * this.screenHeight * 3; i++) {
            this.buffer.push(0);
        }
    }

    public run (): void {
        for (let i = 0; i < this.numberOfWorkers; i++) {
            let worker = new Worker('TracerWorker.js');

            worker.onmessage = (message) => {
                this.iteration++;

                console.log(this.iteration);

                let data = message.data;

                for (let j = 0; j < data.length; j++) {
                    this.buffer[j] += data[j];
                }

                for(var k = 0, j = 0; k < this.screenWidth * this.screenHeight * 4;) {
                    this.imageData[k++] = this.buffer[j++] * 255 / this.iteration;
                    this.imageData[k++] = this.buffer[j++] * 255 / this.iteration;
                    this.imageData[k++] = this.buffer[j++] * 255 / this.iteration;
                    this.imageData[k++] = 255;
                }

                this.image['data'].set(this.imageData);

                this.ctx.putImageData(this.image, 0, 0);
            };

            worker.postMessage([this.screenWidth, this.screenHeight]);
        }
    }
}
