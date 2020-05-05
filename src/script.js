import './style.css';
import CreateCard from './js/createCard';
import GetAbout from './js/getAboutMovie';

const slide = document.querySelector('.slide');
const movies = new GetAbout('harry');
const arr = movies.getMoviesArray();
console.log(arr);
