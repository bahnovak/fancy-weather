/* eslint-disable import/extensions */
import cards from './cardsCollect.js';
import * as createObj from './createCategory.js';
import createMenu from './menu.js';

const body = document.querySelector('body');
const category = document.createElement('div');

document.addEventListener('mousedown', (e) => e.preventDefault());

createMenu(body, cards);
category.classList.add('category');

createObj.createCategory(body, cards);
createObj.createCardCategory(category, cards);

body.appendChild(category);

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

const state = {
  position: 0,
  train: 0,

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

    function audioPlay(i, position) {
      const audio = new Audio(`./audio/${cards[position][getPositionInCard(i, position)].word}.mp3`);
      audio.play();
    }
    document.addEventListener('click', (event) => {
      if (event.target === toggle) {
        if (this.train === 1) {
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
      }

      if (this.train === 0) {
        word.forEach((e) => {
          e.style.visibility = '';
        });
        img.forEach((e, i) => {
          if (event.target === e) e.addEventListener('click', audioPlay(i, this.position));
          e.style.width = '';
          e.style.height = '';
          e.style.transform = '';
        });
      }
    });
  },
};

state.elemVisible();
state.trainMode();
