class RectDimensions {
  constructor(width, height) {
    this.w = width;
    this.h = height;
    this.x = 0;
    this.y = 0;
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
  }

  width() {
    return this.w;
  }

  height() {
    return this.h;
  }

  rightSide() {
    return this.x + this.width();
  }

  bottomSide() {
    return this.y + this.height();
  }
}
