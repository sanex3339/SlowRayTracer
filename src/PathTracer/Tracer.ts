export class Tracer {
    ctx: CanvasRenderingContext2D;
    currentX: number = 0;
    currentY: number = 0;
    emptyWorkers = [];
    doneCallback: () => void;
    image: any;
    imageData: number[];
    numberOfWorkers = 1;
    pixelsArray: any[] = [];
    screenWidth: number = 250;
    screenHeight: number = 250;
    startTime: any;
    endTime: any;

    constructor (ctx: CanvasRenderingContext2D, screenWidth?: number, screenHeight?: number) {
        this.ctx = ctx;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        if (this.screenWidth < this.numberOfWorkers) {
            this.numberOfWorkers = this.screenWidth - 2;
        }

        this.image = ctx.getImageData(0, 0, this.screenWidth, this.screenHeight);
        this.imageData = this.image['data'];

        for (let i = 0; i < this.numberOfWorkers; i++) {
            this.emptyWorkers.push(new Worker('TracerWorker.js'));
        }

        for (let y = 0; y < this.screenHeight; y++) {
            for (let x = 0; x < this.screenWidth; x++) {
                this.pixelsArray.push({
                    x,
                    y
                });
            }
        }
    }

    private createWorker (worker, x, y) {
        worker.onmessage = (message) => {
            let data = message.data;

            if(typeof(data) === 'string') {
                data = JSON.parse(data);
            }

            this.imageData[(data[1] * this.screenWidth * 4) + (data[0] * 4)] = data[2];
            this.imageData[(data[1] * this.screenWidth * 4) + (data[0] * 4 + 1)] = data[3];
            this.imageData[(data[1] * this.screenWidth * 4) + (data[0] * 4 + 2)] = data[4];
            this.imageData[(data[1] * this.screenWidth * 4) + (data[0] * 4 + 3)] = 255;

            this.emptyWorkers.push(worker);

            if (this.pixelsArray.length === 0 && this.emptyWorkers.length === this.numberOfWorkers) {
                return this.doneCallback();
            }

            if (this.pixelsArray.length !== 0) {
                this.pixelManager();
            }
        };

        worker.postMessage([this.screenWidth, this.screenHeight, x, y]);
    }

    private pixelManager (callback?: () => void) {
        let activeWorker,
            pixels: any[];

        if (callback) {
            this.doneCallback = callback;
        }

        for (let w = 0, emptyWorkersLength = this.emptyWorkers.length; w < emptyWorkersLength; w++) {
            activeWorker = this.emptyWorkers.shift();
            pixels = this.pixelsArray.shift();

            // console.log(pixels['y'], pixels['x']);

            this.createWorker(activeWorker, pixels['x'], pixels['y']);

            if (pixels['x'] === this.screenWidth - 1) {
                this.image['data'] = this.imageData;
                this.ctx.putImageData(this.image, 0, 0)
            }
        }
    }

    public run (): void {
        this.startTime = new Date();

        this.pixelManager(() => {
            this.image['data'] = this.imageData;
            this.ctx.putImageData(this.image, 0, 0);

            this.endTime = new Date();
            console.log(`${(this.endTime - this.startTime) / 1000} секунд`);
        });
    }
}
