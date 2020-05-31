/* eslint-disable prettier/prettier */
function addZero(val) {
  if (val < 10) {
    return `0${val}`;
  }
  return val;
}

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
    timer.innerHTML = `${addZero(dateNow.getHours())}:${addZero(dateNow.getMinutes())}:${addZero(dateNow.getSeconds())}`;
    setInterval(() => {
      const dateTimer = new Date();
      dateTimer.setHours(dateTimer.getUTCHours() + this.sec / 3600);
      timer.innerHTML = `${addZero(dateTimer.getHours())}:${addZero(dateTimer.getMinutes())}:${addZero(dateTimer.getSeconds())}`;
    }, 1000);
    date.innerHTML = dateNow.toDateString().slice(0, -4);

    this.parent.append(date);
    this.parent.append(timer);
  }
}

export default Timer;
