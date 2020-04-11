class Constants {
  static getNgrokUrl() {
    return "http://7f3b2849.ngrok.io";
  }

  static getOriginalCameraImageSize() {
    return { width: 1376, height: 1376 };
  }

  static getDisplayImageSize() {
    return { width: 400, height: 400 };
  }

  static getResizedImageCoordinates(originalSize, currentSize, originalCoordinates) {
    let location = {};
    let widthFactor = originalSize.width / currentSize.width;
    let heightFactor = originalSize.height / currentSize.height;
    location.top_left_x = originalCoordinates.y / widthFactor;
    location.top_left_y = originalCoordinates.x / heightFactor;
    location.bottom_right_x = (originalCoordinates.y + originalCoordinates.w) / widthFactor;
    location.bottom_right_y = (originalCoordinates.x + originalCoordinates.h) / heightFactor;

    return location;
  }
}

module.exports = Constants;
