class LevelMark {
  constructor(oss) {
    oss.NextLevel = LevelJacob;
    oss.goal = new Swapper(...tileToWorld(18, 6), images.pallet.yellow);
    for (let row=0; row<15; row++){
	for (let col=0; col<20; col++){
	  var index = row*20+col
	  this.build(oss,index,col,row) 
	}
    }
  }
  build(oss,index,x,y){
    x=x * 8 * PIXEL_SIZE;
    y=y * 8 * PIXEL_SIZE;
    switch(LevelMark.bluePrince[index]){
	case 0: break;
	case 'player':
		oss.startX = x;
		oss.startY = y;		
		oss.player = new Player(x, y, images.img.hero);
	break;
	case 'wall':
		oss.walls.push(new Block(x,y, images.img.brick));
	break;
	case 'break':
		oss.breakwalls.push(new BreakerBlock(x,y));
	break;

    }
  }
  static bluePrince = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall","wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall",0,"player",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","wall","wall","wall","wall",0,0,"break",0,0,0,"break",0,0,0,"break",0,"wall","wall","wall","wall",0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"wall","break",0,0,0,"break",0,0,0,"break",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}
