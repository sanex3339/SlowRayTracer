export class Tracer {
    ctx: CanvasRenderingContext2D;
    currentX: number = 0;
    currentY: number = 0;
    emptyWorkers = [];
    doneCallback: () => void;
    image: any;
    imageData: number[];
    numberOfWorkers = 16;
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

        this.image = ctx.getImageData(0, 0, screenWidth, screenHeight);
        this.imageData = this.image['data'];

        for (let i = 0; i < this.numberOfWorkers; i++) {
            this.emptyWorkers.push(new Worker('TracerWorker.js'));
        }
    }

    private createWorker (worker, x, y) {
        worker.onmessage = (message) => {
            var data = message.data;

            if(typeof(data) === 'string') {
                data = JSON.parse(data);
            }

            this.imageData[(data[1] * this.screenWidth * 4) + (data[0] * 4)] = data[2];
            this.imageData[(data[1] * this.screenWidth * 4) + (data[0] * 4 + 1)] = data[3];
            this.imageData[(data[1] * this.screenWidth * 4) + (data[0] * 4 + 2)] = data[4];
            this.imageData[(data[1] * this.screenWidth * 4) + (data[0] * 4 + 3)] = 255;

            this.emptyWorkers.push(worker);

            this.pixelManager(this.currentX, this.currentY);
        };

        worker.postMessage([this.screenWidth, this.screenHeight, x, y]);
    }

    private pixelManager (x: number, y: number, callback?: () => void) {
        let self = this;

        if (callback){
            this.doneCallback = callback;
        }

        for (let w = 0, emptyWorkersLength = this.emptyWorkers.length; w < emptyWorkersLength; w++, x++) {
            let activeWorker = this.emptyWorkers.shift();

            if (x === this.screenWidth - 1 && y === this.screenHeight - 1) {
                return this.doneCallback ?  this.doneCallback() : false;
            }

            console.log(y, x);

            this.createWorker(activeWorker, x, y);

            if (x === this.screenWidth - 1) {
                this.currentX = 0;
                this.currentY++;

                this.image['data'] = this.imageData;
                this.ctx.putImageData(this.image, 0, 0);
            } else {
                this.currentX++;
            }
        }
    }

    public run (): void {
        this.startTime = new Date();

        this.pixelManager(this.currentX, this.currentY, () => {
            this.doneCallback = null;

            this.image['data'] = this.imageData;
            this.ctx.putImageData(this.image, 0, 0);

            this.endTime = new Date();
            console.log(`${(this.endTime - this.startTime) / 1000} секунд`);
        });
    }
}
