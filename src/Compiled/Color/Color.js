var FloatColor_1=require("./FloatColor"),Color=function(){function o(o){this.red=o.red,this.green=o.green,this.blue=o.blue}return o.prototype.add=function(e){return new o(new FloatColor_1.FloatColor(this.red+e.red,this.green+e.green,this.blue+e.blue))},o.prototype.substract=function(e){return new o(new FloatColor_1.FloatColor(this.red-e.red,this.green-e.green,this.blue-e.blue))},o.prototype.scaled=function(e){return new o(new FloatColor_1.FloatColor(this.red*e,this.green*e,this.blue*e))},o.prototype.multiple=function(e){return new o(new FloatColor_1.FloatColor(this.red*e.red,this.green*e.green,this.blue*e.blue))},o.prototype.divide=function(e){return new o(new FloatColor_1.FloatColor(this.red/e,this.green/e,this.blue/e))},o.sRGBEncode=function(o){return.0031308>=o?12.92*o:1.055*Math.pow(o,.4166667)-.055},o.toRGB=function(e){return{red:Math.floor(255*o.clampColor(e.red)),green:Math.floor(255*o.clampColor(e.green)),blue:Math.floor(255*o.clampColor(e.blue))}},o.clampColor=function(o){return o>1?1:o},o}();exports.Color=Color;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbG9yL0NvbG9yLnRzIl0sIm5hbWVzIjpbIkZsb2F0Q29sb3JfMSIsInJlcXVpcmUiLCJDb2xvciIsIkNvbG9yLmNvbnN0cnVjdG9yIiwiQ29sb3IuYWRkIiwiQ29sb3Iuc3Vic3RyYWN0IiwiQ29sb3Iuc2NhbGVkIiwiQ29sb3IubXVsdGlwbGUiLCJDb2xvci5kaXZpZGUiLCJDb2xvci5zUkdCRW5jb2RlIiwiQ29sb3IudG9SR0IiLCJDb2xvci5jbGFtcENvbG9yIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQ0EsR0FBQUEsY0FBQUMsUUFBMkIsZ0JBRTNCQyxNQUFBLFdBS0lBLFFBQUFBLEdBQWFBLEdBQ1RDLEtBQUtBLElBQU1BLEVBQU1BLElBQ2pCQSxLQUFLQSxNQUFRQSxFQUFNQSxNQUNuQkEsS0FBS0EsS0FBT0EsRUFBTUEsS0F3RTFCRCxNQXJFV0EsR0FBQUEsVUFBQUEsSUFBUEEsU0FBWUEsR0FDUkUsTUFBT0EsSUFBSUEsR0FDUEEsR0FBSUEsY0FBQUEsV0FDQUEsS0FBS0EsSUFBTUEsRUFBTUEsSUFDakJBLEtBQUtBLE1BQVFBLEVBQU1BLE1BQ25CQSxLQUFLQSxLQUFPQSxFQUFNQSxRQUt2QkYsRUFBQUEsVUFBQUEsVUFBUEEsU0FBa0JBLEdBQ2RHLE1BQU9BLElBQUlBLEdBQ1BBLEdBQUlBLGNBQUFBLFdBQ0FBLEtBQUtBLElBQU1BLEVBQU1BLElBQ2pCQSxLQUFLQSxNQUFRQSxFQUFNQSxNQUNuQkEsS0FBS0EsS0FBT0EsRUFBTUEsUUFLdkJILEVBQUFBLFVBQUFBLE9BQVBBLFNBQWVBLEdBQ1hJLE1BQU9BLElBQUlBLEdBQ1BBLEdBQUlBLGNBQUFBLFdBQ0FBLEtBQUtBLElBQU1BLEVBQ1hBLEtBQUtBLE1BQVFBLEVBQ2JBLEtBQUtBLEtBQU9BLEtBS2pCSixFQUFBQSxVQUFBQSxTQUFQQSxTQUFpQkEsR0FDYkssTUFBT0EsSUFBSUEsR0FDUEEsR0FBSUEsY0FBQUEsV0FDQUEsS0FBS0EsSUFBTUEsRUFBTUEsSUFDakJBLEtBQUtBLE1BQVFBLEVBQU1BLE1BQ25CQSxLQUFLQSxLQUFPQSxFQUFNQSxRQUt2QkwsRUFBQUEsVUFBQUEsT0FBUEEsU0FBZUEsR0FDWE0sTUFBT0EsSUFBSUEsR0FDUEEsR0FBSUEsY0FBQUEsV0FDQUEsS0FBS0EsSUFBTUEsRUFDWEEsS0FBS0EsTUFBUUEsRUFDYkEsS0FBS0EsS0FBT0EsS0FLVk4sRUFBQUEsV0FBZEEsU0FBMEJBLEdBQ3RCTyxNQUFhQSxVQUFUQSxFQUNPQSxNQUFRQSxFQUVSQSxNQUFTQSxLQUFBQSxJQUFBQSxFQUFTQSxVQUFhQSxNQUloQ1AsRUFBQUEsTUFBZEEsU0FBcUJBLEdBQ2pCUSxPQUNJQSxJQUFLQSxLQUFLQSxNQUFvQ0EsSUFBOUJBLEVBQU1BLFdBQVdBLEVBQU1BLE1BQ3ZDQSxNQUFPQSxLQUFLQSxNQUFzQ0EsSUFBaENBLEVBQU1BLFdBQVdBLEVBQU1BLFFBQ3pDQSxLQUFNQSxLQUFLQSxNQUFxQ0EsSUFBL0JBLEVBQU1BLFdBQVdBLEVBQU1BLFNBSWpDUixFQUFBQSxXQUFmQSxTQUEyQkEsR0FDdkJTLE1BQU9BLEdBQVFBLEVBQUlBLEVBQUlBLEdBRS9CVCxJQWhGYVUsU0FBQVYsTUFBS0EiLCJmaWxlIjoiQ29sb3IvQ29sb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSR0JDb2xvciB9IGZyb20gXCIuL1JHQkNvbG9yXCI7XG5pbXBvcnQgeyBGbG9hdENvbG9yIH0gZnJvbSBcIi4vRmxvYXRDb2xvclwiO1xuXG5leHBvcnQgY2xhc3MgQ29sb3Ige1xuICAgIHJlZDogbnVtYmVyO1xuICAgIGdyZWVuOiBudW1iZXI7XG4gICAgYmx1ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IgKGNvbG9yOiBSR0JDb2xvcnxGbG9hdENvbG9yKSB7XG4gICAgICAgIHRoaXMucmVkID0gY29sb3IucmVkO1xuICAgICAgICB0aGlzLmdyZWVuID0gY29sb3IuZ3JlZW47XG4gICAgICAgIHRoaXMuYmx1ZSA9IGNvbG9yLmJsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZCAoY29sb3I6IENvbG9yKTogQ29sb3Ige1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yKFxuICAgICAgICAgICAgbmV3IEZsb2F0Q29sb3IoXG4gICAgICAgICAgICAgICAgdGhpcy5yZWQgKyBjb2xvci5yZWQsXG4gICAgICAgICAgICAgICAgdGhpcy5ncmVlbiArIGNvbG9yLmdyZWVuLFxuICAgICAgICAgICAgICAgIHRoaXMuYmx1ZSArIGNvbG9yLmJsdWVcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3Vic3RyYWN0IChjb2xvcjogQ29sb3IpOiBDb2xvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoXG4gICAgICAgICAgICBuZXcgRmxvYXRDb2xvcihcbiAgICAgICAgICAgICAgICB0aGlzLnJlZCAtIGNvbG9yLnJlZCxcbiAgICAgICAgICAgICAgICB0aGlzLmdyZWVuIC0gY29sb3IuZ3JlZW4sXG4gICAgICAgICAgICAgICAgdGhpcy5ibHVlIC0gY29sb3IuYmx1ZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzY2FsZWQgKG11bHRpcGxpZXI6IG51bWJlcik6IENvbG9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihcbiAgICAgICAgICAgIG5ldyBGbG9hdENvbG9yKFxuICAgICAgICAgICAgICAgIHRoaXMucmVkICogbXVsdGlwbGllcixcbiAgICAgICAgICAgICAgICB0aGlzLmdyZWVuICogbXVsdGlwbGllcixcbiAgICAgICAgICAgICAgICB0aGlzLmJsdWUgKiBtdWx0aXBsaWVyXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG11bHRpcGxlIChjb2xvcjogQ29sb3IpOiBDb2xvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoXG4gICAgICAgICAgICBuZXcgRmxvYXRDb2xvcihcbiAgICAgICAgICAgICAgICB0aGlzLnJlZCAqIGNvbG9yLnJlZCxcbiAgICAgICAgICAgICAgICB0aGlzLmdyZWVuICogY29sb3IuZ3JlZW4sXG4gICAgICAgICAgICAgICAgdGhpcy5ibHVlICogY29sb3IuYmx1ZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXZpZGUgKHZhbHVlOiBudW1iZXIpOiBDb2xvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoXG4gICAgICAgICAgICBuZXcgRmxvYXRDb2xvcihcbiAgICAgICAgICAgICAgICB0aGlzLnJlZCAvIHZhbHVlLFxuICAgICAgICAgICAgICAgIHRoaXMuZ3JlZW4gLyB2YWx1ZSxcbiAgICAgICAgICAgICAgICB0aGlzLmJsdWUgLyB2YWx1ZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc1JHQkVuY29kZSAoY29sb3I6IG51bWJlcikge1xuICAgICAgICBpZiAoY29sb3IgPD0gMC4wMDMxMzA4KSB7XG4gICAgICAgICAgICByZXR1cm4gMTIuOTIgKiBjb2xvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAxLjA1NSAqIChjb2xvciAqKiAwLjQxNjY2NjcpIC0gMC4wNTU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHRvUkdCIChjb2xvcjogQ29sb3IpOiB7cmVkOiBudW1iZXIsIGdyZWVuOiBudW1iZXIsIGJsdWU6IG51bWJlcn0ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVkOiBNYXRoLmZsb29yKENvbG9yLmNsYW1wQ29sb3IoY29sb3IucmVkKSAqIDI1NSksXG4gICAgICAgICAgICBncmVlbjogTWF0aC5mbG9vcihDb2xvci5jbGFtcENvbG9yKGNvbG9yLmdyZWVuKSAqIDI1NSksXG4gICAgICAgICAgICBibHVlOiBNYXRoLmZsb29yKENvbG9yLmNsYW1wQ29sb3IoY29sb3IuYmx1ZSkgKiAyNTUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjbGFtcENvbG9yIChjb2xvcjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yID4gMSA/IDEgOiBjb2xvcjtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=