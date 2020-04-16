export default function createTrainButton(parent) {
  const button = document.createElement('button');
  const repeatButton = document.createElement('button');
  button.classList.add('trainButton');
  button.innerHTML = 'Play';
  repeatButton.classList.add('repeatButton');
  repeatButton.innerHTML = 'Repeat';

  const image = document.createElement('img');
  image.src = './img/repeat.svg';
  image.style.width = '25px';
  image.classList.add('repeat');
  repeatButton.appendChild(image);

  parent.appendChild(button);
  parent.appendChild(repeatButton);
}
