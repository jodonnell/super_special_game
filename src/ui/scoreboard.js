class Scoreboard {
  constructor() {
    this.cache = {};
    this.name = document.querySelector("#name input");
    this.name.addEventListener(
      "change",
      function() {
        localStorage.setItem("name", this.value);
      },
      false
    );

    const name = localStorage.getItem("name");
    if (name) {
      this.name.value = name;
    }
  }

  async getTimes(level) {
    const result = await fetch(`https://super-special-game.herokuapp.com/scores?level=${level}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    const json = await result.json();
    this.cache[level] = json.results;
    return json.results;
  }

  postTime(level, time) {
    if (!this.name.value) return;

    const times = this.cache[level];
    const isLessThanTenScores = times.length < 10;
    const isTopTenScore = times.length > 0 && time < Number(times[times.length - 1].time);
    const isHighScore = isTopTenScore || isLessThanTenScores;
    if (!isHighScore) return;

    return fetch("https://super-special-game.herokuapp.com/scores", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: this.name.value, level, time })
    });
  }
}
