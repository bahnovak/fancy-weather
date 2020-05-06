import './style.css';
import CreateCard from './js/createCard';
import GetAbout from './js/getAboutMovie';

const cardContain = document.querySelector('.cardContain');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const movies = new GetAbout('american pie');

async function createCard(page) {
  if (page === 'first') {
    const description = await movies.getFirstPage();
    for (let i = 0; i < description.length; i += 1) {
      const card = new CreateCard(...description[i], cardContain);
      card.create();
    }
  }

  if (page === 'next') {
    const description = await movies.getNextPage();
    for (let i = 0; i < description.length; i += 1) {
      const card = new CreateCard(...description[i], cardContain);
      card.create();
    }
  }
}
createCard('first');

let position = 0;
let dec = 0;
function checkPosition() {
  if (position % 10 === 6 && position > dec) {
    createCard('next');
    dec += 10;
  }
}

prev.addEventListener('click', () => {
  if (position !== 0) {
    const { transform } = cardContain.style;
    const value = transform.match(/-\d+|\d+/g);
    cardContain.style.transform = `translateX(${Number(value[0]) + 255}px)`;
    position -= 1;
  }
});

next.addEventListener('click', () => {
  checkPosition();
  const { transform } = cardContain.style;
  const value = transform.match(/-\d+|\d+/g);
  cardContain.style.transform = `translateX(${Number(value[0]) - 255}px)`;
  position += 1;
});
