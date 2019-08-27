class RectDimensions {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
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
