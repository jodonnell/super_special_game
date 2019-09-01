class Particle{
  constructor(x,y,xspd=0, yspd=0,alpha=1,color='white',w=1){
	this.alpha = alpha;
	this.x=x;
	this.y=y;
	this.w=w*PIXEL_SIZE;
	this.xSpeed=xspd;
	this.ySpeed=yspd;
	this.color = color;
  }
  draw(){
	ctx.save()
	ctx.globalAlpha = this.alpha
	ctx.fillStyle = this.color
	ctx.fillRect(this.x,this.y,this.w,this.w)
	ctx.restore()
  }
  updatePos(){
	this.x += this.xSpeed; 
	this.y += this.ySpeed;
  }
}

class Sparks{
  constructor(x,y,count){
	this.x=x; this.y=y;
	this.dead = true;
	this.count = count;
	this.particles = [];
	this.makeParticles();
  }
  update(){
	var grav = .2, maxgrav = 4;
	this.particles.forEach( particle => {
		if (particle.alpha <= 0) {
			if(!this.dead) this.resetParticle(particle);
		}else {
			particle.alpha = Math.max(particle.alpha -.05,0);
			particle.xSpeed = MathHelpers.toZero(particle.xSpeed,.2);
			particle.ySpeed = Math.min(particle.ySpeed+grav,maxgrav);		
			particle.updatePos();
		}
	})
  }
  draw(){
	this.particles.forEach( particle => particle.draw())

  }
  makeParticles(){
	for(let i=0; i<this.count; i++){
	  this.particles.push(
		new Particle(
		  this.x,
		  this.y,
		  this.setxSpeed(),
	  	  this.setySpeed(),
	  	  0)
	  )
	}
  }
  resetParticle(particle){
	particle.alpha = Math.random()+1
	particle.x = this.x;
	particle.y = this.y;
	particle.xSpeed = this.setxSpeed()
	particle.ySpeed = this.setySpeed()
	
  }
  setxSpeed(){
	return MathHelpers.randomRange(-4,4);
  }
  setySpeed(){
	return -MathHelpers.randomRange(1,3);
  }
}