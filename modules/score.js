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
  const clear = document.createElement('button');
  clear.classList.add('clearScore');
  clear.innerHTML = 'Clear';
  const menu = document.createElement('div');
  menu.classList.add('menuScore');

  function sortTable(n) {
    let rows;
    let switching = true;
    let i;
    let x;
    let y;
    let shouldSwitch;
    let dir = 'asc';
    let switchcount = 0;
    while (switching) {
      switching = false;
      rows = table.getElementsByTagName('TR');
      for (i = 1; i < (rows.length - 1); i += 1) {
        shouldSwitch = false;

        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];

        if (dir === 'asc') {
          if (n < 3) {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else if (n >= 3) {
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
          }
        } else if (dir === 'desc') {
          if (n < 3) {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else if (n >= 3) {
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount += 1;
      } else if (switchcount === 0 && dir === 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }

  for (let i = 0; i < tabHead.length; i += 1) {
    const td = document.createElement('td');
    td.innerHTML = tabHead[i];
    tableHead.append(td);
    td.style.cursor = 'pointer';
    td.classList.add('tableSort');
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

  clear.addEventListener('click', () => {
    localStorage.clear();
    const td = document.querySelectorAll('td');
    td.forEach((e) => {
      if (e.className && e.className !== 'tableSort') {
        e.innerHTML = 0;
      }
    });
  });
  menu.append(close);
  menu.append(clear);
  scoreTable.append(menu);
  scoreTable.append(table);
  parent.append(scoreTable);
  navigation.append(scoreButton);

  const tableSort = document.querySelectorAll('.tableSort');
  tableSort.forEach((element, i) => {
    element.addEventListener('click', () => {
      sortTable(i);
    });
  });
}
