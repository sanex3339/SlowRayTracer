var Tracer = (function () {
    function Tracer(ctx, screenWidth, screenHeight) {
        this.currentX = 0;
        this.currentY = 0;
        this.emptyWorkers = [];
        this.numberOfWorkers = 16;
        this.screenWidth = 250;
        this.screenHeight = 250;
        this.ctx = ctx;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        if (this.screenWidth < this.numberOfWorkers) {
            this.numberOfWorkers = this.screenWidth - 2;
        }
        this.image = ctx.getImageData(0, 0, screenWidth, screenHeight);
        this.imageData = this.image['data'];
        for (var i = 0; i < this.numberOfWorkers; i++) {
            this.emptyWorkers.push(new Worker('TracerWorker.js'));
        }
    }
    Tracer.prototype.createWorker = function (worker, x, y) {
        var _this = this;
        worker.onmessage = function (message) {
            var data = message.data;
            if (typeof (data) === 'string') {
                data = JSON.parse(data);
            }
            _this.imageData[(data[1] * _this.screenWidth * 4) + (data[0] * 4)] = data[2];
            _this.imageData[(data[1] * _this.screenWidth * 4) + (data[0] * 4 + 1)] = data[3];
            _this.imageData[(data[1] * _this.screenWidth * 4) + (data[0] * 4 + 2)] = data[4];
            _this.imageData[(data[1] * _this.screenWidth * 4) + (data[0] * 4 + 3)] = 255;
            _this.emptyWorkers.push(worker);
            _this.pixelManager(_this.currentX, _this.currentY);
        };
        worker.postMessage([this.screenWidth, this.screenHeight, x, y]);
    };
    Tracer.prototype.pixelManager = function (x, y, callback) {
        var self = this;
        if (callback) {
            this.doneCallback = callback;
        }
        for (var w = 0, emptyWorkersLength = this.emptyWorkers.length; w < emptyWorkersLength; w++, x++) {
            var activeWorker = this.emptyWorkers.shift();
            if (x === this.screenWidth - 1 && y === this.screenHeight - 1) {
                return this.doneCallback ? this.doneCallback() : false;
            }
            console.log(y, x);
            this.createWorker(activeWorker, x, y);
            if (x === this.screenWidth - 1) {
                this.currentX = 0;
                this.currentY++;
                this.image['data'] = this.imageData;
                this.ctx.putImageData(this.image, 0, 0);
            }
            else {
                this.currentX++;
            }
        }
    };
    Tracer.prototype.run = function () {
        var _this = this;
        this.startTime = new Date();
        this.pixelManager(this.currentX, this.currentY, function () {
            _this.doneCallback = null;
            _this.image['data'] = _this.imageData;
            _this.ctx.putImageData(_this.image, 0, 0);
            _this.endTime = new Date();
            console.log((_this.endTime - _this.startTime) / 1000 + " \u0441\u0435\u043A\u0443\u043D\u0434");
        });
    };
    return Tracer;
})();
exports.Tracer = Tracer;
//# sourceMappingURL=Tracer.js.map