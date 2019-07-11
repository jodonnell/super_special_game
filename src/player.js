class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.verticalSpeed = 0;
    this.xSpeed = 0;
  }

  update(control, walls) {
    this.updateX(control, walls);
    this.updateY(control, walls);
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  rightSide() {
    return this.x + 20;
  }

  bottomSide() {
    return this.y + 20;
  }

  updateX(control, walls) {
    const speedmax = 4;
    const vel = 0.4;
    const horizontal = control.right - control.left;
    this.xSpeed = clamp(this.xSpeed + vel * horizontal, -speedmax, speedmax);
    if (!horizontal) this.xSpeed = toZero(this.xSpeed,1);
   
    if (CollisionDetector.doesCollideWithSprites(Math.floor(this.xSpeed),0,this, walls)) {
      while (!CollisionDetector.doesCollideWithSprites(horizontal,0,this, walls)){
	this.x += horizontal
	}
      this.xSpeed=0
    }
    this.x += Math.floor(this.xSpeed);
  }

  updateY(control, walls) {
    const gravity = 0.5;
    const speedMax = 10;
    this.verticalSpeed = Math.min(this.verticalSpeed + gravity, speedMax);
   
    if (CollisionDetector.doesCollideWithSprites(0,Math.floor(this.verticalSpeed),this, walls)) {
      const ydir = Math.sign(this.verticalSpeed)
      while(!CollisionDetector.doesCollideWithSprites(0,ydir,this, walls)){
	this.y += ydir
	}
      this.verticalSpeed = 0;
    }
    this.y += Math.floor(this.verticalSpeed);	
    if (this.y >= canvas.height - 64 && control.x) this.verticalSpeed = -10;
    if (this.verticalSpeed < -5 && !control.x) this.verticalSpeed = -4 
  }


}
