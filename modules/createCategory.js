export function createCard(arr, parent) {
  for (let i = 0; i < arr.length; i += 1) {
    const cardProt = document.createElement('div');
    const cardProtBack = document.createElement('div');
    const cardProtFace = document.createElement('div');
    const img = document.createElement('img');
    const word = document.createElement('div');
    const translate = document.createElement('img');
    const imgBack = document.createElement('img');
    const wordBack = document.createElement('div');
    cardProt.classList.add(`${arr[i].word}`);
    cardProt.classList.add('card');
    cardProtFace.classList.add('front');
    cardProtBack.classList.add('back');
    word.classList.add('word');
    wordBack.classList.add('wordBack');
    translate.classList.add('translate');
    img.classList.add('img');
    imgBack.classList.add('imgBack');

    img.src = `./img/${arr[i].word}.jpg`;
    imgBack.src = `./img/${arr[i].word}.jpg`;

    word.innerHTML = `${arr[i].word}`;
    wordBack.innerHTML = `${arr[i].translation}`;

    translate.src = './img/rotate.svg';
    translate.style.height = '30px';

    cardProt.addEventListener('click', (e) => {
      if (e.target === translate) {
        cardProt.style.overflow = '';
        cardProt.style.transform = 'rotateY(180deg)';
      }
    });
    cardProt.addEventListener('mouseleave', (e) => {
      if (e.target === cardProt) {
        cardProt.style.transform = 'rotateY(0deg)';
      }
    });

    word.appendChild(translate);
    cardProtBack.appendChild(imgBack);
    cardProtBack.appendChild(wordBack);
    cardProtFace.appendChild(img);
    cardProtFace.appendChild(word);
    cardProt.appendChild(cardProtFace);
    cardProt.appendChild(cardProtBack);
    parent.appendChild(cardProt);
  }
}

export function createCategory(parent, collection) {
  const names = Object.keys(collection);

  for (let i = 1; i < names.length; i += 1) {
    const category = document.createElement('div');

    category.classList.add('collection');
    category.classList.add(`${i}`);

    createCard(collection[i], category);

    parent.appendChild(category);
  }
}

export function createCardCategory(parent, collection) {
  const names = Object.keys(collection);

  for (let i = 1; i < names.length; i += 1) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.classList.add('imgCategory');
    div.classList.add('cardCategory');

    img.src = collection[i][3].image;

    div.appendChild(img);
    div.innerHTML += collection[0][i - 1];
    parent.appendChild(div);
  }
}
