export default class CreateStars {
  constructor(parent) {
    this.parent = parent;
    this.lineStar = document.createElement('div');
    this.lineStar.classList.add('lineStar');
    this.parent.appendChild(this.lineStar);
  }

  addTrue() {
    const starWin = document.createElement('img');
    starWin.src = './img/star-win.svg';
    this.lineStar.prepend(starWin);
  }

  addFalse() {
    const star = document.createElement('img');
    star.src = './img/star.svg';
    this.lineStar.prepend(star);
  }

  clear() {
    this.lineStar.remove();
  }
}
