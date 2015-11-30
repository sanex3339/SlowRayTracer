var Tracer = (function () {
    function Tracer(ctx, screenWidth, screenHeight) {
        this.buffer = [];
        this.iteration = 0;
        this.numberOfWorkers = 6;
        this.screenWidth = 250;
        this.screenHeight = 250;
        this.ctx = ctx;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.image = ctx.getImageData(0, 0, this.screenWidth, this.screenHeight);
        this.imageData = this.image['data'];
        for (var i = 0; i < this.screenWidth * this.screenHeight * 3; i++) {
            this.buffer.push(0);
        }
    }
    Tracer.prototype.run = function () {
        var _this = this;
        for (var i = 0; i < this.numberOfWorkers; i++) {
            var worker = new Worker('TracerWorker.js');
            worker.onmessage = function (message) {
                _this.iteration++;
                console.log(_this.iteration);
                var data = message.data;
                for (var j_1 = 0; j_1 < data.length; j_1++) {
                    _this.buffer[j_1] += data[j_1];
                }
                for (var k = 0, j = 0; k < _this.screenWidth * _this.screenHeight * 4;) {
                    _this.imageData[k++] = _this.buffer[j++] * 255 / _this.iteration;
                    _this.imageData[k++] = _this.buffer[j++] * 255 / _this.iteration;
                    _this.imageData[k++] = _this.buffer[j++] * 255 / _this.iteration;
                    _this.imageData[k++] = 255;
                }
                _this.image['data'] = _this.imageData;
                _this.ctx.putImageData(_this.image, 0, 0);
            };
            worker.postMessage([this.screenWidth, this.screenHeight]);
        }
    };
    return Tracer;
})();
exports.Tracer = Tracer;
//# sourceMappingURL=Tracer.js.map