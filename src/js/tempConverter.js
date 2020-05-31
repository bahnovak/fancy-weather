class Converter {
  do() {
    const tempToday = document.querySelector('.tempToday');
    const feelsVal = document.querySelector('.feelsVal');
    const feelOp = document.querySelector('.feelOp');
    const tempNext = document.querySelectorAll('.tempNext');
    const cel = document.querySelector('.cel');
    const fah = document.querySelector('.fah');
    const temperature = document.querySelector('.temperature');

    function toFah() {
      cel.classList.remove('active');
      fah.classList.add('active');
      tempToday.innerHTML = Math.round(+tempToday.innerHTML * 1.8 + 32);
      feelsVal.innerHTML = Math.round(+feelsVal.innerHTML * 1.8 + 32);
      feelOp.innerHTML = '°F';
      tempNext.forEach((element) => {
        // eslint-disable-next-line no-param-reassign
        element.innerHTML = Math.round(+element.innerHTML * 1.8 + 32);
      });
      localStorage.setItem('temp', 'fah');
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
          cel.classList.add('active');
          fah.classList.remove('active');
          tempToday.innerHTML = Math.round((+tempToday.innerHTML - 32) / 1.8);
          feelsVal.innerHTML = Math.round((+feelsVal.innerHTML - 32) / 1.8);
          feelOp.innerHTML = '°C';
          tempNext.forEach((element) => {
            // eslint-disable-next-line no-param-reassign
            element.innerHTML = Math.round((+element.innerHTML - 32) / 1.8);
          });
          localStorage.setItem('temp', 'cel');
        }
      }
    });
  }
}

export default Converter;
