var __extends=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},RTMath_1=require("../RTMath"),AbstractObject_1=require("./AbstractObject"),Color_1=require("../Color/Color"),Material_1=require("../Material"),Vector_1=require("../Vector"),Sphere=function(t){function e(e,r){t.call(this),this.material=new Material_1.Material(Color_1.Color.red,0),this.center=e,this.radius=r}return __extends(e,t),e.prototype.getIntersectData=function(t){var e,r,o,a,i,c,n,s=Vector_1.Vector.substract(t.getOrigin(),this.center),h=Vector_1.Vector.dot(s,t.getDirection()),u=Vector_1.Vector.dot(s,s)-Math.pow(this.radius,2),_=Math.pow(h,2)-u;if(!(h>0||0>_||_>=0&&(e=-h+Math.sqrt(_),r=-h-Math.sqrt(_),o=Math.min(e,r),a=Math.max(e,r),i=o>RTMath_1.RTMath.EPSILON?o:a,i<RTMath_1.RTMath.EPSILON)))return c=Vector_1.Vector.add(Vector_1.Vector.scale(t.getDirection(),i),t.getOrigin()),n=Vector_1.Vector.substract(c,t.getOrigin()).getLength(),{hitPoint:c,normal:this.getNormal(c),distance:n}},e.prototype.getMaterial=function(){return this.material},e.prototype.getNormal=function(t){return Vector_1.Vector.normalize(Vector_1.Vector.scale(Vector_1.Vector.substract(t,this.center),1/this.radius))},e.prototype.setMaterial=function(t){return this.material=t,this},e}(AbstractObject_1.AbstractObject);exports.Sphere=Sphere;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9iamVjdHMvU3BoZXJlLmpzIiwiT2JqZWN0cy9TcGhlcmUudHMiXSwibmFtZXMiOlsiX19leHRlbmRzIiwidGhpcyIsImQiLCJiIiwiX18iLCJjb25zdHJ1Y3RvciIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsInByb3RvdHlwZSIsIk9iamVjdCIsImNyZWF0ZSIsIlJUTWF0aF8xIiwicmVxdWlyZSIsIkFic3RyYWN0T2JqZWN0XzEiLCJDb2xvcl8xIiwiTWF0ZXJpYWxfMSIsIlZlY3Rvcl8xIiwiU3BoZXJlIiwiX3N1cGVyIiwiU3BoZXJlLmNvbnN0cnVjdG9yIiwiU3BoZXJlLmdldEludGVyc2VjdERhdGEiLCJTcGhlcmUuZ2V0TWF0ZXJpYWwiLCJTcGhlcmUuZ2V0Tm9ybWFsIiwiU3BoZXJlLnNldE1hdGVyaWFsIiwiQWJzdHJhY3RPYmplY3QiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxHQUFJQSxXQUFhQyxNQUFRQSxLQUFLRCxXQUFjLFNBQVVFLEVBQUdDLEdBRXJELFFBQVNDLEtBQU9ILEtBQUtJLFlBQWNILEVBRG5DLElBQUssR0FBSUksS0FBS0gsR0FBT0EsRUFBRUksZUFBZUQsS0FBSUosRUFBRUksR0FBS0gsRUFBRUcsR0FFbkRKLEdBQUVNLFVBQWtCLE9BQU5MLEVBQWFNLE9BQU9DLE9BQU9QLElBQU1DLEVBQUdJLFVBQVlMLEVBQUVLLFVBQVcsR0FBSUosS0NIbkZPLFNBQUFDLFFBQXVCLGFBQ3ZCQyxpQkFBQUQsUUFBK0Isb0JBQy9CRSxRQUFBRixRQUFzQixrQkFDdEJHLFdBQUFILFFBQXlCLGVBR3pCSSxTQUFBSixRQUF1QixhQUV2QkssT0FBQSxTQUFBQyxHQUtJRCxRQUFBQSxHQUFhQSxFQUFnQkEsR0FDekJFLEVBQUFBLEtBQUFBLE1BSElBLEtBQUFBLFNBQXFCQSxHQUFJQSxZQUFBQSxTQUFTQSxRQUFBQSxNQUFNQSxJQUFLQSxHQUtqREEsS0FBS0EsT0FBU0EsRUFDZEEsS0FBS0EsT0FBU0EsRUF1RXRCRixNQWhGNEJBLFdBQUFBLEVBQUFBLEdBWWpCQSxFQUFBQSxVQUFBQSxpQkFBUEEsU0FBeUJBLEdBQ3JCRyxHQUlJQSxHQUNBQSxFQUNBQSxFQUNBQSxFQUNBQSxFQUNBQSxFQUNBQSxFQVZBQSxFQUFJQSxTQUFBQSxPQUFPQSxVQUFVQSxFQUFJQSxZQUFhQSxLQUFLQSxRQUMzQ0EsRUFBWUEsU0FBQUEsT0FBT0EsSUFBSUEsRUFBR0EsRUFBSUEsZ0JBQzlCQSxFQUFZQSxTQUFBQSxPQUFPQSxJQUFJQSxFQUFHQSxHQUFLQSxLQUFBQSxJQUFBQSxLQUFLQSxPQUFVQSxHQUM5Q0EsRUFBWUEsS0FBQUEsSUFBQUEsRUFBS0EsR0FBSUEsQ0FTekJBLE1BQUlBLEVBQUlBLEdBQVNBLEVBQUpBLEdBSVRBLEdBQUtBLElBQ0xBLEdBQU1BLEVBQUlBLEtBQUtBLEtBQUtBLEdBQ3BCQSxHQUFNQSxFQUFJQSxLQUFLQSxLQUFLQSxHQUNwQkEsRUFBT0EsS0FBS0EsSUFBSUEsRUFBSUEsR0FDcEJBLEVBQU9BLEtBQUtBLElBQUlBLEVBQUlBLEdBR2hCQSxFQURBQSxFQUFPQSxTQUFBQSxPQUFPQSxRQUNNQSxFQUVBQSxFQUdwQkEsRUFBb0JBLFNBQUFBLE9BQU9BLFVBY25DQSxNQVRBQSxHQUFXQSxTQUFBQSxPQUFPQSxJQUNkQSxTQUFBQSxPQUFPQSxNQUFNQSxFQUFJQSxlQUFnQkEsR0FDakNBLEVBQUlBLGFBRVJBLEVBQVdBLFNBQUFBLE9BQU9BLFVBQ2RBLEVBQ0FBLEVBQUlBLGFBQ05BLGFBR0VBLFNBQVVBLEVBQ1ZBLE9BQVFBLEtBQUtBLFVBQVVBLEdBQ3ZCQSxTQUFVQSxJQUlYSCxFQUFBQSxVQUFBQSxZQUFQQSxXQUNJSSxNQUFPQSxNQUFLQSxVQUdUSixFQUFBQSxVQUFBQSxVQUFQQSxTQUFrQkEsR0FDZEssTUFBT0EsVUFBQUEsT0FBT0EsVUFDVkEsU0FBQUEsT0FBT0EsTUFDSEEsU0FBQUEsT0FBT0EsVUFBVUEsRUFBT0EsS0FBS0EsUUFDN0JBLEVBQUlBLEtBQUtBLFVBS2RMLEVBQUFBLFVBQUFBLFlBQVBBLFNBQW9CQSxHQUdoQk0sTUFGQUEsTUFBS0EsU0FBV0EsRUFFVEEsTUFFZk4sR0FoRjRCSixpQkFBQVcsZUFBZkMsU0FBQVIsT0FBTUEiLCJmaWxlIjoiT2JqZWN0cy9TcGhlcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBSVE1hdGhfMSA9IHJlcXVpcmUoXCIuLi9SVE1hdGhcIik7XG52YXIgQWJzdHJhY3RPYmplY3RfMSA9IHJlcXVpcmUoXCIuL0Fic3RyYWN0T2JqZWN0XCIpO1xudmFyIENvbG9yXzEgPSByZXF1aXJlKFwiLi4vQ29sb3IvQ29sb3JcIik7XG52YXIgTWF0ZXJpYWxfMSA9IHJlcXVpcmUoXCIuLi9NYXRlcmlhbFwiKTtcbnZhciBWZWN0b3JfMSA9IHJlcXVpcmUoXCIuLi9WZWN0b3JcIik7XG52YXIgU3BoZXJlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3BoZXJlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNwaGVyZShjZW50ZXIsIHJhZGl1cykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBNYXRlcmlhbF8xLk1hdGVyaWFsKENvbG9yXzEuQ29sb3IucmVkLCAwKTtcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBjZW50ZXI7XG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgIH1cbiAgICBTcGhlcmUucHJvdG90eXBlLmdldEludGVyc2VjdERhdGEgPSBmdW5jdGlvbiAocmF5KSB7XG4gICAgICAgIHZhciBrID0gVmVjdG9yXzEuVmVjdG9yLnN1YnN0cmFjdChyYXkuZ2V0T3JpZ2luKCksIHRoaXMuY2VudGVyKSwgYiA9IFZlY3Rvcl8xLlZlY3Rvci5kb3QoaywgcmF5LmdldERpcmVjdGlvbigpKSwgYyA9IFZlY3Rvcl8xLlZlY3Rvci5kb3QoaywgaykgLSBNYXRoLnBvdyh0aGlzLnJhZGl1cywgMiksIGQgPSBNYXRoLnBvdyhiLCAyKSAtIGMsIHQxLCB0MiwgbWluVCwgbWF4VCwgaW50ZXJzZWN0aW9uUG9pbnQsIGhpdFBvaW50LCBkaXN0YW5jZTtcbiAgICAgICAgaWYgKGIgPiAwIHx8IGQgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGQgPj0gMCkge1xuICAgICAgICAgICAgdDEgPSAtYiArIE1hdGguc3FydChkKTtcbiAgICAgICAgICAgIHQyID0gLWIgLSBNYXRoLnNxcnQoZCk7XG4gICAgICAgICAgICBtaW5UID0gTWF0aC5taW4odDEsIHQyKTtcbiAgICAgICAgICAgIG1heFQgPSBNYXRoLm1heCh0MSwgdDIpO1xuICAgICAgICAgICAgaWYgKG1pblQgPiBSVE1hdGhfMS5SVE1hdGguRVBTSUxPTikge1xuICAgICAgICAgICAgICAgIGludGVyc2VjdGlvblBvaW50ID0gbWluVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGludGVyc2VjdGlvblBvaW50ID0gbWF4VDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnRlcnNlY3Rpb25Qb2ludCA8IFJUTWF0aF8xLlJUTWF0aC5FUFNJTE9OKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGhpdFBvaW50ID0gVmVjdG9yXzEuVmVjdG9yLmFkZChWZWN0b3JfMS5WZWN0b3Iuc2NhbGUocmF5LmdldERpcmVjdGlvbigpLCBpbnRlcnNlY3Rpb25Qb2ludCksIHJheS5nZXRPcmlnaW4oKSk7XG4gICAgICAgIGRpc3RhbmNlID0gVmVjdG9yXzEuVmVjdG9yLnN1YnN0cmFjdChoaXRQb2ludCwgcmF5LmdldE9yaWdpbigpKS5nZXRMZW5ndGgoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhpdFBvaW50OiBoaXRQb2ludCxcbiAgICAgICAgICAgIG5vcm1hbDogdGhpcy5nZXROb3JtYWwoaGl0UG9pbnQpLFxuICAgICAgICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBTcGhlcmUucHJvdG90eXBlLmdldE1hdGVyaWFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRlcmlhbDtcbiAgICB9O1xuICAgIFNwaGVyZS5wcm90b3R5cGUuZ2V0Tm9ybWFsID0gZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgIHJldHVybiBWZWN0b3JfMS5WZWN0b3Iubm9ybWFsaXplKFZlY3Rvcl8xLlZlY3Rvci5zY2FsZShWZWN0b3JfMS5WZWN0b3Iuc3Vic3RyYWN0KHBvaW50LCB0aGlzLmNlbnRlciksIDEgLyB0aGlzLnJhZGl1cykpO1xuICAgIH07XG4gICAgU3BoZXJlLnByb3RvdHlwZS5zZXRNYXRlcmlhbCA9IGZ1bmN0aW9uIChtYXRlcmlhbCkge1xuICAgICAgICB0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIFNwaGVyZTtcbn0pKEFic3RyYWN0T2JqZWN0XzEuQWJzdHJhY3RPYmplY3QpO1xuZXhwb3J0cy5TcGhlcmUgPSBTcGhlcmU7XG4iLCJpbXBvcnQgeyBSVE1hdGggfSBmcm9tIFwiLi4vUlRNYXRoXCI7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdCB9IGZyb20gXCIuL0Fic3RyYWN0T2JqZWN0XCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCIuLi9Db2xvci9Db2xvclwiO1xuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi4vTWF0ZXJpYWxcIjtcbmltcG9ydCB7IFJheSB9IGZyb20gXCIuLi9SYXlcIjtcbmltcG9ydCB7IFJHQkNvbG9yIH0gZnJvbSBcIi4uL0NvbG9yL1JHQkNvbG9yXCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi4vVmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBTcGhlcmUgZXh0ZW5kcyBBYnN0cmFjdE9iamVjdCB7XG4gICAgcHJpdmF0ZSBjZW50ZXI6IFZlY3RvcjtcbiAgICBwcml2YXRlIHJhZGl1czogbnVtYmVyO1xuICAgIHByaXZhdGUgbWF0ZXJpYWw6IE1hdGVyaWFsID0gbmV3IE1hdGVyaWFsKENvbG9yLnJlZCwgMCk7XG5cbiAgICBjb25zdHJ1Y3RvciAoY2VudGVyOiBWZWN0b3IsIHJhZGl1czogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyICgpO1xuXG4gICAgICAgIHRoaXMuY2VudGVyID0gY2VudGVyO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SW50ZXJzZWN0RGF0YSAocmF5OiBSYXkpOiBhbnkge1xuICAgICAgICBsZXQgayA9IFZlY3Rvci5zdWJzdHJhY3QocmF5LmdldE9yaWdpbigpLCB0aGlzLmNlbnRlciksXG4gICAgICAgICAgICBiOiBudW1iZXIgPSBWZWN0b3IuZG90KGssIHJheS5nZXREaXJlY3Rpb24oKSksXG4gICAgICAgICAgICBjOiBudW1iZXIgPSBWZWN0b3IuZG90KGssIGspIC0gdGhpcy5yYWRpdXMgKiogMixcbiAgICAgICAgICAgIGQ6IG51bWJlciA9IGIgKiogMiAtIGMsXG4gICAgICAgICAgICB0MTogbnVtYmVyLFxuICAgICAgICAgICAgdDI6IG51bWJlcixcbiAgICAgICAgICAgIG1pblQ6IG51bWJlcixcbiAgICAgICAgICAgIG1heFQ6IG51bWJlcixcbiAgICAgICAgICAgIGludGVyc2VjdGlvblBvaW50OiBudW1iZXIsXG4gICAgICAgICAgICBoaXRQb2ludDogVmVjdG9yLFxuICAgICAgICAgICAgZGlzdGFuY2U6IG51bWJlcjtcblxuICAgICAgICBpZiAoYiA+IDAgfHwgZCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkID49IDApIHtcbiAgICAgICAgICAgIHQxID0gLWIgKyBNYXRoLnNxcnQoZCk7XG4gICAgICAgICAgICB0MiA9IC1iIC0gTWF0aC5zcXJ0KGQpO1xuICAgICAgICAgICAgbWluVCA9IE1hdGgubWluKHQxLCB0Mik7XG4gICAgICAgICAgICBtYXhUID0gTWF0aC5tYXgodDEsIHQyKTtcblxuICAgICAgICAgICAgaWYgKG1pblQgPiBSVE1hdGguRVBTSUxPTikge1xuICAgICAgICAgICAgICAgIGludGVyc2VjdGlvblBvaW50ID0gbWluVDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9uUG9pbnQgPSBtYXhUO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW50ZXJzZWN0aW9uUG9pbnQgPCBSVE1hdGguRVBTSUxPTikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGhpdFBvaW50ID0gVmVjdG9yLmFkZChcbiAgICAgICAgICAgIFZlY3Rvci5zY2FsZShyYXkuZ2V0RGlyZWN0aW9uKCksIGludGVyc2VjdGlvblBvaW50KSxcbiAgICAgICAgICAgIHJheS5nZXRPcmlnaW4oKVxuICAgICAgICApO1xuICAgICAgICBkaXN0YW5jZSA9IFZlY3Rvci5zdWJzdHJhY3QoXG4gICAgICAgICAgICBoaXRQb2ludCxcbiAgICAgICAgICAgIHJheS5nZXRPcmlnaW4oKVxuICAgICAgICApLmdldExlbmd0aCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoaXRQb2ludDogaGl0UG9pbnQsXG4gICAgICAgICAgICBub3JtYWw6IHRoaXMuZ2V0Tm9ybWFsKGhpdFBvaW50KSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiBkaXN0YW5jZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNYXRlcmlhbCAoKTogTWF0ZXJpYWwge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRlcmlhbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Tm9ybWFsIChwb2ludDogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIFZlY3Rvci5ub3JtYWxpemUoXG4gICAgICAgICAgICBWZWN0b3Iuc2NhbGUoXG4gICAgICAgICAgICAgICAgVmVjdG9yLnN1YnN0cmFjdChwb2ludCwgdGhpcy5jZW50ZXIpLFxuICAgICAgICAgICAgICAgIDEgLyB0aGlzLnJhZGl1c1xuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNYXRlcmlhbCAobWF0ZXJpYWw6IE1hdGVyaWFsKTogdGhpcyB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
