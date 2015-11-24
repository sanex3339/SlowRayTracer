(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PathTracer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Tracer_1=require("./Tracer"),screenWidth=200,screenHeight=200,canvas=document.createElement("canvas"),ctx=canvas.getContext("2d"),image,tracer;canvas.width=screenWidth,canvas.height=screenHeight,document.body.appendChild(canvas),tracer=new Tracer_1.Tracer(ctx,screenWidth,screenHeight),tracer.run(),image=canvas.toDataURL("image/png"),document.write("<img src='"+image+"' />");


},{"./Tracer":2}],2:[function(require,module,exports){
var Tracer=function(){function e(e,t,r){this.currentX=0,this.currentY=0,this.emptyWorkers=[],this.numberOfWorkers=16,this.pixelsArray=[],this.screenWidth=250,this.screenHeight=250,this.ctx=e,this.screenWidth=t,this.screenHeight=r,this.screenWidth<this.numberOfWorkers&&(this.numberOfWorkers=this.screenWidth-2),this.image=e.getImageData(0,0,this.screenWidth,this.screenHeight),this.imageData=this.image.data;for(var i=0;i<this.numberOfWorkers;i++)this.emptyWorkers.push(new Worker("TracerWorker.js"));for(var s=0;s<this.screenHeight;s++)for(var a=0;a<this.screenWidth;a++)this.pixelsArray.push({x:a,y:s})}return e.prototype.createWorker=function(e,t,r){var i=this;e.onmessage=function(t){var r=t.data;return"string"==typeof r&&(r=JSON.parse(r)),i.imageData[r[1]*i.screenWidth*4+4*r[0]]=r[2],i.imageData[r[1]*i.screenWidth*4+(4*r[0]+1)]=r[3],i.imageData[r[1]*i.screenWidth*4+(4*r[0]+2)]=r[4],i.imageData[r[1]*i.screenWidth*4+(4*r[0]+3)]=255,i.emptyWorkers.push(e),0===i.pixelsArray.length&&i.emptyWorkers.length===i.numberOfWorkers?i.doneCallback():void(0!==i.pixelsArray.length&&i.pixelManager())},e.postMessage([this.screenWidth,this.screenHeight,t,r])},e.prototype.pixelManager=function(e){var t,r;e&&(this.doneCallback=e);for(var i=0,s=this.emptyWorkers.length;s>i;i++)t=this.emptyWorkers.shift(),r=this.pixelsArray.shift(),console.log(r.y,r.x),this.createWorker(t,r.x,r.y),r.x===this.screenWidth-1&&(this.image.data=this.imageData,this.ctx.putImageData(this.image,0,0))},e.prototype.run=function(){var e=this;this.startTime=new Date,this.pixelManager(function(){e.image.data=e.imageData,e.ctx.putImageData(e.image,0,0),e.endTime=new Date,console.log((e.endTime-e.startTime)/1e3+" секунд")})},e}();exports.Tracer=Tracer;


},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9zb3VyY2UvUGF0aFRyYWNlci50cyIsIi9zb3VyY2UvVHJhY2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsR0FBQSxVQUFBLFFBQXVCLFlBRWpCLFlBQWMsSUFDaEIsYUFBZSxJQUVmLE9BQTRCLFNBQVMsY0FBYyxVQUNuRCxJQUFnQyxPQUFPLFdBQVcsTUFDbEQsTUFDQSxNQUVKLFFBQU8sTUFBUSxZQUNmLE9BQU8sT0FBUyxhQUNoQixTQUFTLEtBQUssWUFBWSxRQUUxQixPQUFTLEdBQUksVUFBQSxPQUFPLElBQUssWUFBYSxjQUN0QyxPQUFPLE1BRVAsTUFBUSxPQUFPLFVBQVUsYUFDekIsU0FBUyxNQUFNLGFBQWMsTUFBSzs7OztBQ2xCbEMsR0FBQSxRQUFBLFdBZUksUUFBQSxHQUFhLEVBQStCLEVBQXNCLEdBYmxFLEtBQUEsU0FBbUIsRUFDbkIsS0FBQSxTQUFtQixFQUNuQixLQUFBLGdCQUlBLEtBQUEsZ0JBQWtCLEdBQ2xCLEtBQUEsZUFDQSxLQUFBLFlBQXNCLElBQ3RCLEtBQUEsYUFBdUIsSUFLbkIsS0FBSyxJQUFNLEVBQ1gsS0FBSyxZQUFjLEVBQ25CLEtBQUssYUFBZSxFQUVoQixLQUFLLFlBQWMsS0FBSyxrQkFDeEIsS0FBSyxnQkFBa0IsS0FBSyxZQUFjLEdBRzlDLEtBQUssTUFBUSxFQUFJLGFBQWEsRUFBRyxFQUFHLEtBQUssWUFBYSxLQUFLLGNBQzNELEtBQUssVUFBWSxLQUFLLE1BQVksSUFFbEMsS0FBSyxHQUFJLEdBQUksRUFBRyxFQUFJLEtBQUssZ0JBQWlCLElBQ3RDLEtBQUssYUFBYSxLQUFLLEdBQUksUUFBTyxtQkFHdEMsS0FBSyxHQUFJLEdBQUksRUFBRyxFQUFJLEtBQUssYUFBYyxJQUNuQyxJQUFLLEdBQUksR0FBSSxFQUFHLEVBQUksS0FBSyxZQUFhLElBQ2xDLEtBQUssWUFBWSxNQUNiLEVBQUEsRUFDQSxFQUFBLElBbUVwQixNQTdEWSxHQUFBLFVBQUEsYUFBUixTQUFzQixFQUFRLEVBQUcsR0FBakMsR0FBQSxHQUFBLElBQ0ksR0FBTyxVQUFZLFNBQUMsR0FDaEIsR0FBSSxHQUFPLEVBQVEsSUFhbkIsT0FYb0IsZ0JBQVgsS0FDTCxFQUFPLEtBQUssTUFBTSxJQUd0QixFQUFLLFVBQVcsRUFBSyxHQUFLLEVBQUssWUFBYyxFQUFnQixFQUFWLEVBQUssSUFBVyxFQUFLLEdBQ3hFLEVBQUssVUFBVyxFQUFLLEdBQUssRUFBSyxZQUFjLEdBQWdCLEVBQVYsRUFBSyxHQUFTLElBQU0sRUFBSyxHQUM1RSxFQUFLLFVBQVcsRUFBSyxHQUFLLEVBQUssWUFBYyxHQUFnQixFQUFWLEVBQUssR0FBUyxJQUFNLEVBQUssR0FDNUUsRUFBSyxVQUFXLEVBQUssR0FBSyxFQUFLLFlBQWMsR0FBZ0IsRUFBVixFQUFLLEdBQVMsSUFBTSxJQUV2RSxFQUFLLGFBQWEsS0FBSyxHQUVTLElBQTVCLEVBQUssWUFBWSxRQUFnQixFQUFLLGFBQWEsU0FBVyxFQUFLLGdCQUM1RCxFQUFLLG9CQUdnQixJQUE1QixFQUFLLFlBQVksUUFDakIsRUFBSyxpQkFJYixFQUFPLGFBQWEsS0FBSyxZQUFhLEtBQUssYUFBYyxFQUFHLEtBR3hELEVBQUEsVUFBQSxhQUFSLFNBQXNCLEdBQ2xCLEdBQUksR0FDQSxDQUVBLEtBQ0EsS0FBSyxhQUFlLEVBR3hCLEtBQUssR0FBSSxHQUFJLEVBQUcsRUFBcUIsS0FBSyxhQUFhLE9BQVksRUFBSixFQUF3QixJQUNuRixFQUFlLEtBQUssYUFBYSxRQUNqQyxFQUFTLEtBQUssWUFBWSxRQUUxQixRQUFRLElBQUksRUFBVSxFQUFHLEVBQVUsR0FFbkMsS0FBSyxhQUFhLEVBQWMsRUFBVSxFQUFHLEVBQVUsR0FFbkQsRUFBVSxJQUFNLEtBQUssWUFBYyxJQUNuQyxLQUFLLE1BQVksS0FBSSxLQUFLLFVBQzFCLEtBQUssSUFBSSxhQUFhLEtBQUssTUFBTyxFQUFHLEtBSzFDLEVBQUEsVUFBQSxJQUFQLFdBQUEsR0FBQSxHQUFBLElBQ0ksTUFBSyxVQUFZLEdBQUksTUFFckIsS0FBSyxhQUFhLFdBQ2QsRUFBSyxNQUFZLEtBQUksRUFBSyxVQUMxQixFQUFLLElBQUksYUFBYSxFQUFLLE1BQU8sRUFBRyxHQUVyQyxFQUFLLFFBQVUsR0FBSSxNQUNuQixRQUFRLEtBQVEsRUFBSyxRQUFVLEVBQUssV0FBYSxJQUFJLGNBR2pFLElBdEdhLFNBQUEsT0FBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBUcmFjZXIgfSBmcm9tIFwiLi9UcmFjZXJcIjtcblxuY29uc3Qgc2NyZWVuV2lkdGggPSAyMDAsXG4gICAgc2NyZWVuSGVpZ2h0ID0gMjAwO1xuXG5sZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSxcbiAgICBpbWFnZTogYW55LFxuICAgIHRyYWNlcjogVHJhY2VyO1xuXG5jYW52YXMud2lkdGggPSBzY3JlZW5XaWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBzY3JlZW5IZWlnaHQ7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbnRyYWNlciA9IG5ldyBUcmFjZXIoY3R4LCBzY3JlZW5XaWR0aCwgc2NyZWVuSGVpZ2h0KTtcbnRyYWNlci5ydW4oKTtcblxuaW1hZ2UgPSBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuZG9jdW1lbnQud3JpdGUoYDxpbWcgc3JjPVxcJyR7aW1hZ2V9XFwnIC8+YCk7XG4iLCJleHBvcnQgY2xhc3MgVHJhY2VyIHtcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICBjdXJyZW50WDogbnVtYmVyID0gMDtcbiAgICBjdXJyZW50WTogbnVtYmVyID0gMDtcbiAgICBlbXB0eVdvcmtlcnMgPSBbXTtcbiAgICBkb25lQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XG4gICAgaW1hZ2U6IGFueTtcbiAgICBpbWFnZURhdGE6IG51bWJlcltdO1xuICAgIG51bWJlck9mV29ya2VycyA9IDE2O1xuICAgIHBpeGVsc0FycmF5OiBhbnlbXSA9IFtdO1xuICAgIHNjcmVlbldpZHRoOiBudW1iZXIgPSAyNTA7XG4gICAgc2NyZWVuSGVpZ2h0OiBudW1iZXIgPSAyNTA7XG4gICAgc3RhcnRUaW1lOiBhbnk7XG4gICAgZW5kVGltZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IgKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBzY3JlZW5XaWR0aD86IG51bWJlciwgc2NyZWVuSGVpZ2h0PzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnNjcmVlbldpZHRoID0gc2NyZWVuV2lkdGg7XG4gICAgICAgIHRoaXMuc2NyZWVuSGVpZ2h0ID0gc2NyZWVuSGVpZ2h0O1xuXG4gICAgICAgIGlmICh0aGlzLnNjcmVlbldpZHRoIDwgdGhpcy5udW1iZXJPZldvcmtlcnMpIHtcbiAgICAgICAgICAgIHRoaXMubnVtYmVyT2ZXb3JrZXJzID0gdGhpcy5zY3JlZW5XaWR0aCAtIDI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmltYWdlID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLnNjcmVlbldpZHRoLCB0aGlzLnNjcmVlbkhlaWdodCk7XG4gICAgICAgIHRoaXMuaW1hZ2VEYXRhID0gdGhpcy5pbWFnZVsnZGF0YSddO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZldvcmtlcnM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5lbXB0eVdvcmtlcnMucHVzaChuZXcgV29ya2VyKCdUcmFjZXJXb3JrZXIuanMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuc2NyZWVuSGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5zY3JlZW5XaWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5waXhlbHNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICAgICAgeVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVXb3JrZXIgKHdvcmtlciwgeCwgeSkge1xuICAgICAgICB3b3JrZXIub25tZXNzYWdlID0gKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gbWVzc2FnZS5kYXRhO1xuXG4gICAgICAgICAgICBpZih0eXBlb2YoZGF0YSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaW1hZ2VEYXRhWyhkYXRhWzFdICogdGhpcy5zY3JlZW5XaWR0aCAqIDQpICsgKGRhdGFbMF0gKiA0KV0gPSBkYXRhWzJdO1xuICAgICAgICAgICAgdGhpcy5pbWFnZURhdGFbKGRhdGFbMV0gKiB0aGlzLnNjcmVlbldpZHRoICogNCkgKyAoZGF0YVswXSAqIDQgKyAxKV0gPSBkYXRhWzNdO1xuICAgICAgICAgICAgdGhpcy5pbWFnZURhdGFbKGRhdGFbMV0gKiB0aGlzLnNjcmVlbldpZHRoICogNCkgKyAoZGF0YVswXSAqIDQgKyAyKV0gPSBkYXRhWzRdO1xuICAgICAgICAgICAgdGhpcy5pbWFnZURhdGFbKGRhdGFbMV0gKiB0aGlzLnNjcmVlbldpZHRoICogNCkgKyAoZGF0YVswXSAqIDQgKyAzKV0gPSAyNTU7XG5cbiAgICAgICAgICAgIHRoaXMuZW1wdHlXb3JrZXJzLnB1c2god29ya2VyKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGl4ZWxzQXJyYXkubGVuZ3RoID09PSAwICYmIHRoaXMuZW1wdHlXb3JrZXJzLmxlbmd0aCA9PT0gdGhpcy5udW1iZXJPZldvcmtlcnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb25lQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucGl4ZWxzQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5waXhlbE1hbmFnZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoW3RoaXMuc2NyZWVuV2lkdGgsIHRoaXMuc2NyZWVuSGVpZ2h0LCB4LCB5XSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwaXhlbE1hbmFnZXIgKGNhbGxiYWNrPzogKCkgPT4gdm9pZCkge1xuICAgICAgICBsZXQgYWN0aXZlV29ya2VyLFxuICAgICAgICAgICAgcGl4ZWxzOiBhbnlbXTtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuZG9uZUNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB3ID0gMCwgZW1wdHlXb3JrZXJzTGVuZ3RoID0gdGhpcy5lbXB0eVdvcmtlcnMubGVuZ3RoOyB3IDwgZW1wdHlXb3JrZXJzTGVuZ3RoOyB3KyspIHtcbiAgICAgICAgICAgIGFjdGl2ZVdvcmtlciA9IHRoaXMuZW1wdHlXb3JrZXJzLnNoaWZ0KCk7XG4gICAgICAgICAgICBwaXhlbHMgPSB0aGlzLnBpeGVsc0FycmF5LnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBpeGVsc1sneSddLCBwaXhlbHNbJ3gnXSk7XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlV29ya2VyKGFjdGl2ZVdvcmtlciwgcGl4ZWxzWyd4J10sIHBpeGVsc1sneSddKTtcblxuICAgICAgICAgICAgaWYgKHBpeGVsc1sneCddID09PSB0aGlzLnNjcmVlbldpZHRoIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VbJ2RhdGEnXSA9IHRoaXMuaW1hZ2VEYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlLCAwLCAwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJ1biAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgICAgICB0aGlzLnBpeGVsTWFuYWdlcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmltYWdlWydkYXRhJ10gPSB0aGlzLmltYWdlRGF0YTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnB1dEltYWdlRGF0YSh0aGlzLmltYWdlLCAwLCAwKTtcblxuICAgICAgICAgICAgdGhpcy5lbmRUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAkeyh0aGlzLmVuZFRpbWUgLSB0aGlzLnN0YXJ0VGltZSkgLyAxMDAwfSDRgdC10LrRg9C90LRgKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19
