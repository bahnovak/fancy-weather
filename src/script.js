import './style.css';
import './css/reset.css';
import './css/load.css';
import CreateCard from './js/createCard';
import GetAbout from './js/getAboutMovie';

const cardContain = document.querySelector('.cardContain');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const searchButton = document.querySelector('.searchButton');
const searchInput = document.querySelector('.searchInput');
const info = document.querySelector('.info');
const clear = document.querySelector('.clear');
const load = document.querySelector('.load');
const content = document.querySelector('.content');

load.addEventListener('mousedown', (e) => e.preventDefault());

function isCyrillic(text) {
  return /[а-я]/i.test(text);
}

async function getTranslation(word) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T172115Z.378fce2446b14212.ea24c6129e4a3b4e139fc560626a10030b354dfb&text= ${word} &lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  return String(data.text).toLowerCase();
}

function showInfo(val, correct) {
  if (correct) {
    info.textContent = `Showing results for ${val}`;
    info.classList.add('infoShow');
    setTimeout(() => {
      info.classList.remove('infoShow');
    }, 5000);
  }

  if (!correct) {
    info.textContent = `No results for ${val}`;
    info.classList.add('infoShow');
    setTimeout(() => {
      info.classList.remove('infoShow');
    }, 5000);
  }
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
        load.classList.add('loadOn');
        content.classList.add('contentOff');
        const description = await context.movies.getFirstPage();
        for (let i = 0; i < description.length; i += 1) {
          const card = new CreateCard(...description[i], cardContain);
          card.create();
        }
        load.classList.remove('loadOn');
        content.classList.remove('contentOff');
      }

      if (page === 'next') {
        load.classList.add('loadOn');
        const description = await context.movies.getNextPage();
        for (let i = 0; i < description.length; i += 1) {
          const card = new CreateCard(...description[i], cardContain);
          card.create();
        }
        load.classList.remove('loadOn');
      }
    }
    createCards();
  }

  slider() {
    const context = this;
    function checkPositionCard() {
      // load next page if 5th card page on the right
      if (
        // eslint-disable-next-line operator-linebreak
        context.position % 10 === 5 &&
        context.position > context.dozenCards
      ) {
        context.createCardFilms('next');
        context.dozenCards += 10;
      }
    }
    prev.addEventListener('click', () => {
      if (context.position !== 4) {
        const { transform } = cardContain.style;
        const value = transform.match(/-\d+|\d+/g);
        cardContain.style.transform = `translateX(${Number(value[0]) + 255}px)`;
        context.position -= 1;
      }
    });
    next.addEventListener('click', () => {
      checkPositionCard();
      const card = document.querySelectorAll('.card');
      if (context.position < card.length) {
        const { transform } = cardContain.style;
        const value = transform.match(/-\d+|\d+/g);
        cardContain.style.transform = `translateX(${Number(value[0]) - 255}px)`;
        context.position += 1;
      }
    });
  }

  search() {
    const context = this;
    searchInput.focus();
    function searchShow() {
      if (searchInput.value) {
        if (isCyrillic(searchInput.value)) {
          getTranslation(searchInput.value).then((val) => {
            context.movies = new GetAbout(val);
            context.movies.getFirstPage().then((e) => {
              if (e) {
                context.clear();
                context.createCardFilms();
                showInfo(val, true);
              } else {
                showInfo(val, false);
              }
            });
          });
        } else {
          context.movies = new GetAbout(searchInput.value.toLowerCase());
          context.movies.getFirstPage().then((e) => {
            if (e) {
              context.clear();
              context.createCardFilms();
            } else {
              showInfo(searchInput.value.toLowerCase(), false);
            }
          });
        }
      }
    }
    searchButton.addEventListener('click', searchShow);
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        searchShow();
      }
    });

    clear.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
    });
  }

  clear() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((elem) => elem.remove());
    this.position = 4;
    this.dozenCards = 0;
    cardContain.style.transform = 'translateX(0px)';
  }
}

const newApp = new Application();
newApp.createCardFilms();
newApp.slider();
newApp.search();
