var Color_1=require("./Color/Color"),Material_1=require("./Material"),RGBColor_1=require("./Color/RGBColor"),RTMath_1=require("./RTMath"),Vector_1=require("./Vector"),Light=function(){function t(t,r,e){this.radius=50,this.material=new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(244,244,244)),0).setLambertCoeff(1),this.type="light",this.position=t,this.power=r,e&&(this.radius=e)}return t.prototype.getPosition=function(){return this.position},t.prototype.getPower=function(){return this.power},t.prototype.getRadius=function(){return this.radius},t.prototype.getIntersectData=function(t){var r,e,o,i,a,n,s,c=Vector_1.Vector.substract(t.getOrigin(),this.position),h=Vector_1.Vector.dot(c,t.getDirection()),u=Vector_1.Vector.dot(c,c)-Math.pow(this.radius,2),p=Math.pow(h,2)-u;if(!(h>0||0>p||p>=0&&(r=-h+Math.sqrt(p),e=-h-Math.sqrt(p),o=Math.min(r,e),i=Math.max(r,e),a=o>RTMath_1.RTMath.EPSILON?o:i,a<RTMath_1.RTMath.EPSILON)))return n=Vector_1.Vector.add(Vector_1.Vector.scaled(t.getDirection(),a),t.getOrigin()),s=Vector_1.Vector.substract(n,t.getOrigin()).getLength(),{point:n,distance:s}},t.prototype.getNormal=function(t){return Vector_1.Vector.normalized(Vector_1.Vector.scaled(Vector_1.Vector.substract(t,this.position),1/this.radius))},t.prototype.getMaterial=function(){return this.material},t.prototype.getType=function(){return this.type},t.prototype.setMaterial=function(t){return this.material=t,this},t}();exports.Light=Light;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpZ2h0LnRzIl0sIm5hbWVzIjpbIkNvbG9yXzEiLCJyZXF1aXJlIiwiTWF0ZXJpYWxfMSIsIlJHQkNvbG9yXzEiLCJSVE1hdGhfMSIsIlZlY3Rvcl8xIiwiTGlnaHQiLCJMaWdodC5jb25zdHJ1Y3RvciIsIkxpZ2h0LmdldFBvc2l0aW9uIiwiTGlnaHQuZ2V0UG93ZXIiLCJMaWdodC5nZXRSYWRpdXMiLCJMaWdodC5nZXRJbnRlcnNlY3REYXRhIiwiTGlnaHQuZ2V0Tm9ybWFsIiwiTGlnaHQuZ2V0TWF0ZXJpYWwiLCJMaWdodC5nZXRUeXBlIiwiTGlnaHQuc2V0TWF0ZXJpYWwiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxHQUFBQSxTQUFBQyxRQUFzQixpQkFDdEJDLFdBQUFELFFBQXlCLGNBRXpCRSxXQUFBRixRQUF5QixvQkFDekJHLFNBQUFILFFBQXVCLFlBQ3ZCSSxTQUFBSixRQUF1QixZQUV2QkssTUFBQSxXQU9JQSxRQUFBQSxHQUFhQSxFQUFrQkEsRUFBZUEsR0FMdENDLEtBQUFBLE9BQWlCQSxHQUVqQkEsS0FBQUEsU0FBcUJBLEdBQUlBLFlBQUFBLFNBQVNBLEdBQUlBLFNBQUFBLE1BQU1BLEdBQUlBLFlBQUFBLFNBQVNBLElBQUtBLElBQUtBLE1BQU9BLEdBQUdBLGdCQUFnQkEsR0FDN0ZBLEtBQUFBLEtBQWVBLFFBR25CQSxLQUFLQSxTQUFXQSxFQUNoQkEsS0FBS0EsTUFBUUEsRUFFVEEsSUFDQUEsS0FBS0EsT0FBU0EsR0F1RjFCRCxNQW5GV0EsR0FBQUEsVUFBQUEsWUFBUEEsV0FDSUUsTUFBT0EsTUFBS0EsVUFHVEYsRUFBQUEsVUFBQUEsU0FBUEEsV0FDSUcsTUFBT0EsTUFBS0EsT0FHVEgsRUFBQUEsVUFBQUEsVUFBUEEsV0FDSUksTUFBT0EsTUFBS0EsUUFHVEosRUFBQUEsVUFBQUEsaUJBQVBBLFNBQXlCQSxHQUNyQkssR0FJSUEsR0FDQUEsRUFDQUEsRUFDQUEsRUFDQUEsRUFDQUEsRUFDQUEsRUFWQUEsRUFBSUEsU0FBQUEsT0FBT0EsVUFBVUEsRUFBSUEsWUFBYUEsS0FBS0EsVUFDM0NBLEVBQVlBLFNBQUFBLE9BQU9BLElBQUlBLEVBQUdBLEVBQUlBLGdCQUM5QkEsRUFBWUEsU0FBQUEsT0FBT0EsSUFBSUEsRUFBR0EsR0FBS0EsS0FBQUEsSUFBQUEsS0FBS0EsT0FBVUEsR0FDOUNBLEVBQVlBLEtBQUFBLElBQUFBLEVBQUtBLEdBQUlBLENBU3pCQSxNQUFJQSxFQUFJQSxHQUFTQSxFQUFKQSxHQUlUQSxHQUFLQSxJQUNMQSxHQUFNQSxFQUFJQSxLQUFLQSxLQUFLQSxHQUNwQkEsR0FBTUEsRUFBSUEsS0FBS0EsS0FBS0EsR0FDcEJBLEVBQU9BLEtBQUtBLElBQUlBLEVBQUlBLEdBQ3BCQSxFQUFPQSxLQUFLQSxJQUFJQSxFQUFJQSxHQUdoQkEsRUFEQUEsRUFBT0EsU0FBQUEsT0FBT0EsUUFDTUEsRUFFQUEsRUFHcEJBLEVBQW9CQSxTQUFBQSxPQUFPQSxVQWNuQ0EsTUFUQUEsR0FBUUEsU0FBQUEsT0FBT0EsSUFDWEEsU0FBQUEsT0FBT0EsT0FBT0EsRUFBSUEsZUFBZ0JBLEdBQ2xDQSxFQUFJQSxhQUVSQSxFQUFXQSxTQUFBQSxPQUFPQSxVQUNkQSxFQUNBQSxFQUFJQSxhQUNOQSxhQUdFQSxNQUFBQSxFQUNBQSxTQUFBQSxJQUlETCxFQUFBQSxVQUFBQSxVQUFQQSxTQUFrQkEsR0FDZE0sTUFBT0EsVUFBQUEsT0FBT0EsV0FDVkEsU0FBQUEsT0FBT0EsT0FDSEEsU0FBQUEsT0FBT0EsVUFBVUEsRUFBT0EsS0FBS0EsVUFDN0JBLEVBQUlBLEtBQUtBLFVBS2ROLEVBQUFBLFVBQUFBLFlBQVBBLFdBQ0lPLE1BQU9BLE1BQUtBLFVBR1RQLEVBQUFBLFVBQUFBLFFBQVBBLFdBQ0lRLE1BQU9BLE1BQUtBLE1BR1RSLEVBQUFBLFVBQUFBLFlBQVBBLFNBQW9CQSxHQUdoQlMsTUFGQUEsTUFBS0EsU0FBV0EsRUFFVEEsTUFFZlQsSUFuR2FVLFNBQUFWLE1BQUtBIiwiZmlsZSI6IkxpZ2h0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi9Db2xvci9Db2xvclwiO1xuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi9NYXRlcmlhbFwiO1xuaW1wb3J0IHsgUmF5IH0gZnJvbSBcIi4vUmF5XCI7XG5pbXBvcnQgeyBSR0JDb2xvciB9IGZyb20gXCIuL0NvbG9yL1JHQkNvbG9yXCI7XG5pbXBvcnQgeyBSVE1hdGggfSBmcm9tIFwiLi9SVE1hdGhcIlxuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4vVmVjdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBMaWdodCB7XG4gICAgcHJpdmF0ZSBwb3NpdGlvbjogVmVjdG9yO1xuICAgIHByaXZhdGUgcmFkaXVzOiBudW1iZXIgPSA1MDtcbiAgICBwcml2YXRlIHBvd2VyOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBtYXRlcmlhbDogTWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwobmV3IENvbG9yKG5ldyBSR0JDb2xvcigyNDQsIDI0NCwgMjQ0KSksIDApLnNldExhbWJlcnRDb2VmZigxKTtcbiAgICBwcml2YXRlIHR5cGU6IHN0cmluZyA9ICdsaWdodCc7XG5cbiAgICBjb25zdHJ1Y3RvciAocG9zaXRpb246IFZlY3RvciwgcG93ZXI6IG51bWJlciwgcmFkaXVzPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy5wb3dlciA9IHBvd2VyO1xuXG4gICAgICAgIGlmIChyYWRpdXMpIHtcbiAgICAgICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldFBvc2l0aW9uICgpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UG93ZXIgKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvd2VyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRSYWRpdXMgKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SW50ZXJzZWN0RGF0YSAocmF5OiBSYXkpOiBhbnkge1xuICAgICAgICBsZXQgayA9IFZlY3Rvci5zdWJzdHJhY3QocmF5LmdldE9yaWdpbigpLCB0aGlzLnBvc2l0aW9uKSxcbiAgICAgICAgICAgIGI6IG51bWJlciA9IFZlY3Rvci5kb3QoaywgcmF5LmdldERpcmVjdGlvbigpKSxcbiAgICAgICAgICAgIGM6IG51bWJlciA9IFZlY3Rvci5kb3QoaywgaykgLSB0aGlzLnJhZGl1cyAqKiAyLFxuICAgICAgICAgICAgZDogbnVtYmVyID0gYiAqKiAyIC0gYyxcbiAgICAgICAgICAgIHQxOiBudW1iZXIsXG4gICAgICAgICAgICB0MjogbnVtYmVyLFxuICAgICAgICAgICAgbWluVDogbnVtYmVyLFxuICAgICAgICAgICAgbWF4VDogbnVtYmVyLFxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uUG9pbnQ6IG51bWJlcixcbiAgICAgICAgICAgIHBvaW50OiBWZWN0b3IsXG4gICAgICAgICAgICBkaXN0YW5jZTogbnVtYmVyO1xuXG4gICAgICAgIGlmIChiID4gMCB8fCBkIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGQgPj0gMCkge1xuICAgICAgICAgICAgdDEgPSAtYiArIE1hdGguc3FydChkKTtcbiAgICAgICAgICAgIHQyID0gLWIgLSBNYXRoLnNxcnQoZCk7XG4gICAgICAgICAgICBtaW5UID0gTWF0aC5taW4odDEsIHQyKTtcbiAgICAgICAgICAgIG1heFQgPSBNYXRoLm1heCh0MSwgdDIpO1xuXG4gICAgICAgICAgICBpZiAobWluVCA+IFJUTWF0aC5FUFNJTE9OKSB7XG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9uUG9pbnQgPSBtaW5UO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnRlcnNlY3Rpb25Qb2ludCA9IG1heFQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbnRlcnNlY3Rpb25Qb2ludCA8IFJUTWF0aC5FUFNJTE9OKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcG9pbnQgPSBWZWN0b3IuYWRkKFxuICAgICAgICAgICAgVmVjdG9yLnNjYWxlZChyYXkuZ2V0RGlyZWN0aW9uKCksIGludGVyc2VjdGlvblBvaW50KSxcbiAgICAgICAgICAgIHJheS5nZXRPcmlnaW4oKVxuICAgICAgICApO1xuICAgICAgICBkaXN0YW5jZSA9IFZlY3Rvci5zdWJzdHJhY3QoXG4gICAgICAgICAgICBwb2ludCxcbiAgICAgICAgICAgIHJheS5nZXRPcmlnaW4oKVxuICAgICAgICApLmdldExlbmd0aCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwb2ludCxcbiAgICAgICAgICAgIGRpc3RhbmNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIGdldE5vcm1hbCAocG9pbnQ6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBWZWN0b3Iubm9ybWFsaXplZChcbiAgICAgICAgICAgIFZlY3Rvci5zY2FsZWQoXG4gICAgICAgICAgICAgICAgVmVjdG9yLnN1YnN0cmFjdChwb2ludCwgdGhpcy5wb3NpdGlvbiksXG4gICAgICAgICAgICAgICAgMSAvIHRoaXMucmFkaXVzXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1hdGVyaWFsICgpOiBNYXRlcmlhbCB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGVyaWFsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUeXBlICgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNYXRlcmlhbCAobWF0ZXJpYWw6IE1hdGVyaWFsKTogdGhpcyB7XG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
