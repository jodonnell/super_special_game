class Scoreboard {
  constructor() {
    this.name = document.querySelector('#name input');
    this.name.addEventListener(
      'change',
      function() {
        localStorage.setItem('name', this.value);
      },
      false
    );

    const name = localStorage.getItem('name');
    if (name) {
      this.name.value = name;
    }

  }

  getTimes(level) {
    return fetch(`https://super-special-game.herokuapp.com/scores?level=${level}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  }

  postTime(level, time) {
    if (!this.name.value)
      return;

    return fetch('https://super-special-game.herokuapp.com/scores', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: this.name.value, level, time })
    });

  }
}
