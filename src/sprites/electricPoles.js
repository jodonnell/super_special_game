
class Beam{
  constructor(x,y,w=40){
    this.x=x;this.y=y,this.w=w;
    this.scale = 5;
  }

  draw(){
    this.block('white',this.x,this.y,this.w);
    this.arc('blue',5);
    this.arc('cyan',1);
  }
  arc(color,entropy){
    const width = this.w/2;
    const start = MathHelpers.randomRange(-2,2) * this.scale
    var offset = 0
    for(let i=0; i<width; i++){
      this.block(color,this.x+i*this.scale,this.y+start+offset,1);
      this.block(color,this.x+(width*2-i-1)*this.scale,this.y+start+offset,1);
      if(i%entropy == 0) offset += MathHelpers.randomRange(-1,1) * this.scale;
    }
  }
  block(color,x,y,w,h=1){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w*this.scale,h*this.scale)
  }
}

class ElectricPoles {
  constructor(poles, speed) {
    this.poles = poles;
    this.speed = speed;
    this.counter = 0;
    this.burst = false;
    const width = Math.floor((this.poles[1].dimensions.rightSide() - this.poles[0].x) / 5);
    this.beam = new Beam(this.poles[0].x + 8, this.poles[0].y, width - 4);
  }

  update() {
    this.counter++;
    if (this.counter < this.speed)
      return;

    this.counter = 0;
    this.burst = !this.burst;
  }

  draw(pallet) {
    this.poles.forEach(pole => pole.draw(pallet));

    if (this.burst)
      this.drawBurst();
  }

  drawBurst() {
    this.beam.draw();
  }
}
