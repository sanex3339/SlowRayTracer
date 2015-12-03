"use strict";var Vector=function(){function t(t,n,r){this.x=t,this.y=n,this.z=r}return t.prototype.getCoordinates=function(){return{x:this.x,y:this.y,z:this.z}},t.prototype.asArray=function(){return[this.x,this.y,this.z]},t.prototype.getLength=function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2))},t.scale=function(n,r){return new t(n.x*r,n.y*r,n.z*r)},t.add=function(n,r){return new t(n.x+r.x,n.y+r.y,n.z+r.z)},t.substract=function(n,r){return new t(n.x-r.x,n.y-r.y,n.z-r.z)},t.dot=function(t,n){return t.x*n.x+t.y*n.y+t.z*n.z},t.cross=function(n,r){return new t(n.y*r.z-n.z*r.y,n.z*r.x-n.x*r.z,n.x*r.y-n.y*r.x)},t.normalize=function(n){return t.scale(n,1/n.getLength())},t.pow=function(n,r){return new t(Math.pow(n.y,r),Math.pow(n.z,r),Math.pow(n.x,r))},t.inverse=function(n){return t.scale(n,-1)},t.reflect=function(n,r){var e=2*t.dot(n,r);return t.substract(n,t.scale(r,e))},t}();exports.Vector=Vector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZlY3Rvci5qcyIsIlZlY3Rvci50cyJdLCJuYW1lcyI6WyJWZWN0b3IiLCJWZWN0b3IuY29uc3RydWN0b3IiLCJWZWN0b3IuZ2V0Q29vcmRpbmF0ZXMiLCJWZWN0b3IuYXNBcnJheSIsIlZlY3Rvci5nZXRMZW5ndGgiLCJWZWN0b3Iuc2NhbGUiLCJWZWN0b3IuYWRkIiwiVmVjdG9yLnN1YnN0cmFjdCIsIlZlY3Rvci5kb3QiLCJWZWN0b3IuY3Jvc3MiLCJWZWN0b3Iubm9ybWFsaXplIiwiVmVjdG9yLnBvdyIsIlZlY3Rvci5pbnZlcnNlIiwiVmVjdG9yLnJlZmxlY3QiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxZQ0FBLElBQUFBLFFBQUEsV0FLSUEsUUFBQUEsR0FBYUEsRUFBV0EsRUFBV0EsR0FDL0JDLEtBQUtBLEVBQUlBLEVBQ1RBLEtBQUtBLEVBQUlBLEVBQ1RBLEtBQUtBLEVBQUlBLEVBdUVqQkQsTUFwRUlBLEdBQUFBLFVBQUFBLGVBQUFBLFdBQ0lFLE9BQ0lBLEVBQUdBLEtBQUtBLEVBQ1JBLEVBQUdBLEtBQUtBLEVBQ1JBLEVBQUdBLEtBQUtBLElBSVRGLEVBQUFBLFVBQUFBLFFBQVBBLFdBQ0lHLE9BQ0lBLEtBQUtBLEVBQ0xBLEtBQUtBLEVBQ0xBLEtBQUtBLElBSU5ILEVBQUFBLFVBQUFBLFVBQVBBLFdBQ0lJLE1BQU9BLE1BQUtBLEtBQUtBLEtBQUFBLElBQUFBLEtBQUtBLEVBQUtBLEdBQUlBLEtBQUFBLElBQUFBLEtBQUtBLEVBQUtBLEdBQUlBLEtBQUFBLElBQUFBLEtBQUtBLEVBQUtBLEtBRzdDSixFQUFBQSxNQUFkQSxTQUFxQkEsRUFBZ0JBLEdBQ2pDSyxNQUFPQSxJQUFJQSxHQUFPQSxFQUFPQSxFQUFJQSxFQUFZQSxFQUFPQSxFQUFJQSxFQUFZQSxFQUFPQSxFQUFJQSxJQUdqRUwsRUFBQUEsSUFBZEEsU0FBbUJBLEVBQWlCQSxHQUNoQ00sTUFBT0EsSUFBSUEsR0FBT0EsRUFBUUEsRUFBSUEsRUFBUUEsRUFBR0EsRUFBUUEsRUFBSUEsRUFBUUEsRUFBR0EsRUFBUUEsRUFBSUEsRUFBUUEsSUFHMUVOLEVBQUFBLFVBQWRBLFNBQXlCQSxFQUFpQkEsR0FDdENPLE1BQU9BLElBQUlBLEdBQU9BLEVBQVFBLEVBQUlBLEVBQVFBLEVBQUdBLEVBQVFBLEVBQUlBLEVBQVFBLEVBQUdBLEVBQVFBLEVBQUlBLEVBQVFBLElBRzFFUCxFQUFBQSxJQUFkQSxTQUFtQkEsRUFBaUJBLEdBQ2hDUSxNQUFPQSxHQUFRQSxFQUFJQSxFQUFRQSxFQUFJQSxFQUFRQSxFQUFJQSxFQUFRQSxFQUFJQSxFQUFRQSxFQUFJQSxFQUFRQSxHQUdqRVIsRUFBQUEsTUFBZEEsU0FBcUJBLEVBQWlCQSxHQUNsQ1MsTUFBT0EsSUFBSUEsR0FDUEEsRUFBUUEsRUFBSUEsRUFBUUEsRUFBSUEsRUFBUUEsRUFBSUEsRUFBUUEsRUFDNUNBLEVBQVFBLEVBQUlBLEVBQVFBLEVBQUlBLEVBQVFBLEVBQUlBLEVBQVFBLEVBQzVDQSxFQUFRQSxFQUFJQSxFQUFRQSxFQUFJQSxFQUFRQSxFQUFJQSxFQUFRQSxJQUl0Q1QsRUFBQUEsVUFBZEEsU0FBeUJBLEdBQ3JCVSxNQUFPQSxHQUFPQSxNQUFNQSxFQUFRQSxFQUFJQSxFQUFPQSxjQUc3QlYsRUFBQUEsSUFBZEEsU0FBbUJBLEVBQWdCQSxHQUMvQlcsTUFBT0EsSUFBSUEsR0FDUEEsS0FBQUEsSUFBQUEsRUFBT0EsRUFBS0EsR0FDWkEsS0FBQUEsSUFBQUEsRUFBT0EsRUFBS0EsR0FDWkEsS0FBQUEsSUFBQUEsRUFBT0EsRUFBS0EsS0FJTlgsRUFBQUEsUUFBZEEsU0FBdUJBLEdBQ25CWSxNQUFPQSxHQUFPQSxNQUFNQSxFQUFRQSxLQUdsQlosRUFBQUEsUUFBZEEsU0FBdUJBLEVBQWdCQSxHQUNuQ2EsR0FBSUEsR0FBSUEsRUFBSUEsRUFBT0EsSUFBSUEsRUFBUUEsRUFFL0JBLE9BQU9BLEdBQU9BLFVBQ1ZBLEVBQ0FBLEVBQU9BLE1BQU1BLEVBQVFBLEtBR2pDYixJQS9FYWMsU0FBQWQsT0FBTUEiLCJmaWxlIjoiVmVjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVmVjdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBWZWN0b3IoeCwgeSwgeikge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnogPSB6O1xuICAgIH1cbiAgICBWZWN0b3IucHJvdG90eXBlLmdldENvb3JkaW5hdGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgejogdGhpcy56XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBWZWN0b3IucHJvdG90eXBlLmFzQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLngsXG4gICAgICAgICAgICB0aGlzLnksXG4gICAgICAgICAgICB0aGlzLnpcbiAgICAgICAgXTtcbiAgICB9O1xuICAgIFZlY3Rvci5wcm90b3R5cGUuZ2V0TGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMueCwgMikgKyBNYXRoLnBvdyh0aGlzLnksIDIpICsgTWF0aC5wb3codGhpcy56LCAyKSk7XG4gICAgfTtcbiAgICBWZWN0b3Iuc2NhbGUgPSBmdW5jdGlvbiAodmVjdG9yLCBtdWx0aXBsaWVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHZlY3Rvci54ICogbXVsdGlwbGllciwgdmVjdG9yLnkgKiBtdWx0aXBsaWVyLCB2ZWN0b3IueiAqIG11bHRpcGxpZXIpO1xuICAgIH07XG4gICAgVmVjdG9yLmFkZCA9IGZ1bmN0aW9uICh2ZWN0b3IxLCB2ZWN0b3IyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHZlY3RvcjEueCArIHZlY3RvcjIueCwgdmVjdG9yMS55ICsgdmVjdG9yMi55LCB2ZWN0b3IxLnogKyB2ZWN0b3IyLnopO1xuICAgIH07XG4gICAgVmVjdG9yLnN1YnN0cmFjdCA9IGZ1bmN0aW9uICh2ZWN0b3IxLCB2ZWN0b3IyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHZlY3RvcjEueCAtIHZlY3RvcjIueCwgdmVjdG9yMS55IC0gdmVjdG9yMi55LCB2ZWN0b3IxLnogLSB2ZWN0b3IyLnopO1xuICAgIH07XG4gICAgVmVjdG9yLmRvdCA9IGZ1bmN0aW9uICh2ZWN0b3IxLCB2ZWN0b3IyKSB7XG4gICAgICAgIHJldHVybiB2ZWN0b3IxLnggKiB2ZWN0b3IyLnggKyB2ZWN0b3IxLnkgKiB2ZWN0b3IyLnkgKyB2ZWN0b3IxLnogKiB2ZWN0b3IyLno7XG4gICAgfTtcbiAgICBWZWN0b3IuY3Jvc3MgPSBmdW5jdGlvbiAodmVjdG9yMSwgdmVjdG9yMikge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih2ZWN0b3IxLnkgKiB2ZWN0b3IyLnogLSB2ZWN0b3IxLnogKiB2ZWN0b3IyLnksIHZlY3RvcjEueiAqIHZlY3RvcjIueCAtIHZlY3RvcjEueCAqIHZlY3RvcjIueiwgdmVjdG9yMS54ICogdmVjdG9yMi55IC0gdmVjdG9yMS55ICogdmVjdG9yMi54KTtcbiAgICB9O1xuICAgIFZlY3Rvci5ub3JtYWxpemUgPSBmdW5jdGlvbiAodmVjdG9yKSB7XG4gICAgICAgIHJldHVybiBWZWN0b3Iuc2NhbGUodmVjdG9yLCAxIC8gdmVjdG9yLmdldExlbmd0aCgpKTtcbiAgICB9O1xuICAgIFZlY3Rvci5wb3cgPSBmdW5jdGlvbiAodmVjdG9yLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihNYXRoLnBvdyh2ZWN0b3IueSwgdmFsdWUpLCBNYXRoLnBvdyh2ZWN0b3IueiwgdmFsdWUpLCBNYXRoLnBvdyh2ZWN0b3IueCwgdmFsdWUpKTtcbiAgICB9O1xuICAgIFZlY3Rvci5pbnZlcnNlID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuICAgICAgICByZXR1cm4gVmVjdG9yLnNjYWxlKHZlY3RvciwgLTEpO1xuICAgIH07XG4gICAgVmVjdG9yLnJlZmxlY3QgPSBmdW5jdGlvbiAodmVjdG9yLCBub3JtYWwpIHtcbiAgICAgICAgdmFyIGYgPSAyICogVmVjdG9yLmRvdCh2ZWN0b3IsIG5vcm1hbCk7XG4gICAgICAgIHJldHVybiBWZWN0b3Iuc3Vic3RyYWN0KHZlY3RvciwgVmVjdG9yLnNjYWxlKG5vcm1hbCwgZikpO1xuICAgIH07XG4gICAgcmV0dXJuIFZlY3Rvcjtcbn0pKCk7XG5leHBvcnRzLlZlY3RvciA9IFZlY3RvcjtcbiIsImV4cG9ydCBjbGFzcyBWZWN0b3Ige1xuICAgIHByaXZhdGUgeDogbnVtYmVyO1xuICAgIHByaXZhdGUgeTogbnVtYmVyO1xuICAgIHByaXZhdGUgejogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy56ID0gejtcbiAgICB9XG5cbiAgICBnZXRDb29yZGluYXRlcyAoKToge3g6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXJ9IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMueCxcbiAgICAgICAgICAgIHk6IHRoaXMueSxcbiAgICAgICAgICAgIHo6IHRoaXMuelxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBhc0FycmF5ICgpOiBudW1iZXJbXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLngsXG4gICAgICAgICAgICB0aGlzLnksXG4gICAgICAgICAgICB0aGlzLnpcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGVuZ3RoICgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqKiAyICsgdGhpcy55ICoqIDIgKyB0aGlzLnogKiogMik7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzY2FsZSAodmVjdG9yOiBWZWN0b3IsIG11bHRpcGxpZXI6IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHZlY3Rvci54ICogbXVsdGlwbGllciwgdmVjdG9yLnkgKiBtdWx0aXBsaWVyLCB2ZWN0b3IueiAqIG11bHRpcGxpZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYWRkICh2ZWN0b3IxOiBWZWN0b3IsIHZlY3RvcjI6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHZlY3RvcjEueCArIHZlY3RvcjIueCwgdmVjdG9yMS55ICsgdmVjdG9yMi55LCB2ZWN0b3IxLnogKyB2ZWN0b3IyLnopO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc3Vic3RyYWN0ICh2ZWN0b3IxOiBWZWN0b3IsIHZlY3RvcjI6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHZlY3RvcjEueCAtIHZlY3RvcjIueCwgdmVjdG9yMS55IC0gdmVjdG9yMi55LCB2ZWN0b3IxLnogLSB2ZWN0b3IyLnopO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZG90ICh2ZWN0b3IxOiBWZWN0b3IsIHZlY3RvcjI6IFZlY3Rvcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB2ZWN0b3IxLnggKiB2ZWN0b3IyLnggKyB2ZWN0b3IxLnkgKiB2ZWN0b3IyLnkgKyB2ZWN0b3IxLnogKiB2ZWN0b3IyLno7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjcm9zcyAodmVjdG9yMTogVmVjdG9yLCB2ZWN0b3IyOiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgICAgIHZlY3RvcjEueSAqIHZlY3RvcjIueiAtIHZlY3RvcjEueiAqIHZlY3RvcjIueSxcbiAgICAgICAgICAgIHZlY3RvcjEueiAqIHZlY3RvcjIueCAtIHZlY3RvcjEueCAqIHZlY3RvcjIueixcbiAgICAgICAgICAgIHZlY3RvcjEueCAqIHZlY3RvcjIueSAtIHZlY3RvcjEueSAqIHZlY3RvcjIueFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbm9ybWFsaXplICh2ZWN0b3I6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBWZWN0b3Iuc2NhbGUodmVjdG9yLCAxIC8gdmVjdG9yLmdldExlbmd0aCgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHBvdyAodmVjdG9yOiBWZWN0b3IsIHZhbHVlOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihcbiAgICAgICAgICAgIHZlY3Rvci55ICoqIHZhbHVlLFxuICAgICAgICAgICAgdmVjdG9yLnogKiogdmFsdWUsXG4gICAgICAgICAgICB2ZWN0b3IueCAqKiB2YWx1ZVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaW52ZXJzZSAodmVjdG9yOiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gVmVjdG9yLnNjYWxlKHZlY3RvciwgLTEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVmbGVjdCAodmVjdG9yOiBWZWN0b3IsIG5vcm1hbDogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgbGV0IGYgPSAyICogVmVjdG9yLmRvdCh2ZWN0b3IsIG5vcm1hbCk7XG5cbiAgICAgICAgcmV0dXJuIFZlY3Rvci5zdWJzdHJhY3QoXG4gICAgICAgICAgICB2ZWN0b3IsXG4gICAgICAgICAgICBWZWN0b3Iuc2NhbGUobm9ybWFsLCBmKVxuICAgICAgICApO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
