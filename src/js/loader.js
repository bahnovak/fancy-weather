const load = document.querySelector('.load');
const main = document.querySelector('main');
const header = document.querySelector('header');

function loader(val) {
  if (val) {
    load.classList.add('load-on');
    main.classList.add('content-off');
  }

  if (!val) {
    load.classList.remove('load-on');
    main.classList.remove('content-off');
  }
}

export default loader;
