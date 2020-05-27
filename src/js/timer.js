class Timer {
  constructor(lang, parent, sec) {
    this.lang = lang;
    this.parent = parent;
    this.sec = sec;
  }

  getDate() {
    const dateNow = new Date();
    dateNow.setHours(dateNow.getUTCHours() + this.sec / 3600);
    const date = document.createElement('div');
    date.classList.add('date');
    const timer = document.createElement('div');
    timer.classList.add('timer');
    setInterval(() => {
      const dateTimer = new Date();
      dateTimer.setHours(dateTimer.getUTCHours() + this.sec / 3600);
      timer.innerHTML = `${dateTimer.getHours()}:${dateTimer.getMinutes()}:${dateTimer.getSeconds()}`;
    }, 1000);
    date.innerHTML = dateNow.toDateString().slice(0, -4);

    this.parent.append(date);
    this.parent.append(timer);
  }
}

export default Timer;
