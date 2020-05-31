const load = document.querySelector('.load');
const main = document.querySelector('main');
const header = document.querySelector('header');

function loader(val) {
  if (val) {
    load.classList.add('loadOn');
    main.classList.add('contentOff');
  }

  if (!val) {
    load.classList.remove('loadOn');
    main.classList.remove('contentOff');
  }
}

export default loader;
