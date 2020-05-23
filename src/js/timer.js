const options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
};

const optionsTime = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

class Timer {
  constructor(lang, parent) {
    this.lang = lang;
    this.parent = parent;
  }

  getDate() {
    const date = document.createElement('div');
    date.classList.add('date');
    const timer = document.createElement('div');
    timer.classList.add('timer');
    setInterval(() => {
      timer.innerHTML = new Date().toLocaleString('ru', optionsTime);
    }, 1000);
    date.innerHTML = new Date().toLocaleString(this.lang, options);

    this.parent.append(date);
    this.parent.append(timer);
  }
}

export default Timer;
