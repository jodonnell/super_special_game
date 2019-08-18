class SwapperCollider {
  constructor() {
    this.hasTouchedSwapper = {};
  }

  swapPalletIfTouchingSwapper(sprite, swappers) {
    const isTouchingSwapper = CollisionDetector.doesCollideWithSprites(sprite, swappers);
    if (!this.hasTouchedSwapper[sprite.toHash()] && isTouchingSwapper.length > 0) {
      this.hasTouchedSwapper[sprite.toHash()] = true;
      const currentPallet = sprite.pallet;
      sprite.changePalleteTo(isTouchingSwapper[0].pallet);
      isTouchingSwapper[0].pallet = currentPallet;
    } else if (!isTouchingSwapper.length > 0) {
      this.hasTouchedSwapper[sprite.toHash()] = false;
    }
  }

}
