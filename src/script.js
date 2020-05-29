/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import './style.css';
import GetWeather from './js/getweather';
import Timer from './js/timer';
import GetPicture from './js/getPiture';
import mapInit from './js/getMap';
import GetCoords from './js/getCoords';
import WeatherIcons from './js/getIcon';
import loader from './js/loader';
import Translate from './js/translate';

const weatherIcons = new WeatherIcons();
const city = document.querySelector('.city');
const timer = document.querySelector('.time');
const tempToday = document.querySelector('.tempToday');
const iconToday = document.querySelector('.iconToday');
const description = document.querySelector('.description');
const feelsVal = document.querySelector('.feelsVal');
const windVal = document.querySelector('.windVal');
const humidityVal = document.querySelector('.humidityVal');
const weekdayNext = document.querySelectorAll('.weekdayNext');
const tempNext = document.querySelectorAll('.tempNext');
const iconNext = document.querySelectorAll('.iconNext');
const latVal = document.querySelector('.latVal');
const longVal = document.querySelector('.longVal');
const background = document.querySelector('.background');
const citySearch = document.querySelector('.citySearch');
const buttonSearch = document.querySelector('.buttonSearch');
const updateImg = document.querySelector('.updateImg');
const chooseLang = document.querySelector('.chooseLang');

async function searchRequest(val, context) {
  const weather = new GetWeather(val, 'en');
  const resWeather = await weather.get();
  if (resWeather) {
    context.init(val);
  } else {
    citySearch.classList.add('citySearchIncorrect');
    citySearch.value = 'Incorrect request';
    setTimeout(() => {
      citySearch.classList.remove('citySearchIncorrect');
      setTimeout(() => {
        citySearch.value = '';
      }, 500);
    }, 700);
  }
}

class Applocation {
  constructor() {
    this.lang = 'en';
  }

  init(request) {
    const context = this;
    async function information() {
      let cityRequest = request;
      loader(true);
      if (!request) {
        const inform = await fetch('https://ipinfo.io/json?token=85dd844063d0c0');
        const res = await inform.json();
        cityRequest = res.city;
      }
      const weather = new GetWeather(cityRequest, 'en');
      const resWeather = await weather.get();
      const coord = new GetCoords(cityRequest);
      const coordsRes = await coord.get();
      const dat = document.querySelector('.date');
      const tim = document.querySelector('.timer');
      dat.remove();
      tim.remove();
      const time = new Timer('en', timer, coordsRes.sec);
      time.getDate();
      context.description = resWeather[0].description;
      context.timeOfDay = coordsRes.timeOfDay;
      const pic = new GetPicture(
        `${coordsRes.timeOfDay}${resWeather[0].description}`
      );
      const resPic = await pic.getPic();
      background.src = resPic;
      if (!resPic) {
        background.src = await './public/desc.jpg';
      }
      tempToday.innerHTML = resWeather[0].temp;
      iconToday.src = weatherIcons[resWeather[0].icon];
      description.innerHTML = resWeather[0].description.toUpperCase();
      feelsVal.innerHTML = resWeather[0].feels_like;
      windVal.innerHTML = resWeather[0].wind;
      humidityVal.innerHTML = resWeather[0].humidity;
      context.id = resWeather[0].id;
      for (let i = 1; i < resWeather.length; i += 1) {
        weekdayNext[i - 1].innerHTML = resWeather[i].weekday;
        tempNext[i - 1].innerHTML = resWeather[i].temp;
        iconNext[i - 1].src = weatherIcons[resWeather[i].icon];
      }
      mapInit(coordsRes.coordForMap.lng, coordsRes.coordForMap.lat);
      // eslint-disable-next-line prefer-destructuring
      city.innerHTML = coordsRes.city;
      latVal.innerHTML = `${coordsRes.coord.lat}`;
      longVal.innerHTML = `${coordsRes.coord.lng}`;
      loader(false);
    }

    information();
  }

  search() {
    buttonSearch.addEventListener('click', () => {
      searchRequest(citySearch.value, this);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        searchRequest(citySearch.value, this);
      }
    });
  }

  updatePic() {
    const context = this;
    async function update() {
      background.classList.add('backgroundOpacity');
      const pic = new GetPicture(
        `${context.description} ${context.timeOfDay}`
      );
      const resPic = await pic.getPic();
      background.src = await resPic;
      setTimeout(() => background.classList.remove('backgroundOpacity'), 500);
      if (!resPic) {
        background.src = await './public/desc.jpg';
      }
    }
    updateImg.addEventListener('click', () => {
      update();
    });
  }

  translate() {
    chooseLang.addEventListener('click', (event) => {
      if (event.target.value !== this.lang) {
        const trans = new Translate(this.lang, event.target.value, this.id);
        trans.do();
        this.lang = event.target.value;
        localStorage.setItem('lang', event.target.value);
      }
    });
  }
}

const app = new Applocation();
app.init();
app.search();
app.updatePic();
app.translate();
