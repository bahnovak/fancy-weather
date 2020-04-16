/* eslint-disable import/extensions */
import cards from './modules/cardsCollect.js';
import * as createObj from './modules/createCategory.js';
import createMenu from './modules/menu.js';
import createTrainButton from './modules/createTrainModeButton.js';
import CreateStars from './modules/starsDiv.js';
import Modal from './modules/modal.js';

const body = document.querySelector('body');
const category = document.createElement('div');
const cardParang = document.createElement('div');

createMenu(body, cards);
category.classList.add('category');
cardParang.classList.add('cardParang');

createObj.createCategory(body, cards);
createObj.createCardCategory(category, cards);

body.appendChild(category);
createTrainButton(body);

const collection = document.querySelectorAll('.collection');
const cardCategory = document.querySelectorAll('.cardCategory');
const imgCategory = document.querySelectorAll('.imgCategory');
const nav = document.querySelectorAll('.nav');
const navigation = document.querySelector('.navigation');
const icon = document.querySelectorAll('.icon');
const burger = document.querySelector('.burger');
const toggle = document.querySelector('.l');
const word = document.querySelectorAll('.word');
const img = document.querySelectorAll('.img');
const card = document.querySelectorAll('.card');
const trainButton = document.querySelector('.trainButton');
const repeatButton = document.querySelector('.repeatButton');

document.addEventListener('mousedown', (e) => e.preventDefault());

const state = {
  position: 0,
  train: 0,
  play: 0,

  reset() {
    this.position = 0;
    this.train = 0;
    this.play = 0;
    this.elemVisible();
  },
  elemVisible() {
    function reset(arr) {
      arr.forEach((e) => { e.style.display = 'none'; });
      category.style.display = 'none';
    }

    function home() {
      category.style.display = 'flex';
    }
    if (this.position === 0) {
      category.style.display = 'flex';
    }
    document.addEventListener('click', (event) => {
      if (!((event.target === burger) || (event.target === navigation))) {
        navigation.style.transform = 'translateX(-100%)';
      }

      cardCategory.forEach((e, i) => {
        if (e === event.target || event.target === imgCategory[i]) {
          navigation.style.transform = 'translateX(-100%)';
          collection[i].style.display = 'flex';
          category.style.display = 'none';
          this.position = i + 1;
        }
      });

      nav.forEach((e, i) => {
        if (e === event.target || event.target === icon[i]) {
          navigation.style.transform = 'translateX(-100%)';
          if (i === 0) {
            reset(collection);
            home();
            this.position = 0;
          } else {
            reset(collection);
            collection[i - 1].style.display = 'flex';
            this.position = i;
          }
        }

        e.classList.remove('navActive');
      });

      nav[this.position].classList.add('navActive');
    });
  },

  trainMode() {
    function getPositionInCard(i, pos) {
      let position = i;
      if (i >= 8) {
        position = (i % ((pos - 1) * 8));
      }
      return position;
    }
    function getPosition(i, pos) {
      return (pos - 1) * 8 + i;
    }
    function audioPlay(i, position) {
      const audio = new Audio(cards[position][getPositionInCard(i, position)].audioSrc);
      audio.play();
      return audio;
    }
    function playGame(pos, context, arr = [0, 1, 2, 3, 4, 5, 6, 7]) {
      const createStars = new CreateStars(body);
      createStars.createLine();
      const position = pos;
      let mistakes = 0;
      let array = arr;
      function check() {
        if (array.length === 0) {
          if (mistakes === 0) {
            const modalWin = new Modal(body, mistakes);
            modalWin.create().win();
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          } else if (mistakes !== 0) {
            const modalLoss = new Modal(body, mistakes);
            modalLoss.create().loss();
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }
      }
      function shuffle(arrayShuffle) {
        const arrayS = arrayShuffle;
        let j;
        let temp;
        for (let i = arrayShuffle.length - 1; i > 0; i -= 1) {
          j = Math.floor(Math.random() * (i + 1));
          temp = arrayShuffle[j];
          arrayS[j] = arrayShuffle[i];
          arrayS[i] = temp;
        }
        return arrayS;
      }
      if (array.length === 8) {
        array = shuffle(array);
      }

      if (array.length !== 8) {
        return;
      }
      audioPlay(array[0], position);
      function eventRepeat() {
        audioPlay(array[0], position);
      }
      repeatButton.addEventListener('click', eventRepeat);
      function eventPlay(event) {
        event.stopPropagation();
        if (event.target === img[getPosition(array[0], position)]) {
          createStars.addTrue();
          const audio = new Audio('./audio/correct.mp3');
          card[getPosition(array[0], position)].classList.add('cardParang');
          audio.play();
          array.shift();
          check();
          setTimeout(() => { audioPlay(array[0], position); }, 300);
        } else {
          for (let i = 1; i < array.length; i += 1) {
            if (event.target === img[getPosition(array[i], position)]) {
              mistakes += 1;
              createStars.addFalse();
              const audio = new Audio('./audio/error.mp3');
              audio.play();
            }
          }
        }
      }
      document.addEventListener('click', eventPlay);
      document.addEventListener('click', (event) => {
        if (event.target === toggle) {
          document.removeEventListener('click', eventPlay);
          repeatButton.removeEventListener('click', eventRepeat);
          card.forEach((elem) => {
            elem.classList.remove('cardParang');
          });
          createStars.clear();
        }
        nav.forEach((e) => {
          if (e === event.target) {
            document.removeEventListener('click', eventPlay);
            repeatButton.removeEventListener('click', eventRepeat);
            card.forEach((elem) => {
              elem.classList.remove('cardParang');
            });
            createStars.clear();
          }
        });
      });
    }
    document.addEventListener('click', (event) => {
      if (event.target === toggle) {
        if (this.train === 1) {
          trainButton.style.display = '';
          repeatButton.style.display = '';
          this.train = 0;
        } else if (this.train === 0) {
          this.train = 1;
        }
      }

      if (this.train === 1) {
        word.forEach((e) => {
          e.style.visibility = 'hidden';
        });
        card.forEach((e) => {
          e.style.overflow = 'hidden';
        });
        img.forEach((e) => {
          e.style.width = '360px';
          e.style.height = '100%';
          e.style.transform = 'translateX(-7%)';
        });

        trainButton.style.visibility = 'visible';
        trainButton.style.opacity = '100';
        body.classList.add('trainModeColor');

        nav.forEach((e) => {
          if (event.target === e) {
            this.play = 0;
          }
        });

        if (this.play === 0) {
          trainButton.style.display = '';
          repeatButton.style.display = 'none';
        }
      }

      if (this.train === 0) {
        this.play = 0;

        word.forEach((e) => {
          e.style.visibility = '';
        });
        img.forEach((e, i) => {
          if (event.target === e) e.addEventListener('click', audioPlay(i, this.position));
          e.style.width = '';
          e.style.height = '';
          e.style.transform = '';
        });

        trainButton.style.opacity = '0';
        setTimeout(trainButton.style.visibility = '', 0);
        body.classList.remove('trainModeColor');
      }
    });
    trainButton.addEventListener('click', (even) => {
      if (this.position === 0) {
        return;
      }
      even.stopPropagation();
      if (this.play === 1) {
        this.play = 0;
      } else if (this.play === 0) {
        this.play = 1;
      }
      trainButton.style.display = 'none';
      repeatButton.style.display = 'flex';
      repeatButton.style.visibility = 'visible';
      repeatButton.style.opacity = '100%';
      if (this.play === 1) {
        playGame(this.position, this);
      }
    });
  },
};

state.elemVisible();
state.trainMode();
