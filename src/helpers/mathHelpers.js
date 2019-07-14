class MathHelpers {
  static clamp(n, min, max) {
    return Math.max(min, Math.min(n, max));
  }

  static toZero(number, decay) {
    if (number == 0) return 0;
    const sign = Math.sign(number);
    number = Math.abs(number);
    number = Math.max(number - decay, 0);
    return number * sign;
  }

  static randomInt(n) {
    return Math.floor(Math.random() * (n + 1));
  }
}
