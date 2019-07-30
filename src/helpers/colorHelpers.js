class ColorHelpers {
  static rgbToHex(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }

  static addOpacity(color, opacity) {
    return `${color}${ColorHelpers.rgbToHex(opacity)}`;
  }
}
