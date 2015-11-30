var __extends=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},AbstractObject_1=require("./AbstractObject"),Color_1=require("../Color/Color"),Material_1=require("../Material"),RTMath_1=require("../RTMath"),Vector_1=require("../Vector"),Plane=function(t){function e(e,r){t.call(this),this.point=new Vector_1.Vector(0,0,0),this.material=new Material_1.Material(Color_1.Color.gray),this.normal=e,r&&(this.point=r)}return __extends(e,t),e.prototype.getIntersectData=function(t){var e,r,o=Vector_1.Vector.dot(Vector_1.Vector.substract(this.point,t.getOrigin()),this.normal)/Vector_1.Vector.dot(t.getDirection(),this.getNormal());if(!(o<=RTMath_1.RTMath.EPSILON))return r=Vector_1.Vector.add(t.getOrigin(),Vector_1.Vector.scale(t.getDirection(),o)),e=Vector_1.Vector.substract(r,t.getOrigin()).getLength(),{hitPoint:r,normal:this.getNormal(),distance:e}},e.prototype.getMaterial=function(){return this.material},e.prototype.getPosition=function(){return this.point},e.prototype.getRandomPoint=function(){return new Vector_1.Vector(0,0,0)},e.prototype.getNormal=function(){return this.normal},e.prototype.setMaterial=function(t){return this.material=t,this},e}(AbstractObject_1.AbstractObject);exports.Plane=Plane;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9iamVjdHMvUGxhbmUuanMiLCJPYmplY3RzL1BsYW5lLnRzIl0sIm5hbWVzIjpbIl9fZXh0ZW5kcyIsInRoaXMiLCJkIiwiYiIsIl9fIiwiY29uc3RydWN0b3IiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJwcm90b3R5cGUiLCJPYmplY3QiLCJjcmVhdGUiLCJBYnN0cmFjdE9iamVjdF8xIiwicmVxdWlyZSIsIkNvbG9yXzEiLCJNYXRlcmlhbF8xIiwiUlRNYXRoXzEiLCJWZWN0b3JfMSIsIlBsYW5lIiwiX3N1cGVyIiwiUGxhbmUuY29uc3RydWN0b3IiLCJQbGFuZS5nZXRJbnRlcnNlY3REYXRhIiwiUGxhbmUuZ2V0TWF0ZXJpYWwiLCJQbGFuZS5nZXRQb3NpdGlvbiIsIlBsYW5lLmdldFJhbmRvbVBvaW50IiwiUGxhbmUuZ2V0Tm9ybWFsIiwiUGxhbmUuc2V0TWF0ZXJpYWwiLCJBYnN0cmFjdE9iamVjdCIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBLEdBQUlBLFdBQWFDLE1BQVFBLEtBQUtELFdBQWMsU0FBVUUsRUFBR0MsR0FFckQsUUFBU0MsS0FBT0gsS0FBS0ksWUFBY0gsRUFEbkMsSUFBSyxHQUFJSSxLQUFLSCxHQUFPQSxFQUFFSSxlQUFlRCxLQUFJSixFQUFFSSxHQUFLSCxFQUFFRyxHQUVuREosR0FBRU0sVUFBa0IsT0FBTkwsRUFBYU0sT0FBT0MsT0FBT1AsSUFBTUMsRUFBR0ksVUFBWUwsRUFBRUssVUFBVyxHQUFJSixLQ0huRk8saUJBQUFDLFFBQStCLG9CQUMvQkMsUUFBQUQsUUFBc0Isa0JBQ3RCRSxXQUFBRixRQUF5QixlQUV6QkcsU0FBQUgsUUFBdUIsYUFFdkJJLFNBQUFKLFFBQXVCLGFBRXZCSyxNQUFBLFNBQUFDLEdBS0lELFFBQUFBLEdBQWFBLEVBQWdCQSxHQUN6QkUsRUFBQUEsS0FBQUEsTUFKSUEsS0FBQUEsTUFBZ0JBLEdBQUlBLFVBQUFBLE9BQU9BLEVBQUdBLEVBQUdBLEdBQ2pDQSxLQUFBQSxTQUFxQkEsR0FBSUEsWUFBQUEsU0FBU0EsUUFBQUEsTUFBTUEsTUFLNUNBLEtBQUtBLE9BQVNBLEVBRVZBLElBQ0FBLEtBQUtBLE1BQVFBLEdBaUV6QkYsTUE1RTJCQSxXQUFBQSxFQUFBQSxHQWVoQkEsRUFBQUEsVUFBQUEsaUJBQVBBLFNBQXlCQSxHQUNyQkcsR0FBSUEsR0FDQUEsRUFDQUEsRUFDQUEsU0FBQUEsT0FBT0EsSUFDSEEsU0FBQUEsT0FBT0EsVUFDSEEsS0FBS0EsTUFDTEEsRUFBSUEsYUFFUkEsS0FBS0EsUUFFVEEsU0FBQUEsT0FBT0EsSUFDSEEsRUFBSUEsZUFDSkEsS0FBS0EsWUFHYkEsTUFBSUEsR0FBS0EsU0FBQUEsT0FBT0EsU0FpQmhCQSxNQWJBQSxHQUFXQSxTQUFBQSxPQUFPQSxJQUNkQSxFQUFJQSxZQUNKQSxTQUFBQSxPQUFPQSxNQUNIQSxFQUFJQSxlQUNKQSxJQUlSQSxFQUFXQSxTQUFBQSxPQUFPQSxVQUNkQSxFQUNBQSxFQUFJQSxhQUNOQSxhQUdFQSxTQUFVQSxFQUNWQSxPQUFRQSxLQUFLQSxZQUNiQSxTQUFVQSxJQUlYSCxFQUFBQSxVQUFBQSxZQUFQQSxXQUNJSSxNQUFPQSxNQUFLQSxVQUdUSixFQUFBQSxVQUFBQSxZQUFQQSxXQUNJSyxNQUFPQSxNQUFLQSxPQUdUTCxFQUFBQSxVQUFBQSxlQUFQQSxXQUNJTSxNQUFPQSxJQUFJQSxVQUFBQSxPQUFPQSxFQUFHQSxFQUFHQSxJQUdyQk4sRUFBQUEsVUFBQUEsVUFBUEEsV0FDSU8sTUFBT0EsTUFBS0EsUUFHVFAsRUFBQUEsVUFBQUEsWUFBUEEsU0FBb0JBLEdBR2hCUSxNQUZBQSxNQUFLQSxTQUFXQSxFQUVUQSxNQUVmUixHQTVFMkJOLGlCQUFBZSxlQUFkQyxTQUFBVixNQUFLQSIsImZpbGUiOiJPYmplY3RzL1BsYW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgQWJzdHJhY3RPYmplY3RfMSA9IHJlcXVpcmUoXCIuL0Fic3RyYWN0T2JqZWN0XCIpO1xudmFyIENvbG9yXzEgPSByZXF1aXJlKFwiLi4vQ29sb3IvQ29sb3JcIik7XG52YXIgTWF0ZXJpYWxfMSA9IHJlcXVpcmUoXCIuLi9NYXRlcmlhbFwiKTtcbnZhciBSVE1hdGhfMSA9IHJlcXVpcmUoXCIuLi9SVE1hdGhcIik7XG52YXIgVmVjdG9yXzEgPSByZXF1aXJlKFwiLi4vVmVjdG9yXCIpO1xudmFyIFBsYW5lID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUGxhbmUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUGxhbmUobm9ybWFsLCBwb2ludCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5wb2ludCA9IG5ldyBWZWN0b3JfMS5WZWN0b3IoMCwgMCwgMCk7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWxfMS5NYXRlcmlhbChDb2xvcl8xLkNvbG9yLmdyYXkpO1xuICAgICAgICB0aGlzLm5vcm1hbCA9IG5vcm1hbDtcbiAgICAgICAgaWYgKHBvaW50KSB7XG4gICAgICAgICAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUGxhbmUucHJvdG90eXBlLmdldEludGVyc2VjdERhdGEgPSBmdW5jdGlvbiAocmF5KSB7XG4gICAgICAgIHZhciBkaXN0YW5jZSwgaGl0UG9pbnQsIHQgPSBWZWN0b3JfMS5WZWN0b3IuZG90KFZlY3Rvcl8xLlZlY3Rvci5zdWJzdHJhY3QodGhpcy5wb2ludCwgcmF5LmdldE9yaWdpbigpKSwgdGhpcy5ub3JtYWwpIC9cbiAgICAgICAgICAgIFZlY3Rvcl8xLlZlY3Rvci5kb3QocmF5LmdldERpcmVjdGlvbigpLCB0aGlzLmdldE5vcm1hbCgpKTtcbiAgICAgICAgaWYgKHQgPD0gUlRNYXRoXzEuUlRNYXRoLkVQU0lMT04pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBoaXRQb2ludCA9IFZlY3Rvcl8xLlZlY3Rvci5hZGQocmF5LmdldE9yaWdpbigpLCBWZWN0b3JfMS5WZWN0b3Iuc2NhbGUocmF5LmdldERpcmVjdGlvbigpLCB0KSk7XG4gICAgICAgIGRpc3RhbmNlID0gVmVjdG9yXzEuVmVjdG9yLnN1YnN0cmFjdChoaXRQb2ludCwgcmF5LmdldE9yaWdpbigpKS5nZXRMZW5ndGgoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhpdFBvaW50OiBoaXRQb2ludCxcbiAgICAgICAgICAgIG5vcm1hbDogdGhpcy5nZXROb3JtYWwoKSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiBkaXN0YW5jZVxuICAgICAgICB9O1xuICAgIH07XG4gICAgUGxhbmUucHJvdG90eXBlLmdldE1hdGVyaWFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRlcmlhbDtcbiAgICB9O1xuICAgIFBsYW5lLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9pbnQ7XG4gICAgfTtcbiAgICBQbGFuZS5wcm90b3R5cGUuZ2V0UmFuZG9tUG9pbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yXzEuVmVjdG9yKDAsIDAsIDApO1xuICAgIH07XG4gICAgUGxhbmUucHJvdG90eXBlLmdldE5vcm1hbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsO1xuICAgIH07XG4gICAgUGxhbmUucHJvdG90eXBlLnNldE1hdGVyaWFsID0gZnVuY3Rpb24gKG1hdGVyaWFsKSB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gUGxhbmU7XG59KShBYnN0cmFjdE9iamVjdF8xLkFic3RyYWN0T2JqZWN0KTtcbmV4cG9ydHMuUGxhbmUgPSBQbGFuZTtcbiIsImltcG9ydCB7IEFic3RyYWN0T2JqZWN0IH0gZnJvbSBcIi4vQWJzdHJhY3RPYmplY3RcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4uL0NvbG9yL0NvbG9yXCI7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9NYXRlcmlhbFwiO1xuaW1wb3J0IHsgUmF5IH0gZnJvbSBcIi4uL1JheVwiO1xuaW1wb3J0IHsgUlRNYXRoIH0gZnJvbSBcIi4uL1JUTWF0aFwiO1xuaW1wb3J0IHsgUkdCQ29sb3IgfSBmcm9tIFwiLi4vQ29sb3IvUkdCQ29sb3JcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9WZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIFBsYW5lIGV4dGVuZHMgQWJzdHJhY3RPYmplY3Qge1xuICAgIHByaXZhdGUgbm9ybWFsOiBWZWN0b3I7XG4gICAgcHJpdmF0ZSBwb2ludDogVmVjdG9yID0gbmV3IFZlY3RvcigwLCAwLCAwKTtcbiAgICBwcml2YXRlIG1hdGVyaWFsOiBNYXRlcmlhbCA9IG5ldyBNYXRlcmlhbChDb2xvci5ncmF5KTtcblxuICAgIGNvbnN0cnVjdG9yIChub3JtYWw6IFZlY3RvciwgcG9pbnQ/OiBWZWN0b3IpIHtcbiAgICAgICAgc3VwZXIgKCk7XG5cbiAgICAgICAgdGhpcy5ub3JtYWwgPSBub3JtYWw7XG5cbiAgICAgICAgaWYgKHBvaW50KSB7XG4gICAgICAgICAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SW50ZXJzZWN0RGF0YSAocmF5OiBSYXkpOiBhbnkge1xuICAgICAgICBsZXQgZGlzdGFuY2U6IG51bWJlcixcbiAgICAgICAgICAgIGhpdFBvaW50OiBWZWN0b3IsXG4gICAgICAgICAgICB0OiBudW1iZXIgPVxuICAgICAgICAgICAgVmVjdG9yLmRvdChcbiAgICAgICAgICAgICAgICBWZWN0b3Iuc3Vic3RyYWN0KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50LFxuICAgICAgICAgICAgICAgICAgICByYXkuZ2V0T3JpZ2luKClcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRoaXMubm9ybWFsXG4gICAgICAgICAgICApIC9cbiAgICAgICAgICAgIFZlY3Rvci5kb3QoXG4gICAgICAgICAgICAgICAgcmF5LmdldERpcmVjdGlvbigpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Tm9ybWFsKClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgaWYgKHQgPD0gUlRNYXRoLkVQU0lMT04pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGhpdFBvaW50ID0gVmVjdG9yLmFkZChcbiAgICAgICAgICAgIHJheS5nZXRPcmlnaW4oKSxcbiAgICAgICAgICAgIFZlY3Rvci5zY2FsZShcbiAgICAgICAgICAgICAgICByYXkuZ2V0RGlyZWN0aW9uKCksXG4gICAgICAgICAgICAgICAgdFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIGRpc3RhbmNlID0gVmVjdG9yLnN1YnN0cmFjdChcbiAgICAgICAgICAgIGhpdFBvaW50LFxuICAgICAgICAgICAgcmF5LmdldE9yaWdpbigpXG4gICAgICAgICkuZ2V0TGVuZ3RoKCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhpdFBvaW50OiBoaXRQb2ludCxcbiAgICAgICAgICAgIG5vcm1hbDogdGhpcy5nZXROb3JtYWwoKSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiBkaXN0YW5jZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNYXRlcmlhbCAoKTogTWF0ZXJpYWwge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRlcmlhbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UG9zaXRpb24gKCk6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvaW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRSYW5kb21Qb2ludCAoKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoMCwgMCwgMCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE5vcm1hbCAoKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNYXRlcmlhbCAobWF0ZXJpYWw6IE1hdGVyaWFsKTogdGhpcyB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
