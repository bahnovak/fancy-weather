/* eslint-disable prettier/prettier */
import './style.css';
import CreateCard from './js/createCard';
import GetAbout from './js/getAboutMovie';

const cardContain = document.querySelector('.cardContain');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const searchButton = document.querySelector('.searchButton');
const searchInput = document.querySelector('.searchInput');

function isCyrillic(text) {
  return /[а-я]/i.test(text);
}

async function getTranslation(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T172115Z.378fce2446b14212.ea24c6129e4a3b4e139fc560626a10030b354dfb&text= ${word} &lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  return String(data.text).toLowerCase();
}

class Application {
  constructor(request = 'harry potter') {
    this.movies = new GetAbout(request);
    this.page = 'next';
    this.position = 4;
    this.dozenCards = 0;
  }

  createCardFilms(pag = 'first') {
    const page = pag;
    const context = this;
    async function createCards() {
      if (page === 'first') {
        const description = await context.movies.getFirstPage();
        for (let i = 0; i < description.length; i += 1) {
          const card = new CreateCard(...description[i], cardContain);
          card.create();
        }
      }

      if (page === 'next') {
        const description = await context.movies.getNextPage();
        for (let i = 0; i < description.length; i += 1) {
          const card = new CreateCard(...description[i], cardContain);
          card.create();
        }
      }
    }
    createCards();
  }

  slider() {
    const context = this;
    function checkPositionCard() {
      // load next page if 7th card page on the right
      if (
        context.position % 10 === 6
        && context.position > context.dozenCards
      ) {
        context.createCardFilms('next');
        context.dozenCards += 10;
      }
    }
    prev.addEventListener('click', () => {
      if (context.position !== 4) {
        const { transform } = cardContain.style;
        const value = transform.match(/-\d+|\d+/g);
        cardContain.style.transform = `translateX(${Number(value[0]) + 510}px)`;
        context.position -= 2;
      }
    });
    next.addEventListener('click', () => {
      checkPositionCard();
      const { transform } = cardContain.style;
      const value = transform.match(/-\d+|\d+/g);
      cardContain.style.transform = `translateX(${Number(value[0]) - 510}px)`;
      context.position += 2;
    });
  }

  search() {
    const context = this;
    searchButton.addEventListener('click', () => {
      if (searchInput.value) {
        if (isCyrillic(searchInput.value)) {
          getTranslation(searchInput.value)
            .then((val) => {
              console.log(val);
              context.movies = new GetAbout(val);
              context.clear();
              context.createCardFilms();
            });
        } else {
          context.movies = new GetAbout(searchInput.value.toLowerCase());
          context.clear();
          context.createCardFilms();
        }
      }
    });
  }

  clear() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((e) => e.remove());
    this.position = 4;
    this.dozenCards = 0;
    cardContain.style.transform = 'translateX(0px)';
  }
}

const newApp = new Application();
newApp.createCardFilms();
newApp.slider();
newApp.search();
