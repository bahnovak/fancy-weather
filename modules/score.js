export default function score(parent, cards, navigation) {
  const scoreTable = document.createElement('div');
  scoreTable.classList.add('score');
  const table = document.createElement('table');
  table.classList.add('table');
  const tableHead = document.createElement('tr');
  const tabHead = ['Word', 'Translation', 'Category', 'Train', 'True', 'Mistakes', '%'];
  const scoreButton = document.createElement('img');
  scoreButton.src = './img/score.png';
  scoreButton.classList.add('scoreButton');
  const close = document.createElement('img');
  close.classList.add('closeScore');
  close.src = './img/close.png';

  for (let i = 0; i < tabHead.length; i += 1) {
    const td = document.createElement('td');
    td.innerHTML = tabHead[i];
    tableHead.append(td);
  }
  table.append(tableHead);
  for (let i = 1; i < cards.length; i += 1) {
    for (let j = 0; j < cards[i].length; j += 1) {
      const tr = document.createElement('tr');
      const arr = [cards[i][j].word, cards[i][j].translation, cards[0][i - 1], 0, 0, 0, 0];
      for (let k = 0; k < arr.length; k += 1) {
        const td = document.createElement('td');
        if (k === 3) {
          td.classList.add(`${cards[i][j].word}Train`);
          if (!localStorage.getItem(`${cards[i][j].word}Train`)) {
            localStorage.setItem(`${cards[i][j].word}Train`, 0);
            td.innerHTML = localStorage.getItem(`${cards[i][j].word}Train`);
          } else td.innerHTML = localStorage.getItem(`${cards[i][j].word}Train`);
        } else if (k === 4) {
          td.classList.add(`${cards[i][j].word}Play`);
          if (!localStorage.getItem(`${cards[i][j].word}Play`)) {
            localStorage.setItem(`${cards[i][j].word}Play`, 0);
            td.innerHTML = localStorage.getItem(`${cards[i][j].word}Play`);
          } else td.innerHTML = localStorage.getItem(`${cards[i][j].word}Play`);
        } else if (k === 5) {
          td.classList.add(`${cards[i][j].word}Mistakes`);
          if (!localStorage.getItem(`${cards[i][j].word}Mistakes`)) {
            localStorage.setItem(`${cards[i][j].word}Mistakes`, 0);
            td.innerHTML = localStorage.getItem(`${cards[i][j].word}Mistakes`);
          } else td.innerHTML = localStorage.getItem(`${cards[i][j].word}Mistakes`);
        } else if (k === 6) {
          td.classList.add(`${cards[i][j].word}Percent`);
          if (!localStorage.getItem(`${cards[i][j].word}Percent`)) {
            localStorage.setItem(`${cards[i][j].word}Percent`, 0);
            td.innerHTML = localStorage.getItem(`${cards[i][j].word}Percent`);
          } else td.innerHTML = localStorage.getItem(`${cards[i][j].word}Percent`);
        } else td.innerHTML = arr[k];
        tr.append(td);
      }
      table.append(tr);
    }
  }

  scoreButton.addEventListener('click', () => {
    scoreTable.style.display = 'flex';
    setTimeout(() => { scoreTable.style.opacity = '96%'; }, 100);
  });

  close.addEventListener('click', () => {
    setTimeout(() => { scoreTable.style.display = ''; }, 500);
    scoreTable.style.opacity = '0';
  });
  scoreTable.append(close);
  scoreTable.append(table);
  parent.append(scoreTable);
  navigation.append(scoreButton);
}
