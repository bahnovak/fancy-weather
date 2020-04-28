export default function createMenu(parent, category) {
  const menu = document.createElement('div');
  const l = document.createElement('input');
  const toggle = document.createElement('div');
  const train = document.createElement('div');
  const burger = document.createElement('img');
  const navigation = document.createElement('div');
  const close = document.createElement('img');

  navigation.classList.add('navigation');
  menu.classList.add('menu');
  toggle.classList.add('toggle');
  l.classList.add('toggleButton');
  burger.classList.add('burger');
  train.classList.add('train');
  close.classList.add('close');
  l.type = 'checkbox';
  train.innerHTML = 'Train';
  burger.src = './img/burger.png';
  close.src = './img/close.png';

  navigation.appendChild(close);
  const arrayNamesCategory = category[0];

  arrayNamesCategory.forEach((element, i) => {
    if (i === 0) {
      const div = document.createElement('div');
      const img = document.createElement('img');

      img.src = './img/1.png';

      img.classList.add('icon');
      div.classList.add('nav');

      div.appendChild(img);
      div.innerHTML += 'Main';

      navigation.appendChild(div);
    }
    const div = document.createElement('div');
    const img = document.createElement('img');
    /* first cycle add two elements */
    img.src = `./img/${i + 2}.png`;

    img.classList.add('icon');
    div.classList.add('nav');

    div.appendChild(img);
    div.innerHTML += element;

    navigation.appendChild(div);
  });

  menu.addEventListener('click', (e) => {
    if (e.target === burger) {
      navigation.classList.remove('navigationOff');
      navigation.classList.add('navigationOn');
    }
  });

  navigation.addEventListener('click', (e) => {
    if (e.target === close) {
      navigation.classList.remove('navigationOn');
      navigation.classList.add('navigationOff');
    }
  });

  toggle.appendChild(train);
  toggle.appendChild(l);
  menu.appendChild(burger);
  menu.appendChild(toggle);
  parent.appendChild(menu);
  parent.appendChild(navigation);
}
