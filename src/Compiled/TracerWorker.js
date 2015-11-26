var AbstractLight_1=require("./Lights/AbstractLight"),Camera_1=require("./Camera"),Color_1=require("./Color/Color"),IntersectPoint_1=require("./IntersectPoint"),Material_1=require("./Material"),Polygon_1=require("./Objects/Polygon"),Ray_1=require("./Ray"),RGBColor_1=require("./Color/RGBColor"),Scene_1=require("./Scene"),Sphere_1=require("./Objects/Sphere"),SphericalLight_1=require("./Lights/SphericalLight"),Vector_1=require("./Vector"),Tracer=function(){function e(){this.pixelSamples=1,this.shadowSamples=10,this.giSamples=35,this.screenWidth=250,this.screenHeight=250}return e.prototype.cosineSampleHemisphere=function(e){var t,r,o=Math.random(),a=Math.random(),c=Math.sqrt(o),i=2*Math.PI*a;return t=Math.abs(e.getCoordinates().x)<.5?Vector_1.Vector.cross(e,new Vector_1.Vector(1,0,0)):Vector_1.Vector.cross(e,new Vector_1.Vector(0,1,0)),r=Vector_1.Vector.cross(e,t),Vector_1.Vector.add(Vector_1.Vector.scale(e,Math.sqrt(1-o)),Vector_1.Vector.add(Vector_1.Vector.scale(t,c*Math.cos(i)),Vector_1.Vector.scale(r,c*Math.sin(i))))},e.prototype.getColor=function(e,t){void 0===t&&(t=!0);var r=this.trace(e),o=Color_1.Color.black,a=Color_1.Color.black;return r.getIntersect()?(o=this.getDiffuseColor(e,r,t),t&&(a=this.getReflectionColor(e,r)),o.add(a)):Color_1.Color.black},e.prototype.getDiffuseColor=function(e,t,r){void 0===r&&(r=!0);for(var o,a,c,i,n,l,s,g,V,_,h=Color_1.Color.black,w=0,C=this.scene.getLights();w<C.length;w++){var d=C[w];if(t.getOwner()instanceof AbstractLight_1.AbstractLight)return t.getOwner().getMaterial().getColor();if(l=this.getLightPower(t,d),o=Color_1.Color.black,a=Color_1.Color.black,c=Color_1.Color.black,n=Vector_1.Vector.normalize(Vector_1.Vector.substract(t.getHitPoint(),d.getPosition())),r)for(var p=0;p<this.giSamples;p++){var M=void 0;i=this.cosineSampleHemisphere(t.getOwner().getNormal(t.getHitPoint())),M=this.getColor(new Ray_1.Ray(t.getHitPoint(),i),!1),c=c.add(M)}c=c.divide(this.giSamples),g=-Vector_1.Vector.dot(n,t.getNormal()),o=o.add(t.getOwner().getMaterial().getColor().add(c).multiple(d.getMaterial().getColor().scaled(l*g*t.getOwner().getMaterial().getLambertCoeff()))),s=Vector_1.Vector.reflect(n,t.getNormal()),V=-Vector_1.Vector.dot(s,e.getDirection()),V>0&&(_=Math.pow(V,35),a=a.add(t.getOwner().getMaterial().getColor().multiple(d.getMaterial().getColor().scaled(l*_*t.getOwner().getMaterial().getPhongCoeff())))),h=h.add(o.add(a))}return h},e.prototype.getReflectionColor=function(e,t){var r,o,a=e.getIteration(),c=t.getOwner().getMaterial().getReflectionValue();return e.setIteration(--a),0===a||0===c?Color_1.Color.black:(o=Vector_1.Vector.reflect(e.getDirection(),t.getNormal()),r=this.getColor(new Ray_1.Ray(t.getHitPoint(),o,a)).scaled(c))},e.prototype.getPerspectiveVector=function(e,t){var r=this.scene.getCamera();return Vector_1.Vector.normalize(Vector_1.Vector.add(r.getForwardVector(),Vector_1.Vector.add(Vector_1.Vector.scale(r.getRightVector(),r.recenterX(e)),Vector_1.Vector.scale(r.getUpVector(),r.recenterY(t)))))},e.prototype.getLightPower=function(e,t){for(var r,o,a=t.getPower(),c=0,i=0;i<this.shadowSamples;i++)r=t.getRandomPoint(),o=this.trace(new Ray_1.Ray(e.getHitPoint(),Vector_1.Vector.substract(Vector_1.Vector.substract(t.getPosition(),r),e.getHitPoint()))),o.getIntersect()&&o.getOwner()instanceof AbstractLight_1.AbstractLight&&(c+=(a-Vector_1.Vector.substract(Vector_1.Vector.substract(t.getPosition(),r),e.getHitPoint()).getLength()*(a/t.getFadeRadius()))/this.shadowSamples);return c},e.prototype.trace=function(e){for(var t,r=new IntersectPoint_1.IntersectPoint,o=1/0,a=this.scene.getObjects().concat(this.scene.getLights()),c=0,i=a;c<i.length;c++){var n=i[c];t=n.getIntersectData(e),t&&t.distance<o&&(o=t.distance,r.setIntersect(),r.setHitPoint(t.hitPoint),r.setNormal(t.normal),r.setDistanceFromOrigin(t.distance),r.setOwner(n))}return r},e.prototype.render=function(e,t,r,o){var a,c,i,n=.5,l=Color_1.Color.black;this.screenWidth=e,this.screenHeight=t;for(var s=0;s<this.pixelSamples;s++)a=0,this.pixelSamples>1&&(s%2?a+=Math.random()*n:a-=Math.random()*n),c=new Ray_1.Ray(this.scene.getCamera().getPosition(),this.getPerspectiveVector(r+a,o+a)),l=l.add(this.getColor(c));l=l.divide(this.pixelSamples);for(var g in l)l[g]=Color_1.Color.sRGBEncode(l[g]);i=Color_1.Color.toRGB(l),self.postMessage([r,o,i.red,i.green,i.blue])},e.prototype.setScene=function(e){this.scene=e},e}();onmessage=function(e){var t=e.data;"string"==typeof t&&(t=JSON.parse("["+t+"]"));var r=new Tracer;r.setScene(new Scene_1.Scene({camera:new Camera_1.Camera(new Vector_1.Vector(0,0,-699),new Vector_1.Vector(0,0,1),t[0],t[1]),lights:[new SphericalLight_1.SphericalLight(new Vector_1.Vector(0,640,0),.7,50).setMaterial(new Material_1.Material(Color_1.Color.white)),new SphericalLight_1.SphericalLight(new Vector_1.Vector(0,0,0),.7,150).setMaterial(new Material_1.Material(new Color_1.Color(new RGBColor_1.RGBColor(255,235,200))))],objects:[new Polygon_1.Polygon(new Vector_1.Vector(-700,-700,-700),new Vector_1.Vector(700,-700,-700),new Vector_1.Vector(700,-700,700),new Vector_1.Vector(-700,-700,700)).setMaterial(new Material_1.Material(Color_1.Color.white,0).setLambertCoeff(1)),new Polygon_1.Polygon(new Vector_1.Vector(-700,-700,700),new Vector_1.Vector(700,-700,700),new Vector_1.Vector(700,700,700),new Vector_1.Vector(-700,700,700)).setMaterial(new Material_1.Material(Color_1.Color.white,0).setLambertCoeff(1)),new Polygon_1.Polygon(new Vector_1.Vector(-700,700,700),new Vector_1.Vector(700,700,700),new Vector_1.Vector(700,700,-700),new Vector_1.Vector(-700,700,-700)).setMaterial(new Material_1.Material(Color_1.Color.white,0).setLambertCoeff(1)),new Polygon_1.Polygon(new Vector_1.Vector(700,-700,700),new Vector_1.Vector(700,-700,-700),new Vector_1.Vector(700,700,-700),new Vector_1.Vector(700,700,700)).setMaterial(new Material_1.Material(Color_1.Color.blue).setLambertCoeff(1)),new Polygon_1.Polygon(new Vector_1.Vector(-700,-700,-700),new Vector_1.Vector(-700,-700,700),new Vector_1.Vector(-700,700,700),new Vector_1.Vector(-700,700,-700)).setMaterial(new Material_1.Material(Color_1.Color.red,0).setLambertCoeff(1)),new Polygon_1.Polygon(new Vector_1.Vector(700,-700,-700),new Vector_1.Vector(-700,-700,-700),new Vector_1.Vector(-700,700,-700),new Vector_1.Vector(700,700,-700)).setMaterial(new Material_1.Material(Color_1.Color.black,0).setLambertCoeff(1)),new Sphere_1.Sphere(new Vector_1.Vector(-250,-500,450),200).setMaterial(new Material_1.Material(Color_1.Color.black,1)),new Sphere_1.Sphere(new Vector_1.Vector(250,-500,400),200).setMaterial(new Material_1.Material(Color_1.Color.green,0))]})),r.render(t[0],t[1],t[2],t[3])};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRyYWNlcldvcmtlci50cyJdLCJuYW1lcyI6WyJBYnN0cmFjdExpZ2h0XzEiLCJyZXF1aXJlIiwiQ2FtZXJhXzEiLCJDb2xvcl8xIiwiSW50ZXJzZWN0UG9pbnRfMSIsIk1hdGVyaWFsXzEiLCJQb2x5Z29uXzEiLCJSYXlfMSIsIlJHQkNvbG9yXzEiLCJTY2VuZV8xIiwiU3BoZXJlXzEiLCJTcGhlcmljYWxMaWdodF8xIiwiVmVjdG9yXzEiLCJUcmFjZXIiLCJUcmFjZXIuY29uc3RydWN0b3IiLCJUcmFjZXIuY29zaW5lU2FtcGxlSGVtaXNwaGVyZSIsIlRyYWNlci5nZXRDb2xvciIsIlRyYWNlci5nZXREaWZmdXNlQ29sb3IiLCJUcmFjZXIuZ2V0UmVmbGVjdGlvbkNvbG9yIiwiVHJhY2VyLmdldFBlcnNwZWN0aXZlVmVjdG9yIiwiVHJhY2VyLmdldExpZ2h0UG93ZXIiLCJUcmFjZXIudHJhY2UiLCJUcmFjZXIucmVuZGVyIiwiVHJhY2VyLnNldFNjZW5lIiwib25tZXNzYWdlIiwibWVzc2FnZSIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJ0cmFjZXIiLCJzZXRTY2VuZSIsIlNjZW5lIiwiY2FtZXJhIiwiQ2FtZXJhIiwiVmVjdG9yIiwibGlnaHRzIiwiU3BoZXJpY2FsTGlnaHQiLCJzZXRNYXRlcmlhbCIsIk1hdGVyaWFsIiwiQ29sb3IiLCJ3aGl0ZSIsIlJHQkNvbG9yIiwib2JqZWN0cyIsIlBvbHlnb24iLCJzZXRMYW1iZXJ0Q29lZmYiLCJibHVlIiwicmVkIiwiYmxhY2siLCJTcGhlcmUiLCJncmVlbiIsInJlbmRlciJdLCJtYXBwaW5ncyI6IkFBR0EsR0FBQUEsaUJBQUFDLFFBQThCLDBCQUU5QkMsU0FBQUQsUUFBdUIsWUFDdkJFLFFBQUFGLFFBQXNCLGlCQUN0QkcsaUJBQUFILFFBQStCLG9CQUMvQkksV0FBQUosUUFBeUIsY0FFekJLLFVBQUFMLFFBQXdCLHFCQUN4Qk0sTUFBQU4sUUFBb0IsU0FDcEJPLFdBQUFQLFFBQXlCLG9CQUV6QlEsUUFB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LE9BQU8sR0FBSXBDLFVBQUFzQixPQUFPLElBQUssS0FBTSxLQUFNLEtBQ2xDRyxZQUFZLEdBQUloQyxZQUFBaUMsU0FBU25DLFFBQUFvQyxNQUFNVSxNQUFPLFFBS3ZEcEIsRUFBT3FCLE9BQU94QixFQUFLLEdBQUlBLEVBQUssR0FBSUEsRUFBSyxHQUFJQSxFQUFLIiwiZmlsZSI6IlRyYWNlcldvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIG5vLWRlZmF1bHQtbGliPVwidHJ1ZVwiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJsaWIvbGliLndlYndvcmtlci5kLnRzXCIgLz5cblxuaW1wb3J0IHsgQWJzdHJhY3RMaWdodCB9IGZyb20gXCIuL0xpZ2h0cy9BYnN0cmFjdExpZ2h0XCI7XG5pbXBvcnQgeyBBYnN0cmFjdE9iamVjdCB9IGZyb20gXCIuL09iamVjdHMvQWJzdHJhY3RPYmplY3RcIjtcbmltcG9ydCB7IENhbWVyYSB9IGZyb20gXCIuL0NhbWVyYVwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi9Db2xvci9Db2xvclwiO1xuaW1wb3J0IHsgSW50ZXJzZWN0UG9pbnQgfSBmcm9tIFwiLi9JbnRlcnNlY3RQb2ludFwiO1xuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiLi9NYXRlcmlhbFwiO1xuaW1wb3J0IHsgUGxhbmUgfSBmcm9tIFwiLi9PYmplY3RzL1BsYW5lXCI7XG5pbXBvcnQgeyBQb2x5Z29uIH0gZnJvbSBcIi4vT2JqZWN0cy9Qb2x5Z29uXCI7XG5pbXBvcnQgeyBSYXkgfSBmcm9tIFwiLi9SYXlcIjtcbmltcG9ydCB7IFJHQkNvbG9yIH0gZnJvbSBcIi4vQ29sb3IvUkdCQ29sb3JcIjtcbmltcG9ydCB7IFJUTWF0aCB9IGZyb20gXCIuL1JUTWF0aFwiO1xuaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi9TY2VuZVwiO1xuaW1wb3J0IHsgU3BoZXJlIH0gZnJvbSBcIi4vT2JqZWN0cy9TcGhlcmVcIjtcbmltcG9ydCB7IFNwaGVyaWNhbExpZ2h0IH0gZnJvbSBcIi4vTGlnaHRzL1NwaGVyaWNhbExpZ2h0XCI7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tIFwiLi9WZWN0b3JcIjtcblxuY2xhc3MgVHJhY2VyIHtcbiAgICBwcml2YXRlIHNjZW5lOiBTY2VuZTtcbiAgICBwcml2YXRlIHBpeGVsU2FtcGxlczogbnVtYmVyID0gMTtcbiAgICBwcml2YXRlIHNoYWRvd1NhbXBsZXM6IG51bWJlciA9IDEwO1xuICAgIHByaXZhdGUgZ2lTYW1wbGVzOiBudW1iZXIgPSAzNTtcbiAgICBwcml2YXRlIHNjcmVlbldpZHRoOiBudW1iZXIgPSAyNTA7XG4gICAgcHJpdmF0ZSBzY3JlZW5IZWlnaHQ6IG51bWJlciA9IDI1MDtcblxuICAgIHByaXZhdGUgY29zaW5lU2FtcGxlSGVtaXNwaGVyZSAobm9ybWFsOiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICBsZXQgdSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIGxldCB2ID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgbGV0IHIgPSBNYXRoLnNxcnQodSk7XG4gICAgICAgIGxldCBhbmdsZSA9IDIgKiBNYXRoLlBJICogdjtcblxuICAgICAgICBsZXQgc2RpcixcbiAgICAgICAgICAgIHRkaXI7XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKG5vcm1hbC5nZXRDb29yZGluYXRlcygpWyd4J10pIDwgMC41KSB7XG4gICAgICAgICAgICBzZGlyID0gVmVjdG9yLmNyb3NzKG5vcm1hbCwgbmV3IFZlY3RvcigxLDAsMCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2RpciA9IFZlY3Rvci5jcm9zcyhub3JtYWwsIG5ldyBWZWN0b3IoMCwxLDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRkaXIgPSBWZWN0b3IuY3Jvc3Mobm9ybWFsLCBzZGlyKTtcblxuICAgICAgICByZXR1cm4gVmVjdG9yLmFkZChcbiAgICAgICAgICAgIFZlY3Rvci5zY2FsZShub3JtYWwsICBNYXRoLnNxcnQoMSAtIHUpKSxcbiAgICAgICAgICAgIFZlY3Rvci5hZGQoXG4gICAgICAgICAgICAgICAgVmVjdG9yLnNjYWxlKHNkaXIsIHIgKiBNYXRoLmNvcyhhbmdsZSkpLFxuICAgICAgICAgICAgICAgIFZlY3Rvci5zY2FsZSh0ZGlyLCByICogTWF0aC5zaW4oYW5nbGUpKVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIC8qbGV0IGJhc2lzVHJhbnNmb3JtOiBWZWN0b3IsXG4gICAgICAgICAgICBiaXRhbmdlbnQ6IFZlY3RvcixcbiAgICAgICAgICAgIHUxOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpLFxuICAgICAgICAgICAgdTI6IG51bWJlciA9IE1hdGgucmFuZG9tKCksXG4gICAgICAgICAgICBzaW5fdGhldGE6IG51bWJlciA9IE1hdGguc3FydCh1MSksXG4gICAgICAgICAgICBjb3NfdGhldGE6IG51bWJlciA9IE1hdGguc3FydCgxIC0gdTEpLFxuICAgICAgICAgICAgdGhldGE6IG51bWJlciA9IDIgKiBNYXRoLlBJICogdTIsXG4gICAgICAgICAgICBkaXI6IFZlY3RvciA9IG5ldyBWZWN0b3IoXG4gICAgICAgICAgICAgICAgc2luX3RoZXRhICogTWF0aC5jb3ModGhldGEpLFxuICAgICAgICAgICAgICAgIHNpbl90aGV0YSAqIE1hdGguc2luKHRoZXRhKSxcbiAgICAgICAgICAgICAgICBNYXRoLnNxcnQoTWF0aC5tYXgoMCwgMSAtIHUxKSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0YW5nZW50OiBWZWN0b3I7XG5cbiAgICAgICAgaWYgKG5vcm1hbC5nZXRDb29yZGluYXRlcygpWyd4J10gPT0gMCkge1xuICAgICAgICAgICAgdGFuZ2VudCA9IG5ldyBWZWN0b3IoMSwgMCwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YW5nZW50ID0gVmVjdG9yLm5vcm1hbGl6ZWQoXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcihcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsLmdldENvb3JkaW5hdGVzKClbJ3onXSxcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgLW5vcm1hbC5nZXRDb29yZGluYXRlcygpWyd4J11cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgYml0YW5nZW50ID0gVmVjdG9yLmNyb3NzKHRhbmdlbnQsIG5vcm1hbCk7XG5cbiAgICAgICAgYmFzaXNUcmFuc2Zvcm0gPSBuZXcgVmVjdG9yKFxuICAgICAgICAgICAgVmVjdG9yLmRvdCh0YW5nZW50LCBkaXIpLFxuICAgICAgICAgICAgVmVjdG9yLmRvdChub3JtYWwsIGRpciksXG4gICAgICAgICAgICBWZWN0b3IuZG90KGJpdGFuZ2VudCwgZGlyKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBWZWN0b3Iubm9ybWFsaXplZChiYXNpc1RyYW5zZm9ybSk7Ki9cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbG9yIChyYXk6IFJheSwgcmVjdXJjaXZlOiBib29sZWFuID0gdHJ1ZSk6IENvbG9yIHtcbiAgICAgICAgbGV0IGludGVyc2VjdGlvbiA9IHRoaXMudHJhY2UocmF5KSxcbiAgICAgICAgICAgIGRpZmZ1c2VDb2xvcjogQ29sb3IgPSBDb2xvci5ibGFjayxcbiAgICAgICAgICAgIHJlZmxlY3RDb2xvcjogQ29sb3IgPSBDb2xvci5ibGFjaztcblxuICAgICAgICBpZiAoIWludGVyc2VjdGlvbi5nZXRJbnRlcnNlY3QoKSkge1xuICAgICAgICAgICAgcmV0dXJuIENvbG9yLmJsYWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlmZnVzZUNvbG9yID0gdGhpcy5nZXREaWZmdXNlQ29sb3IocmF5LCBpbnRlcnNlY3Rpb24sIHJlY3VyY2l2ZSk7XG5cbiAgICAgICAgaWYgKHJlY3VyY2l2ZSkge1xuICAgICAgICAgICAgcmVmbGVjdENvbG9yID0gdGhpcy5nZXRSZWZsZWN0aW9uQ29sb3IocmF5LCBpbnRlcnNlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpZmZ1c2VDb2xvci5hZGQocmVmbGVjdENvbG9yKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERpZmZ1c2VDb2xvciAocmF5OiBSYXksIGludGVyc2VjdDogYW55LCByZWN1cnNpdmU6IGJvb2xlYW4gPSB0cnVlKTogQ29sb3Ige1xuICAgICAgICBsZXQgbGFtYkNvbG9yOiBDb2xvcixcbiAgICAgICAgICAgIHBob25nQ29sb3I6IENvbG9yLFxuICAgICAgICAgICAgcmFkaWFuY2VDb2xvcjogQ29sb3IsXG4gICAgICAgICAgICBwaXhlbENvbG9yOiBDb2xvciA9IENvbG9yLmJsYWNrLFxuICAgICAgICAgICAgcmFkaWFuY2VSYW5kb21EaXJlY3Rpb246IFZlY3RvcixcbiAgICAgICAgICAgIGxpZ2h0RGlyZWN0aW9uOiBWZWN0b3IsXG4gICAgICAgICAgICBsaWdodFBvd2VyOiBudW1iZXIsXG4gICAgICAgICAgICByZWZsZWN0UGhvbmdWZWN0b3JEaXI6IFZlY3RvcixcbiAgICAgICAgICAgIGxhbWJDb3M6IG51bWJlcixcbiAgICAgICAgICAgIHBob25nQ29zOiBudW1iZXIsXG4gICAgICAgICAgICBwaG9uZzogbnVtYmVyO1xuXG4gICAgICAgIGZvciAobGV0IGxpZ2h0IG9mIHRoaXMuc2NlbmUuZ2V0TGlnaHRzKCkpIHtcbiAgICAgICAgICAgIGlmIChpbnRlcnNlY3QuZ2V0T3duZXIoKSBpbnN0YW5jZW9mIEFic3RyYWN0TGlnaHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJzZWN0LmdldE93bmVyKClcbiAgICAgICAgICAgICAgICAgICAgLmdldE1hdGVyaWFsKClcbiAgICAgICAgICAgICAgICAgICAgLmdldENvbG9yKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpZ2h0UG93ZXIgPSB0aGlzLmdldExpZ2h0UG93ZXIoaW50ZXJzZWN0LCBsaWdodCk7XG5cbiAgICAgICAgICAgIGxhbWJDb2xvciA9IENvbG9yLmJsYWNrO1xuICAgICAgICAgICAgcGhvbmdDb2xvciA9IENvbG9yLmJsYWNrO1xuICAgICAgICAgICAgcmFkaWFuY2VDb2xvciA9IENvbG9yLmJsYWNrO1xuXG4gICAgICAgICAgICBsaWdodERpcmVjdGlvbiA9IFZlY3Rvci5ub3JtYWxpemUoXG4gICAgICAgICAgICAgICAgVmVjdG9yLnN1YnN0cmFjdChcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0LmdldEhpdFBvaW50KCksXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0LmdldFBvc2l0aW9uKClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvL2dpXG4gICAgICAgICAgICBpZiAocmVjdXJzaXZlKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdpU2FtcGxlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByYWRpYW5jZUluUmFuZG9tRGlyZWN0aW9uOiBDb2xvcjtcblxuICAgICAgICAgICAgICAgICAgICByYWRpYW5jZVJhbmRvbURpcmVjdGlvbiA9IHRoaXMuY29zaW5lU2FtcGxlSGVtaXNwaGVyZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyc2VjdC5nZXRPd25lcigpLmdldE5vcm1hbChpbnRlcnNlY3QuZ2V0SGl0UG9pbnQoKSlcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICByYWRpYW5jZUluUmFuZG9tRGlyZWN0aW9uID0gdGhpcy5nZXRDb2xvcihcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSYXkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0LmdldEhpdFBvaW50KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkaWFuY2VSYW5kb21EaXJlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJhZGlhbmNlQ29sb3IgPSByYWRpYW5jZUNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkKHJhZGlhbmNlSW5SYW5kb21EaXJlY3Rpb24pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByYWRpYW5jZUNvbG9yID0gcmFkaWFuY2VDb2xvci5kaXZpZGUodGhpcy5naVNhbXBsZXMpO1xuXG4gICAgICAgICAgICAvLyBsYW1iZXJ0XG5cbiAgICAgICAgICAgIGxhbWJDb3MgPSAtVmVjdG9yLmRvdChcbiAgICAgICAgICAgICAgICBsaWdodERpcmVjdGlvbixcbiAgICAgICAgICAgICAgICBpbnRlcnNlY3QuZ2V0Tm9ybWFsKClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxhbWJDb2xvciA9IGxhbWJDb2xvci5hZGQoXG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0XG4gICAgICAgICAgICAgICAgICAgIC5nZXRPd25lcigpXG4gICAgICAgICAgICAgICAgICAgIC5nZXRNYXRlcmlhbCgpXG4gICAgICAgICAgICAgICAgICAgIC5nZXRDb2xvcigpXG4gICAgICAgICAgICAgICAgICAgIC5hZGQocmFkaWFuY2VDb2xvcilcbiAgICAgICAgICAgICAgICAgICAgLm11bHRpcGxlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHQuZ2V0TWF0ZXJpYWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb2xvcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjYWxlZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRQb3dlciAqIGxhbWJDb3MgKiBpbnRlcnNlY3QuZ2V0T3duZXIoKS5nZXRNYXRlcmlhbCgpLmdldExhbWJlcnRDb2VmZigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBwaG9uZ1xuXG4gICAgICAgICAgICByZWZsZWN0UGhvbmdWZWN0b3JEaXIgPSBWZWN0b3IucmVmbGVjdChcbiAgICAgICAgICAgICAgICBsaWdodERpcmVjdGlvbixcbiAgICAgICAgICAgICAgICBpbnRlcnNlY3QuZ2V0Tm9ybWFsKClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwaG9uZ0NvcyA9IC1WZWN0b3IuZG90KHJlZmxlY3RQaG9uZ1ZlY3RvckRpciwgcmF5LmdldERpcmVjdGlvbigpKTtcblxuICAgICAgICAgICAgaWYgKHBob25nQ29zID4gMCkge1xuICAgICAgICAgICAgICAgIHBob25nID0gTWF0aC5wb3cocGhvbmdDb3MsIDM1KTtcbiAgICAgICAgICAgICAgICBwaG9uZ0NvbG9yID0gcGhvbmdDb2xvci5hZGQoXG4gICAgICAgICAgICAgICAgICAgIGludGVyc2VjdC5nZXRPd25lcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0TWF0ZXJpYWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldENvbG9yKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tdWx0aXBsZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodC5nZXRNYXRlcmlhbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRDb2xvcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zY2FsZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWdodFBvd2VyICogcGhvbmcgKiBpbnRlcnNlY3QuZ2V0T3duZXIoKS5nZXRNYXRlcmlhbCgpLmdldFBob25nQ29lZmYoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9hbWJpZW50IG9jY2x1c2lvblxuICAgICAgICAgICAgLypsZXQgYyA9IDA7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hb1NhbXBsZXM7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBkaXIgPSBjb3NpbmVXZWlnaHRlZERpcmVjdGlvblNvdXJjZShpbnRlcnNlY3RbJ293bmVyJ10uZ2V0Tm9ybWFsKGludGVyc2VjdFsncG9pbnQnXSkpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGFvSW50ZXJzZWN0ID0gdGhpcy50cmFjZShcbiAgICAgICAgICAgICAgICAgICAgbmV3IFJheShcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyc2VjdFsncG9pbnQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpclxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGlmIChhb0ludGVyc2VjdFsncG9pbnQnXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoYW9JbnRlcnNlY3RbJ2Rpc3RhbmNlJ10gPiAyNTApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYysrO1xuICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIHBpeGVsQ29sb3IgPSBwaXhlbENvbG9yLmFkZChcbiAgICAgICAgICAgICAgICBsYW1iQ29sb3IuYWRkKHBob25nQ29sb3IpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBpeGVsQ29sb3I7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSZWZsZWN0aW9uQ29sb3IgKHJheTogUmF5LCBpbnRlcnNlY3Q6IGFueSk6IGFueSB7XG4gICAgICAgIGxldCByYXlJdGVyYXRpb246IG51bWJlciA9IHJheS5nZXRJdGVyYXRpb24oKSxcbiAgICAgICAgICAgIHJlZmxlY3Rpb25Db2xvcjogQ29sb3IsXG4gICAgICAgICAgICByZWZsZWN0aW9uVmFsdWU6IG51bWJlciA9IGludGVyc2VjdC5nZXRPd25lcigpLmdldE1hdGVyaWFsKCkuZ2V0UmVmbGVjdGlvblZhbHVlKCksXG4gICAgICAgICAgICByZWZsZWN0ZWRSYXk6IFZlY3RvcjtcblxuICAgICAgICByYXkuc2V0SXRlcmF0aW9uKC0tcmF5SXRlcmF0aW9uKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICByYXlJdGVyYXRpb24gPT09IDAgfHxcbiAgICAgICAgICAgIHJlZmxlY3Rpb25WYWx1ZSA9PT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBDb2xvci5ibGFjaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZmxlY3RlZFJheSA9IFZlY3Rvci5yZWZsZWN0KFxuICAgICAgICAgICAgcmF5LmdldERpcmVjdGlvbigpLFxuICAgICAgICAgICAgaW50ZXJzZWN0LmdldE5vcm1hbCgpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmVmbGVjdGlvbkNvbG9yID0gdGhpcy5nZXRDb2xvcihcbiAgICAgICAgICAgIG5ldyBSYXkoaW50ZXJzZWN0LmdldEhpdFBvaW50KCksIHJlZmxlY3RlZFJheSwgcmF5SXRlcmF0aW9uKVxuICAgICAgICApLnNjYWxlZChyZWZsZWN0aW9uVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiByZWZsZWN0aW9uQ29sb3I7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQZXJzcGVjdGl2ZVZlY3RvciAoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGNhbWVyYTogQ2FtZXJhID0gdGhpcy5zY2VuZS5nZXRDYW1lcmEoKTtcblxuICAgICAgICByZXR1cm4gVmVjdG9yLm5vcm1hbGl6ZShcbiAgICAgICAgICAgIFZlY3Rvci5hZGQoXG4gICAgICAgICAgICAgICAgY2FtZXJhLmdldEZvcndhcmRWZWN0b3IoKSxcbiAgICAgICAgICAgICAgICBWZWN0b3IuYWRkKFxuICAgICAgICAgICAgICAgICAgICBWZWN0b3Iuc2NhbGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1lcmEuZ2V0UmlnaHRWZWN0b3IoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbWVyYS5yZWNlbnRlclgoeClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yLnNjYWxlKFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FtZXJhLmdldFVwVmVjdG9yKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1lcmEucmVjZW50ZXJZKHkpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMaWdodFBvd2VyIChpbnRlcnNlY3Q6IGFueSwgbGlnaHQ6IEFic3RyYWN0TGlnaHQpOiBudW1iZXIge1xuICAgICAgICBsZXQgbGlnaHRQb3dlciA9IGxpZ2h0LmdldFBvd2VyKCksXG4gICAgICAgICAgICBsaWdodFJhbmRvbVBvaW50OiBWZWN0b3IsXG4gICAgICAgICAgICBzaGFkb3dSYXk6IEludGVyc2VjdFBvaW50LFxuICAgICAgICAgICAgcmVzdWx0UG93ZXI6IG51bWJlciA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoYWRvd1NhbXBsZXM7IGkrKykge1xuICAgICAgICAgICAgbGlnaHRSYW5kb21Qb2ludCA9IGxpZ2h0LmdldFJhbmRvbVBvaW50KCk7XG5cbiAgICAgICAgICAgIHNoYWRvd1JheSA9IHRoaXMudHJhY2UoXG4gICAgICAgICAgICAgICAgbmV3IFJheShcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0LmdldEhpdFBvaW50KCksXG4gICAgICAgICAgICAgICAgICAgIFZlY3Rvci5zdWJzdHJhY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBWZWN0b3Iuc3Vic3RyYWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0LmdldFBvc2l0aW9uKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRSYW5kb21Qb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyc2VjdC5nZXRIaXRQb2ludCgpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoIXNoYWRvd1JheS5nZXRJbnRlcnNlY3QoKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShzaGFkb3dSYXkuZ2V0T3duZXIoKSBpbnN0YW5jZW9mIEFic3RyYWN0TGlnaHQpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlc3VsdFBvd2VyICs9IChcbiAgICAgICAgICAgICAgICBsaWdodFBvd2VyIC1cbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIFZlY3Rvci5zdWJzdHJhY3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBWZWN0b3Iuc3Vic3RyYWN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0LmdldFBvc2l0aW9uKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRSYW5kb21Qb2ludFxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyc2VjdC5nZXRIaXRQb2ludCgpXG4gICAgICAgICAgICAgICAgICAgICkuZ2V0TGVuZ3RoKCkgKiAobGlnaHRQb3dlciAvIGxpZ2h0LmdldEZhZGVSYWRpdXMoKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIC8gdGhpcy5zaGFkb3dTYW1wbGVzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFBvd2VyO1xuICAgIH1cblxuICAgIHByaXZhdGUgdHJhY2UgKHJheTogUmF5KTogSW50ZXJzZWN0UG9pbnQge1xuICAgICAgICBsZXQgaW50ZXJzZWN0aW9uID0gbmV3IEludGVyc2VjdFBvaW50KCksXG4gICAgICAgICAgICBpbnRlcnNlY3REYXRhOiBhbnksXG4gICAgICAgICAgICBtaW5EaXN0YW5jZTogbnVtYmVyID0gSW5maW5pdHksXG4gICAgICAgICAgICBzY2VuZU9iamVjdHM6IEFic3RyYWN0T2JqZWN0W10mQWJzdHJhY3RMaWdodFtdID0gdGhpcy5zY2VuZS5nZXRPYmplY3RzKCkuY29uY2F0KHRoaXMuc2NlbmUuZ2V0TGlnaHRzKCkpO1xuXG4gICAgICAgIGZvciAobGV0IG9iamVjdCBvZiBzY2VuZU9iamVjdHMpIHtcbiAgICAgICAgICAgIGludGVyc2VjdERhdGEgPSBvYmplY3QuZ2V0SW50ZXJzZWN0RGF0YShyYXkpO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0RGF0YSAmJlxuICAgICAgICAgICAgICAgIGludGVyc2VjdERhdGFbJ2Rpc3RhbmNlJ10gPCBtaW5EaXN0YW5jZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbWluRGlzdGFuY2UgPSBpbnRlcnNlY3REYXRhWydkaXN0YW5jZSddO1xuXG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9uLnNldEludGVyc2VjdCgpO1xuICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbi5zZXRIaXRQb2ludChpbnRlcnNlY3REYXRhWydoaXRQb2ludCddKTtcbiAgICAgICAgICAgICAgICBpbnRlcnNlY3Rpb24uc2V0Tm9ybWFsKGludGVyc2VjdERhdGFbJ25vcm1hbCddKTtcbiAgICAgICAgICAgICAgICBpbnRlcnNlY3Rpb24uc2V0RGlzdGFuY2VGcm9tT3JpZ2luKGludGVyc2VjdERhdGFbJ2Rpc3RhbmNlJ10pO1xuICAgICAgICAgICAgICAgIGludGVyc2VjdGlvbi5zZXRPd25lcihvYmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGludGVyc2VjdGlvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyIChzY3JlZW5XaWR0aDogbnVtYmVyLCBzY3JlZW5IZWlnaHQ6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcmFuZG9NdWx0aXBsaWVyID0gMC41O1xuXG4gICAgICAgIGxldCBjb2xvcjogQ29sb3IgPSBDb2xvci5ibGFjayxcbiAgICAgICAgICAgIHJhbmQ6IG51bWJlcixcbiAgICAgICAgICAgIHJheTogUmF5LFxuICAgICAgICAgICAgcmdiQ29sb3I6IHtcbiAgICAgICAgICAgICAgICByZWQ6IG51bWJlcixcbiAgICAgICAgICAgICAgICBncmVlbjogbnVtYmVyLFxuICAgICAgICAgICAgICAgIGJsdWU6IG51bWJlclxuICAgICAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNjcmVlbldpZHRoID0gc2NyZWVuV2lkdGg7XG4gICAgICAgIHRoaXMuc2NyZWVuSGVpZ2h0ID0gc2NyZWVuSGVpZ2h0O1xuXG4gICAgICAgIGZvciAobGV0IHNhbXBsZSA9IDA7IHNhbXBsZSA8IHRoaXMucGl4ZWxTYW1wbGVzOyBzYW1wbGUrKykge1xuICAgICAgICAgICAgcmFuZCA9IDA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBpeGVsU2FtcGxlcyA+IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2FtcGxlICUgMikge1xuICAgICAgICAgICAgICAgICAgICByYW5kICs9IE1hdGgucmFuZG9tKCkgKiByYW5kb011bHRpcGxpZXI7XG4gICAgICAgICAgICAgICAgfSAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmQgLT0gTWF0aC5yYW5kb20oKSAqIHJhbmRvTXVsdGlwbGllcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJheSA9IG5ldyBSYXkoXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5nZXRDYW1lcmEoKS5nZXRQb3NpdGlvbigpLFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGVyc3BlY3RpdmVWZWN0b3IoeCArIHJhbmQsIHkgKyByYW5kKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29sb3IgPSBjb2xvci5hZGQodGhpcy5nZXRDb2xvcihyYXkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbG9yID0gY29sb3IuZGl2aWRlKHRoaXMucGl4ZWxTYW1wbGVzKTtcblxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnQgaW4gY29sb3IpIHtcbiAgICAgICAgICAgIGNvbG9yW2NvbXBvbmVudF0gPSBDb2xvci5zUkdCRW5jb2RlKGNvbG9yW2NvbXBvbmVudF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmdiQ29sb3IgPSBDb2xvci50b1JHQihjb2xvcik7XG5cbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZShbeCwgeSwgcmdiQ29sb3IucmVkLCByZ2JDb2xvci5ncmVlbiwgcmdiQ29sb3IuYmx1ZV0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTY2VuZSAoc2NlbmU6IFNjZW5lKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB9XG59XG5cbm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgdmFyIGRhdGEgPSBtZXNzYWdlLmRhdGE7XG5cbiAgICBpZiAodHlwZW9mKGRhdGEpID09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKCdbJytkYXRhKyddJyk7XG4gICAgfVxuXG4gICAgbGV0IHRyYWNlciA9IG5ldyBUcmFjZXIoKTtcblxuICAgIHRyYWNlci5zZXRTY2VuZShcbiAgICAgICAgbmV3IFNjZW5lKHtcbiAgICAgICAgICAgIGNhbWVyYTogbmV3IENhbWVyYShcbiAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDAsIDAsIC02OTkpLFxuICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoMCwgMCwgMSksXG4gICAgICAgICAgICAgICAgZGF0YVswXSxcbiAgICAgICAgICAgICAgICBkYXRhWzFdXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbGlnaHRzOiBbXG4gICAgICAgICAgICAgICAgbmV3IFNwaGVyaWNhbExpZ2h0KG5ldyBWZWN0b3IgKDAsIDY0MCwgMCksIDAuNywgNTApXG4gICAgICAgICAgICAgICAgICAgIC5zZXRNYXRlcmlhbChuZXcgTWF0ZXJpYWwoQ29sb3Iud2hpdGUpKSxcbiAgICAgICAgICAgICAgICBuZXcgU3BoZXJpY2FsTGlnaHQobmV3IFZlY3RvciAoMCwgMCwgMCksIDAuNywgMTUwKVxuICAgICAgICAgICAgICAgICAgICAuc2V0TWF0ZXJpYWwobmV3IE1hdGVyaWFsKG5ldyBDb2xvcihuZXcgUkdCQ29sb3IoMjU1LCAyMzUsIDIwMCkpKSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBvYmplY3RzOiBbXG4gICAgICAgICAgICAgICAgLy8gbmV3IFBsYW5lKG5ldyBWZWN0b3IoMCwgMSwgMCksIG5ldyBWZWN0b3IgKDAsIC00MDAsIDApKS5zZXRNYXRlcmlhbChuZXcgTWF0ZXJpYWwoQ29sb3IuZ3JheSwgMCkpLFxuICAgICAgICAgICAgICAgIC8vIGJvdHRvbSBwbGFuZVxuICAgICAgICAgICAgICAgIG5ldyBQb2x5Z29uKFxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKC03MDAsIC03MDAsIC03MDApLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDcwMCwgLTcwMCwgLTcwMCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoNzAwLCAtNzAwLCA3MDApLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKC03MDAsIC03MDAsIDcwMClcbiAgICAgICAgICAgICAgICApLnNldE1hdGVyaWFsKG5ldyBNYXRlcmlhbChDb2xvci53aGl0ZSwgMCkuc2V0TGFtYmVydENvZWZmKDEpKSxcbiAgICAgICAgICAgICAgICAvLyBmcm9udCBwbGFuZVxuICAgICAgICAgICAgICAgIG5ldyBQb2x5Z29uKFxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKC03MDAsIC03MDAsIDcwMCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoNzAwLCAtNzAwLCA3MDApLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDcwMCwgNzAwLCA3MDApLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKC03MDAsIDcwMCwgNzAwKVxuICAgICAgICAgICAgICAgICkuc2V0TWF0ZXJpYWwobmV3IE1hdGVyaWFsKENvbG9yLndoaXRlLCAwKS5zZXRMYW1iZXJ0Q29lZmYoMSkpLFxuICAgICAgICAgICAgICAgIC8vIHRvcCBwbGFuZVxuICAgICAgICAgICAgICAgIG5ldyBQb2x5Z29uKFxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKC03MDAsIDcwMCwgNzAwKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3Rvcig3MDAsIDcwMCwgNzAwKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3Rvcig3MDAsIDcwMCwgLTcwMCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoLTcwMCwgNzAwLCAtNzAwKVxuICAgICAgICAgICAgICAgICkuc2V0TWF0ZXJpYWwobmV3IE1hdGVyaWFsKENvbG9yLndoaXRlLCAwKS5zZXRMYW1iZXJ0Q29lZmYoMSkpLFxuICAgICAgICAgICAgICAgIC8vcmlnaHQgcGxhbmVcbiAgICAgICAgICAgICAgICBuZXcgUG9seWdvbihcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3Rvcig3MDAsIC03MDAsIDcwMCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoNzAwLCAtNzAwLCAtNzAwKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3Rvcig3MDAsIDcwMCwgLTcwMCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoNzAwLCA3MDAsIDcwMClcbiAgICAgICAgICAgICAgICApLnNldE1hdGVyaWFsKG5ldyBNYXRlcmlhbChDb2xvci5ibHVlKS5zZXRMYW1iZXJ0Q29lZmYoMSkpLFxuICAgICAgICAgICAgICAgIC8vbGVmdCBwbGFuZVxuICAgICAgICAgICAgICAgIG5ldyBQb2x5Z29uKFxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKC03MDAsIC03MDAsIC03MDApLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKC03MDAsIC03MDAsIDcwMCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoLTcwMCwgNzAwLCA3MDApLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKC03MDAsIDcwMCwgLTcwMClcbiAgICAgICAgICAgICAgICApLnNldE1hdGVyaWFsKG5ldyBNYXRlcmlhbChDb2xvci5yZWQsIDApLnNldExhbWJlcnRDb2VmZigxKSksXG4gICAgICAgICAgICAgICAgLy8gYmFjayBwbGFuZVxuICAgICAgICAgICAgICAgIG5ldyBQb2x5Z29uKFxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yKDcwMCwgLTcwMCwgLTcwMCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoLTcwMCwgLTcwMCwgLTcwMCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IoLTcwMCwgNzAwLCAtNzAwKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3Rvcig3MDAsIDcwMCwgLTcwMClcbiAgICAgICAgICAgICAgICApLnNldE1hdGVyaWFsKG5ldyBNYXRlcmlhbChDb2xvci5ibGFjaywgMCkuc2V0TGFtYmVydENvZWZmKDEpKSxcbiAgICAgICAgICAgICAgICBuZXcgU3BoZXJlKG5ldyBWZWN0b3IoLTI1MCwgLTUwMCwgNDUwKSwgMjAwKVxuICAgICAgICAgICAgICAgICAgICAuc2V0TWF0ZXJpYWwobmV3IE1hdGVyaWFsKENvbG9yLmJsYWNrLCAxKSksXG4gICAgICAgICAgICAgICAgbmV3IFNwaGVyZShuZXcgVmVjdG9yKDI1MCwgLTUwMCwgNDAwKSwgMjAwKVxuICAgICAgICAgICAgICAgICAgICAuc2V0TWF0ZXJpYWwobmV3IE1hdGVyaWFsKENvbG9yLmdyZWVuLCAwKSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgdHJhY2VyLnJlbmRlcihkYXRhWzBdLCBkYXRhWzFdLCBkYXRhWzJdLCBkYXRhWzNdKTtcbn07Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
