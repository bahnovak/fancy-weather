import './style.css';
import CreateCard from './js/createCard';
import GetAbout from './js/getAboutMovie';

const slide = document.querySelector('.slide');

const movies = new GetAbout('harry potter');

async function createCard() {
  const description = await movies.getFirstPage();
  for (let i = 0; i < description.length; i += 1) {
    const card = new CreateCard(...description[i], slide);
    card.create();
  }
}
createCard();
