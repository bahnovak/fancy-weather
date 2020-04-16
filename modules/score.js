export default function score(parent, cards, navigation) {
  const scoreTable = document.createElement('div');
  scoreTable.classList.add('score');
  const table = document.createElement('table');
  table.classList.add('table');
  const tableHead = document.createElement('tr');
  const tabHead = ['Word', 'Translation', 'Category'];
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
      const arr = [cards[i][j].word, cards[i][j].translation, cards[0][i - 1]];
      for (let k = 0; k < arr.length; k += 1) {
        const td = document.createElement('td');
        td.innerHTML = arr[k];
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
