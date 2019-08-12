class InputControl {
  constructor() {
    this.left = 0;
    this.right = 0;
    this.down = 0;
    this.up = 0;
    this.x = 0;
    this.z = 0;
    this.zTapped = false;
    this.zReleased = true;
    this.getKey();
    this.canJump = true;
    this.die = false;
  }

  checkJoypad () {
    const controller = navigator.getGamepads()[0];
    if (!controller)
      return;

    controller.buttons.forEach((button, i) => {
      const pressed = button.pressed;

      if (pressed && i === 0) {
        this.pressX();
      } else if (!pressed && i === 0) {
        this.releaseX();
      }

      if (pressed && i === 15) {
        this.pressRight();
      } else if (!pressed && i === 15) {
        this.releaseRight();
      }

      if (pressed && i === 14) {
        this.pressLeft();
      } else if (!pressed && i === 14) {
        this.releaseLeft();
      }

      if (pressed && i === 2) {
        this.pressZ();
      } else if (!pressed && i === 2) {
        this.releaseZ();
      }

      if (pressed && i === 3) {
        this.die();
      }
    });

    controller.axes.forEach((inputRange, i) => {
      if (inputRange > 0.2 && i === 0) {
        this.releaseLeft();
        this.pressRight();
      } else if (inputRange < -0.2 && i === 0) {
        this.releaseRight();
        this.pressLeft();
      }
    });
  }

  get LEFT_KEY() {
    return 37;
  }

  get RIGHT_KEY() {
    return 39;
  }

  get UP_KEY() {
    return 38;
  }

  get DOWN_KEY() {
    return 40;
  }

  get Z_KEY() {
    return 90;
  }

  get DVORAK_Z_KEY() {
    return 186;
  }

  get DVORAK_Z_KEY_FIREFOX() {
    return 59;
  }

  get X_KEY() {
    return 88;
  }

  get DVORAK_X_KEY() {
    return 81;
  }

  getKey() {
    document.addEventListener(
      "touchstart",
      e => {
        e.preventDefault();
        let touch = e.touches[0];

        if (touch.pageX >= window.innerWidth / 2 && touch.pageY > window.innerHeight * 0.8) {
          this.pressZ();
        } else if (touch.pageX < window.innerWidth / 2 && touch.pageY > window.innerHeight * 0.8) {
          this.pressX();
        } else if (touch.pageX < window.innerWidth / 2) {
          this.pressLeft();
        } else if (touch.pageX >= window.innerWidth / 2) {
          this.pressRight();
        }
      },
      false
    );

    let touchEnd = e => {
      e.preventDefault();

      this.releaseLeft();
      this.releaseRight();
      this.releaseZ();
      this.releaseX();
    };

    document.addEventListener("touchend", touchEnd, false);
    document.addEventListener("touchcancel", touchEnd, false);

    let keydown = event => {
      switch (event.which) {
        case this.LEFT_KEY:
          this.pressLeft();
          break;
        case this.RIGHT_KEY:
          this.pressRight();
          break;
        case this.UP_KEY:
          this.pressUp();
          break;
        case this.DOWN_KEY:
          this.pressDown();
          break;
        case this.Z_KEY:
          this.pressZ();
          break;
        case this.DVORAK_Z_KEY:
          this.pressZ();
          break;
        case this.DVORAK_Z_KEY_FIREFOX:
          this.pressZ();
          break;
        case this.X_KEY:
          this.pressX();
          break;
        case this.DVORAK_X_KEY:
          this.pressX();
          break;
      }
    };

    let keyup = event => {
      switch (event.which) {
        case this.LEFT_KEY:
          this.releaseLeft();
          break;
        case this.RIGHT_KEY:
          this.releaseRight();
          break;
        case this.DOWN_KEY:
          this.releaseDown();
          break;
        case this.UP_KEY:
          this.releaseUp();
          break;
        case this.Z_KEY:
          this.releaseZ();
          break;
        case this.DVORAK_Z_KEY:
          this.releaseZ();
          break;
        case this.DVORAK_Z_KEY_FIREFOX:
          this.releaseZ();
          break;
        case this.X_KEY:
          this.releaseX();
          break;
        case this.DVORAK_X_KEY:
          this.releaseX();
          break;
      }
    };

    document.addEventListener("keydown", keydown, false);
    document.addEventListener("keyup", keyup, false);
  }

  pressLeft() {
    this.left = 1;
  }

  pressRight() {
    this.right = 1;
  }

  pressUp() {
    this.up = 1;
  }

  pressDown() {
    this.down = 1;
  }

  pressZ() {
    this.z = 1;
    if (this.zReleased) {
      this.zTapped = true;
      this.zReleased = false;
    }
  }

  hasZBeenTapped() {
    const beenTapped = this.zTapped;
    this.zTapped = false;
    return beenTapped;
  }

  pressX() {
    if (this.canJump) {
      this.x = 1;
    }
  }

  releaseLeft() {
    this.left = 0;
  }

  releaseRight() {
    this.right = 0;
  }

  releaseDown() {
    this.down = 0;
  }

  releaseUp() {
    this.up = 0;
  }

  die() {
    this.die = true;
  }

  releaseZ() {
    this.z = 0;
    this.zTapped = false;
    this.zReleased = true;
  }

  releaseX() {
    this.x = 0;
    this.canJump = true;
  }
}
