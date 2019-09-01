
class Beam{
  constructor(x,y,w=TILE_SIZE){
    this.x = x;
    this.y = y;
    this.scale = PX_SMALL;
    this.w = Math.floor(w/this.scale);
  }

  draw(){
    ctx.fillStyle = 'white'
    ctx.fillRect(this.x,this.y,this.w*2,this.scale);
    this.arc('blue',5);
    this.arc('cyan',1);
  }
  arc(color,entropy){
    ctx.fillStyle = color;
    const width = this.w/2;
    const start = MathHelpers.randomRange(-2,2) * this.scale
    var offset = 0
    for(let i=0; i<width; i++){
      this.block(this.x+i*this.scale,this.y+start+offset,2);
      this.block(this.x+(width*2-i-1)*this.scale,this.y+start+offset,2);
      if(i%entropy == 0) offset += MathHelpers.randomRange(-1,1) * this.scale;
    }
  }
  block(x,y,w=1,h=1){
    ctx.fillRect(x,y,w*this.scale,h*this.scale)
  }
}

class ElectricPoles {
  constructor(poles, speed) {
    this.poles = poles;
    this.speed = speed;
    this.counter = 0;
    this.burst = false;
    this.sparks = [];
    this.beams = [];
    for (let i = 0; i < this.poles.length - 1; i++) {
      const width = this.poles[i + 1].dimensions.x - this.poles[i].x;
      this.beams.push(new Beam(this.poles[i].x + 8, this.poles[i].y,width));
      this.sparks.push(new Sparks(this.poles[i].x,this.poles[i].y,3))
      this.sparks.push(new Sparks(this.poles[i+1].x,this.poles[i+1].y,3))
    }

    this.collisionBounds = new CollisionBoundsRect(this);
    this.dimensions = new RectDimensions(
      this.poles[0].x+TILE_SIZE/2,
      this.poles[0].y,
      this.poles[1].dimensions.rightSide() - this.poles[0].x-TILE_SIZE,
      PX_SMALL
    );
  }

  update() {
    this.sparks.forEach(spark => spark.update())
    this.counter++;
    if (this.counter < this.speed)
      return;

    this.counter = 0;
    this.burst = !this.burst;
    this.sparks.forEach(spark => spark.dead = !spark.dead)
  }

  draw(pallet) {
    this.poles.forEach(pole => pole.draw(pallet));
    this.sparks.forEach(spark => spark.draw())
    if (this.burst)
      this.drawBurst();
  }

  drawBurst() {
    this.beams.forEach(beam => beam.draw());
  }
}
