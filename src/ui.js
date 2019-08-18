class Ui {
  constructor() {
    this.firstColor = document.getElementById('firstColor');
    this.secondColor = document.getElementById('secondColor');
    this.time = document.getElementById('time');
    this.scoreboardDiv = document.getElementById('scoreboard');
    this.scoreboard = new Scoreboard();
  }

  async getScores(level) {
    const results = await this.scoreboard.getTimes(level);
    this.scoreboardDiv.innerHTML = '';
    results.map((score) => {
      let node = document.createElement("DIV");
      var textnode = document.createTextNode(`${score.name} - ${Number(score.time).toFixed(2)}`);
      node.appendChild(textnode);
      this.scoreboardDiv.appendChild(node);
    });
  }

  postTime(level, time) {
    this.scoreboard.postTime(level, time);
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

  isFirstColorPrimary() {
    return this.firstColor.classList.contains('primary');
  }
}
