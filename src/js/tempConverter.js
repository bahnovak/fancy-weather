class Converter {
  do() {
    const tempToday = document.querySelector('.temp-today');
    const feelsVal = document.querySelector('.feels-val');
    const feelOp = document.querySelector('.feel-op');
    const tempNext = document.querySelectorAll('.temp-next');
    const cel = document.querySelector('.cel');
    const fah = document.querySelector('.fah');
    const temperature = document.querySelector('.temperature');

    function toFah() {
      cel.classList.remove('active');
      fah.classList.add('active');
      tempToday.innerHTML = Math.round(Number(tempToday.innerHTML) * 1.8 + 32);
      feelsVal.innerHTML = Math.round(Number(feelsVal.innerHTML) * 1.8 + 32);
      feelOp.innerHTML = '°F';
      tempNext.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.innerHTML = Math.round(Number(element.innerHTML) * 1.8 + 32);
      });
      localStorage.setItem('temp', 'fah');
    }

    function toCel() {
      cel.classList.add('active');
      fah.classList.remove('active');
      tempToday.innerHTML = Math.round((Number(tempToday.innerHTML) - 32) / 1.8);
      feelsVal.innerHTML = Math.round((Number(feelsVal.innerHTML) - 32) / 1.8);
      feelOp.innerHTML = '°C';
      tempNext.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.innerHTML = Math.round((Number(element.innerHTML) - 32) / 1.8);
      });
      localStorage.setItem('temp', 'cel');
    }

    if (localStorage.getItem('temp') === 'fah') {
      toFah();
    }

    temperature.addEventListener('click', (event) => {
      if (!event.target.classList.contains('active')) {
        if (event.target.classList.contains('fah')) {
          toFah();
        }

        if (event.target.classList.contains('cel')) {
          toCel();
        }
      }
    });
  }
}

export default Converter;
