var __extends=this&&this.__extends||function(t,e){function r(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)},RTMath_1=require("../RTMath"),AbstractObject_1=require("./AbstractObject"),Color_1=require("../Color/Color"),Material_1=require("../Material"),RGBColor_1=require("../Color/RGBColor"),Vector_1=require("../Vector"),Polygon=function(t){function e(){for(var e=[],r=0;r<arguments.length;r++)e[r-0]=arguments[r];t.call(this),this.material=new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(115,115,115)),0),this.type="surface",this.vertices=e}return __extends(e,t),e.prototype.getIntersectData=function(t){var r,o,i,c,s;if(o=Vector_1.Vector.dot(this.vertices[0],this.getNormal()),s=Vector_1.Vector.dot(this.getNormal(),t.getDirection()),c=-Vector_1.Vector.dot(this.getNormal(),t.getOrigin())+o,r=c/s,!(r<RTMath_1.RTMath.EPSILON)){t.setDistance(r),i=t.getHitPoint();for(var a=0;a<this.vertices.length;a++){var n=this.vertices[a],l=void 0;if(l=a===this.vertices.length-1?this.vertices[0]:this.vertices[a+1],!e.checkSameClockDir(Vector_1.Vector.substract(l,n),Vector_1.Vector.substract(i,n),this.getNormal()))return}return r=Vector_1.Vector.substract(i,t.getOrigin()).getLength(),{point:i,distance:r}}},e.prototype.getMaterial=function(){return this.material},e.prototype.getNormal=function(){var t=Vector_1.Vector.substract(this.vertices[2],this.vertices[0]),e=Vector_1.Vector.substract(this.vertices[1],this.vertices[0]);return Vector_1.Vector.normalized(Vector_1.Vector.cross(t,e))},e.prototype.getType=function(){return this.type},e.prototype.setMaterial=function(t){return this.material=t,this},e.checkSameClockDir=function(t,e,r){var o=Vector_1.Vector.cross(e,t);return Vector_1.Vector.dot(o,r)>=0},e}(AbstractObject_1.AbstractObject);exports.Polygon=Polygon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9iamVjdHMvUG9seWdvbi5qcyIsIk9iamVjdHMvUG9seWdvbi50cyJdLCJuYW1lcyI6WyJfX2V4dGVuZHMiLCJ0aGlzIiwiZCIsImIiLCJfXyIsImNvbnN0cnVjdG9yIiwicCIsImhhc093blByb3BlcnR5IiwicHJvdG90eXBlIiwiT2JqZWN0IiwiY3JlYXRlIiwiUlRNYXRoXzEiLCJyZXF1aXJlIiwiQWJzdHJhY3RPYmplY3RfMSIsIkNvbG9yXzEiLCJNYXRlcmlhbF8xIiwiUkdCQ29sb3JfMSIsIlZlY3Rvcl8xIiwiUG9seWdvbiIsIl9zdXBlciIsIlBvbHlnb24uY29uc3RydWN0b3IiLCJQb2x5Z29uLmdldEludGVyc2VjdERhdGEiLCJQb2x5Z29uLmdldE1hdGVyaWFsIiwiUG9seWdvbi5nZXROb3JtYWwiLCJQb2x5Z29uLmdldFR5cGUiLCJQb2x5Z29uLnNldE1hdGVyaWFsIiwiUG9seWdvbi5jaGVja1NhbWVDbG9ja0RpciIsIkFic3RyYWN0T2JqZWN0IiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsR0FBSUEsV0FBYUMsTUFBUUEsS0FBS0QsV0FBYyxTQUFVRSxFQUFHQyxHQUVyRCxRQUFTQyxLQUFPSCxLQUFLSSxZQUFjSCxFQURuQyxJQUFLLEdBQUlJLEtBQUtILEdBQU9BLEVBQUVJLGVBQWVELEtBQUlKLEVBQUVJLEdBQUtILEVBQUVHLEdBRW5ESixHQUFFTSxVQUFrQixPQUFOTCxFQUFhTSxPQUFPQyxPQUFPUCxJQUFNQyxFQUFHSSxVQUFZTCxFQUFFSyxVQUFXLEdBQUlKLEtDSG5GTyxTQUFBQyxRQUF1QixhQUN2QkMsaUJBQUFELFFBQStCLG9CQUMvQkUsUUFBQUYsUUFBc0Isa0JBQ3RCRyxXQUFBSCxRQUF5QixlQUV6QkksV0FBQUosUUFBeUIscUJBQ3pCSyxTQUFBTCxRQUF1QixhQUV2Qk0sUUFBQSxTQUFBQyxHQUtJRCxRQUFBQSxLREVJLElDRlNFLEdBQUFBLE1BQUFBLEVBQUFBLEVBQUFBLEVBQUFBLFVBQUFBLE9BQUFBLElBQUFBLEVBQUFBLEVBQUFBLEdBQUFBLFVBQUFBLEVBQ1RBLEdBQUFBLEtBQUFBLE1BSklBLEtBQUFBLFNBQXFCQSxHQUFJQSxZQUFBQSxTQUFTQSxHQUFJQSxTQUFBQSxNQUFNQSxHQUFJQSxZQUFBQSxTQUFTQSxJQUFLQSxJQUFLQSxNQUFPQSxHQUMxRUEsS0FBQUEsS0FBZUEsVUFLbkJBLEtBQUtBLFNBQVdBLEVBbUZ4QkYsTUEzRjZCQSxXQUFBQSxFQUFBQSxHQVdsQkEsRUFBQUEsVUFBQUEsaUJBQVBBLFNBQXlCQSxHQUNyQkcsR0FBSUEsR0FDQUEsRUFDQUEsRUFDQUEsRUFDQUEsQ0FTSkEsSUFQQUEsRUFBeUJBLFNBQUFBLE9BQU9BLElBQUlBLEtBQUtBLFNBQVNBLEdBQUlBLEtBQUtBLGFBRTNEQSxFQUFjQSxTQUFBQSxPQUFPQSxJQUFJQSxLQUFLQSxZQUFhQSxFQUFJQSxnQkFDL0NBLEdBQWFBLFNBQUFBLE9BQU9BLElBQUlBLEtBQUtBLFlBQWFBLEVBQUlBLGFBQWVBLEVBRTdEQSxFQUFXQSxFQUFZQSxJQUVuQkEsRUFBV0EsU0FBQUEsT0FBT0EsU0FBdEJBLENBSUFBLEVBQUlBLFlBQVlBLEdBRWhCQSxFQUFXQSxFQUFJQSxhQUVmQSxLQUFJQSxHQUFJQSxHQUFJQSxFQUFHQSxFQUFJQSxLQUFLQSxTQUFTQSxPQUFRQSxJQUFLQSxDQUMxQ0EsR0FBSUEsR0FBa0JBLEtBQUtBLFNBQVNBLEdBQ2hDQSxFQUFPQSxNQVFYQSxJQUxJQSxFQURBQSxJQUFNQSxLQUFLQSxTQUFTQSxPQUFTQSxFQUNuQkEsS0FBS0EsU0FBU0EsR0FFZEEsS0FBS0EsU0FBU0EsRUFBSUEsSUFJM0JBLEVBQVFBLGtCQUNMQSxTQUFBQSxPQUFPQSxVQUFVQSxFQUFTQSxHQUMxQkEsU0FBQUEsT0FBT0EsVUFBVUEsRUFBVUEsR0FDM0JBLEtBQUtBLGFBR1RBLE9BU1JBLE1BTEFBLEdBQVdBLFNBQUFBLE9BQU9BLFVBQ2RBLEVBQ0FBLEVBQUlBLGFBQ05BLGFBR0VBLE1BQU9BLEVBQ1BBLFNBQUFBLEtBSURILEVBQUFBLFVBQUFBLFlBQVBBLFdBQ0lJLE1BQU9BLE1BQUtBLFVBR1RKLEVBQUFBLFVBQUFBLFVBQVBBLFdBQ0lLLEdBQUlBLEdBQWdCQSxTQUFBQSxPQUFPQSxVQUFVQSxLQUFLQSxTQUFTQSxHQUFJQSxLQUFLQSxTQUFTQSxJQUNqRUEsRUFBZ0JBLFNBQUFBLE9BQU9BLFVBQVVBLEtBQUtBLFNBQVNBLEdBQUlBLEtBQUtBLFNBQVNBLEdBRXJFQSxPQUFPQSxVQUFBQSxPQUFPQSxXQUFXQSxTQUFBQSxPQUFPQSxNQUFNQSxFQUFPQSxLQUcxQ0wsRUFBQUEsVUFBQUEsUUFBUEEsV0FDSU0sTUFBT0EsTUFBS0EsTUFHVE4sRUFBQUEsVUFBQUEsWUFBUEEsU0FBb0JBLEdBR2hCTyxNQUZBQSxNQUFLQSxTQUFXQSxFQUVUQSxNQUdJUCxFQUFBQSxrQkFBZkEsU0FBa0NBLEVBQWlCQSxFQUFpQkEsR0FDaEVRLEdBQUlBLEdBQXFCQSxTQUFBQSxPQUFPQSxNQUFNQSxFQUFTQSxFQUUvQ0EsT0FBT0EsVUFBQUEsT0FBT0EsSUFBSUEsRUFBWUEsSUFBV0EsR0FFakRSLEdBM0Y2QkwsaUJBQUFjLGVBQWhCQyxTQUFBVixRQUFPQSIsImZpbGUiOiJPYmplY3RzL1BvbHlnb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBSVE1hdGhfMSA9IHJlcXVpcmUoXCIuLi9SVE1hdGhcIik7XG52YXIgQWJzdHJhY3RPYmplY3RfMSA9IHJlcXVpcmUoXCIuL0Fic3RyYWN0T2JqZWN0XCIpO1xudmFyIENvbG9yXzEgPSByZXF1aXJlKFwiLi4vQ29sb3IvQ29sb3JcIik7XG52YXIgTWF0ZXJpYWxfMSA9IHJlcXVpcmUoXCIuLi9NYXRlcmlhbFwiKTtcbnZhciBSR0JDb2xvcl8xID0gcmVxdWlyZShcIi4uL0NvbG9yL1JHQkNvbG9yXCIpO1xudmFyIFZlY3Rvcl8xID0gcmVxdWlyZShcIi4uL1ZlY3RvclwiKTtcbnZhciBQb2x5Z29uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUG9seWdvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQb2x5Z29uKCkge1xuICAgICAgICB2YXIgdmVydGljZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZlcnRpY2VzW19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLm1hdGVyaWFsID0gbmV3IE1hdGVyaWFsXzEuTWF0ZXJpYWwobmV3IENvbG9yXzEuQ29sb3IobmV3IFJHQkNvbG9yXzEuUkdCQ29sb3IoMTE1LCAxMTUsIDExNSkpLCAwKTtcbiAgICAgICAgdGhpcy50eXBlID0gJ3N1cmZhY2UnO1xuICAgICAgICB0aGlzLnZlcnRpY2VzID0gdmVydGljZXM7XG4gICAgfVxuICAgIFBvbHlnb24ucHJvdG90eXBlLmdldEludGVyc2VjdERhdGEgPSBmdW5jdGlvbiAocmF5KSB7XG4gICAgICAgIHZhciBkaXN0YW5jZSwgZGlzdGFuY2VGcm9tQXhpc0NlbnRlciwgaGl0UG9pbnQsIG51bWVyYXRvciwgZGVub21pbmF0b3I7XG4gICAgICAgIGRpc3RhbmNlRnJvbUF4aXNDZW50ZXIgPSBWZWN0b3JfMS5WZWN0b3IuZG90KHRoaXMudmVydGljZXNbMF0sIHRoaXMuZ2V0Tm9ybWFsKCkpO1xuICAgICAgICBkZW5vbWluYXRvciA9IFZlY3Rvcl8xLlZlY3Rvci5kb3QodGhpcy5nZXROb3JtYWwoKSwgcmF5LmdldERpcmVjdGlvbigpKTtcbiAgICAgICAgbnVtZXJhdG9yID0gLVZlY3Rvcl8xLlZlY3Rvci5kb3QodGhpcy5nZXROb3JtYWwoKSwgcmF5LmdldE9yaWdpbigpKSArIGRpc3RhbmNlRnJvbUF4aXNDZW50ZXI7XG4gICAgICAgIGRpc3RhbmNlID0gbnVtZXJhdG9yIC8gZGVub21pbmF0b3I7XG4gICAgICAgIGlmIChkaXN0YW5jZSA8IFJUTWF0aF8xLlJUTWF0aC5FUFNJTE9OKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmF5LnNldERpc3RhbmNlKGRpc3RhbmNlKTtcbiAgICAgICAgaGl0UG9pbnQgPSByYXkuZ2V0SGl0UG9pbnQoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdmVydGV4MSA9IHRoaXMudmVydGljZXNbaV0sIHZlcnRleDIgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy52ZXJ0aWNlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgdmVydGV4MiA9IHRoaXMudmVydGljZXNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0ZXgyID0gdGhpcy52ZXJ0aWNlc1tpICsgMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIVBvbHlnb24uY2hlY2tTYW1lQ2xvY2tEaXIoVmVjdG9yXzEuVmVjdG9yLnN1YnN0cmFjdCh2ZXJ0ZXgyLCB2ZXJ0ZXgxKSwgVmVjdG9yXzEuVmVjdG9yLnN1YnN0cmFjdChoaXRQb2ludCwgdmVydGV4MSksIHRoaXMuZ2V0Tm9ybWFsKCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRpc3RhbmNlID0gVmVjdG9yXzEuVmVjdG9yLnN1YnN0cmFjdChoaXRQb2ludCwgcmF5LmdldE9yaWdpbigpKS5nZXRMZW5ndGgoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBvaW50OiBoaXRQb2ludCxcbiAgICAgICAgICAgIGRpc3RhbmNlOiBkaXN0YW5jZVxuICAgICAgICB9O1xuICAgIH07XG4gICAgUG9seWdvbi5wcm90b3R5cGUuZ2V0TWF0ZXJpYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGVyaWFsO1xuICAgIH07XG4gICAgUG9seWdvbi5wcm90b3R5cGUuZ2V0Tm9ybWFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZWRnZTEgPSBWZWN0b3JfMS5WZWN0b3Iuc3Vic3RyYWN0KHRoaXMudmVydGljZXNbMl0sIHRoaXMudmVydGljZXNbMF0pLCBlZGdlMiA9IFZlY3Rvcl8xLlZlY3Rvci5zdWJzdHJhY3QodGhpcy52ZXJ0aWNlc1sxXSwgdGhpcy52ZXJ0aWNlc1swXSk7XG4gICAgICAgIHJldHVybiBWZWN0b3JfMS5WZWN0b3Iubm9ybWFsaXplZChWZWN0b3JfMS5WZWN0b3IuY3Jvc3MoZWRnZTEsIGVkZ2UyKSk7XG4gICAgfTtcbiAgICBQb2x5Z29uLnByb3RvdHlwZS5nZXRUeXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH07XG4gICAgUG9seWdvbi5wcm90b3R5cGUuc2V0TWF0ZXJpYWwgPSBmdW5jdGlvbiAobWF0ZXJpYWwpIHtcbiAgICAgICAgdGhpcy5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFBvbHlnb24uY2hlY2tTYW1lQ2xvY2tEaXIgPSBmdW5jdGlvbiAodmVjdG9yMSwgdmVjdG9yMiwgbm9ybWFsKSB7XG4gICAgICAgIHZhciBub3JtYWxWMVYyID0gVmVjdG9yXzEuVmVjdG9yLmNyb3NzKHZlY3RvcjIsIHZlY3RvcjEpO1xuICAgICAgICByZXR1cm4gVmVjdG9yXzEuVmVjdG9yLmRvdChub3JtYWxWMVYyLCBub3JtYWwpID49IDA7XG4gICAgfTtcbiAgICByZXR1cm4gUG9seWdvbjtcbn0pKEFic3RyYWN0T2JqZWN0XzEuQWJzdHJhY3RPYmplY3QpO1xuZXhwb3J0cy5Qb2x5Z29uID0gUG9seWdvbjtcbiIsImltcG9ydCB7IFJUTWF0aCB9IGZyb20gXCIuLi9SVE1hdGhcIjtcbmltcG9ydCB7IEFic3RyYWN0T2JqZWN0IH0gZnJvbSBcIi4vQWJzdHJhY3RPYmplY3RcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4uL0NvbG9yL0NvbG9yXCI7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCIuLi9NYXRlcmlhbFwiO1xuaW1wb3J0IHsgUmF5IH0gZnJvbSBcIi4uL1JheVwiO1xuaW1wb3J0IHsgUkdCQ29sb3IgfSBmcm9tIFwiLi4vQ29sb3IvUkdCQ29sb3JcIjtcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi9WZWN0b3JcIjtcblxuZXhwb3J0IGNsYXNzIFBvbHlnb24gZXh0ZW5kcyBBYnN0cmFjdE9iamVjdCB7XG4gICAgcHJpdmF0ZSB2ZXJ0aWNlczogVmVjdG9yW107XG4gICAgcHJpdmF0ZSBtYXRlcmlhbDogTWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwobmV3IENvbG9yKG5ldyBSR0JDb2xvcigxMTUsIDExNSwgMTE1KSksIDApO1xuICAgIHByaXZhdGUgdHlwZTogc3RyaW5nID0gJ3N1cmZhY2UnO1xuXG4gICAgY29uc3RydWN0b3IgKC4uLnZlcnRpY2VzOiBWZWN0b3JbXSkge1xuICAgICAgICBzdXBlciAoKTtcblxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gdmVydGljZXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEludGVyc2VjdERhdGEgKHJheTogUmF5KTogYW55IHtcbiAgICAgICAgbGV0IGRpc3RhbmNlOiBudW1iZXIsXG4gICAgICAgICAgICBkaXN0YW5jZUZyb21BeGlzQ2VudGVyOiBudW1iZXIsXG4gICAgICAgICAgICBoaXRQb2ludDogVmVjdG9yLFxuICAgICAgICAgICAgbnVtZXJhdG9yOiBudW1iZXIsXG4gICAgICAgICAgICBkZW5vbWluYXRvcjogbnVtYmVyO1xuXG4gICAgICAgIGRpc3RhbmNlRnJvbUF4aXNDZW50ZXIgPSBWZWN0b3IuZG90KHRoaXMudmVydGljZXNbMF0sIHRoaXMuZ2V0Tm9ybWFsKCkpO1xuXG4gICAgICAgIGRlbm9taW5hdG9yID0gVmVjdG9yLmRvdCh0aGlzLmdldE5vcm1hbCgpLCByYXkuZ2V0RGlyZWN0aW9uKCkpO1xuICAgICAgICBudW1lcmF0b3IgPSAtVmVjdG9yLmRvdCh0aGlzLmdldE5vcm1hbCgpLCByYXkuZ2V0T3JpZ2luKCkpICsgZGlzdGFuY2VGcm9tQXhpc0NlbnRlcjtcblxuICAgICAgICBkaXN0YW5jZSA9IG51bWVyYXRvciAvIGRlbm9taW5hdG9yO1xuXG4gICAgICAgIGlmIChkaXN0YW5jZSA8IFJUTWF0aC5FUFNJTE9OKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByYXkuc2V0RGlzdGFuY2UoZGlzdGFuY2UpO1xuXG4gICAgICAgIGhpdFBvaW50ID0gcmF5LmdldEhpdFBvaW50KCk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB2ZXJ0ZXgxOiBWZWN0b3IgPSB0aGlzLnZlcnRpY2VzW2ldLFxuICAgICAgICAgICAgICAgIHZlcnRleDI6IFZlY3RvcjtcblxuICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMudmVydGljZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHZlcnRleDIgPSB0aGlzLnZlcnRpY2VzWzBdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2ZXJ0ZXgyID0gdGhpcy52ZXJ0aWNlc1tpICsgMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhUG9seWdvbi5jaGVja1NhbWVDbG9ja0RpcihcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yLnN1YnN0cmFjdCh2ZXJ0ZXgyLCB2ZXJ0ZXgxKSxcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yLnN1YnN0cmFjdChoaXRQb2ludCwgdmVydGV4MSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Tm9ybWFsKClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkaXN0YW5jZSA9IFZlY3Rvci5zdWJzdHJhY3QoXG4gICAgICAgICAgICBoaXRQb2ludCxcbiAgICAgICAgICAgIHJheS5nZXRPcmlnaW4oKVxuICAgICAgICApLmdldExlbmd0aCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb2ludDogaGl0UG9pbnQsXG4gICAgICAgICAgICBkaXN0YW5jZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNYXRlcmlhbCAoKTogTWF0ZXJpYWwge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRlcmlhbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Tm9ybWFsICgpOiBWZWN0b3Ige1xuICAgICAgICBsZXQgZWRnZTE6IFZlY3RvciA9IFZlY3Rvci5zdWJzdHJhY3QodGhpcy52ZXJ0aWNlc1syXSwgdGhpcy52ZXJ0aWNlc1swXSksXG4gICAgICAgICAgICBlZGdlMjogVmVjdG9yID0gVmVjdG9yLnN1YnN0cmFjdCh0aGlzLnZlcnRpY2VzWzFdLCB0aGlzLnZlcnRpY2VzWzBdKTtcblxuICAgICAgICByZXR1cm4gVmVjdG9yLm5vcm1hbGl6ZWQoVmVjdG9yLmNyb3NzKGVkZ2UxLCBlZGdlMikpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUeXBlICgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNYXRlcmlhbCAobWF0ZXJpYWw6IE1hdGVyaWFsKTogdGhpcyB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjaGVja1NhbWVDbG9ja0RpciAodmVjdG9yMTogVmVjdG9yLCB2ZWN0b3IyOiBWZWN0b3IsIG5vcm1hbDogVmVjdG9yKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBub3JtYWxWMVYyOiBWZWN0b3IgPSBWZWN0b3IuY3Jvc3ModmVjdG9yMiwgdmVjdG9yMSk7XG5cbiAgICAgICAgcmV0dXJuIFZlY3Rvci5kb3Qobm9ybWFsVjFWMiwgbm9ybWFsKSA+PSAwO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==