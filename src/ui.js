class Ui {
  constructor() {
    this.firstColor = document.getElementById('firstColor');
    this.secondColor = document.getElementById('secondColor');
    this.time = document.getElementById('time');
  }

  update(numSeconds) {
    this.time.innerHTML = numSeconds.toFixed(2);
  }

  makeSecondColorPrimary() {
    this.firstColor.classList.remove('primary');
    this.secondColor.classList.add('primary');
  }

  makeFirstColorPrimary() {
    this.firstColor.classList.add('primary');
    this.secondColor.classList.remove('primary');
  }

}
