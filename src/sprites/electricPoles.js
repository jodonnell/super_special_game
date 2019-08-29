
class Beam{
  constructor(x,y,w=40){
    this.x = x;
    this.y = y;
    this.scale = 4;
    this.w = Math.floor(w / this.scale);
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

    this.beams = [];
    for (let i = 0; i < this.poles.length - 1; i++) {
      const width = this.poles[i + 1].dimensions.rightSide() - this.poles[i].x;
      this.beams.push(new Beam(this.poles[i].x + 8, this.poles[i].y, width - 4));
    }
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
    this.beams.forEach(beam => beam.draw());
  }
}
