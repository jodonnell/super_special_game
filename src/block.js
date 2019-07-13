class Block extends Sprite {
  constructor(x, y, sprite) {
    super();
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.sprite = sprite;
    this.currentFrame = this.sprite[this.frame];
  }

  update() {}
}
