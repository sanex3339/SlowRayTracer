var Tracer = (function () {
    function Tracer(ctx, screenWidth, screenHeight) {
        this.currentX = 0;
        this.currentY = 0;
        this.emptyWorkers = [];
        this.numberOfWorkers = 16;
        this.pixelsArray = [];
        this.screenWidth = 250;
        this.screenHeight = 250;
        this.ctx = ctx;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        if (this.screenWidth < this.numberOfWorkers) {
            this.numberOfWorkers = this.screenWidth - 2;
        }
        this.image = ctx.getImageData(0, 0, this.screenWidth, this.screenHeight);
        this.imageData = this.image['data'];
        for (var i = 0; i < this.numberOfWorkers; i++) {
            this.emptyWorkers.push(new Worker('TracerWorker.js'));
        }
        for (var y = 0; y < this.screenHeight; y++) {
            for (var x = 0; x < this.screenWidth; x++) {
                this.pixelsArray.push({
                    x: x,
                    y: y
                });
            }
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
            if (_this.pixelsArray.length === 0 && _this.emptyWorkers.length === _this.numberOfWorkers) {
                return _this.doneCallback();
            }
            if (_this.pixelsArray.length !== 0) {
                _this.pixelManager();
            }
        };
        worker.postMessage([this.screenWidth, this.screenHeight, x, y]);
    };
    Tracer.prototype.pixelManager = function (callback) {
        var activeWorker, pixels;
        if (callback) {
            this.doneCallback = callback;
        }
        for (var w = 0, emptyWorkersLength = this.emptyWorkers.length; w < emptyWorkersLength; w++) {
            activeWorker = this.emptyWorkers.shift();
            pixels = this.pixelsArray.shift();
            console.log(pixels['y'], pixels['x']);
            this.createWorker(activeWorker, pixels['x'], pixels['y']);
            if (pixels['x'] === this.screenWidth - 1) {
                this.image['data'] = this.imageData;
                this.ctx.putImageData(this.image, 0, 0);
            }
        }
    };
    Tracer.prototype.run = function () {
        var _this = this;
        this.startTime = new Date();
        this.pixelManager(function () {
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