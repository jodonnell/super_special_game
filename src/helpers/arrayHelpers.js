class ArrayHelpers {
  static range(num) {
    return [...Array(Math.floor(num)).keys()];
  }
}
