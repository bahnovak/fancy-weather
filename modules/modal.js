export default class Modal {
  constructor(parent, mistakes = 0) {
    this.parent = parent;
    this.mistakes = mistakes;
  }

  create() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    return this;
  }

  win() {
    const img = document.createElement('img');
    img.src = './img/winner.png';
    this.modal.innerHTML += 'Congratulations! Mistakes: 0';
    this.modal.append(img);
    this.parent.append(this.modal);
    const audio = new Audio('audio/winner.mp3');
    audio.play();
  }

  loss() {
    const img = document.createElement('img');
    img.src = './img/loss.png';
    this.modal.innerHTML += `Mistakes: ${this.mistakes}`;
    this.modal.append(img);
    this.parent.append(this.modal);
    const audio = new Audio('audio/loss.mp3');
    audio.play();
  }

  clear() {
    this.modal.remove();
  }
}
