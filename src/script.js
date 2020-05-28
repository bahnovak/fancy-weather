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

class Applocation {
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
      // const pic = new GetPicture(
      //   `${coordsRes.timeOfDay}${resWeather[0].description}`
      // );
      // const resPic = await pic.getPic();
      // background.src = resPic;
      background.src = './public/desc.jpg';
      console.log(resWeather);
      tempToday.innerHTML = resWeather[0].temp;
      iconToday.src = weatherIcons[resWeather[0].icon];
      description.innerHTML = resWeather[0].description.toUpperCase();
      feelsVal.innerHTML = resWeather[0].feels_like;
      windVal.innerHTML = resWeather[0].wind;
      humidityVal.innerHTML = resWeather[0].humidity;
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
      console.log(coordsRes);
      loader(false);
    }

    information();
  }

  search() {
    buttonSearch.addEventListener('click', () => {
      this.init(citySearch.value);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.init(citySearch.value);
      }
    });
  }

  updatePic() {
    const context = this;
    async function update() {
      const pic = new GetPicture(
        `${context.timeOfDay}${context.description}`
      );
      const resPic = await pic.getPic();
      background.src = resPic;
    }
    updateImg.addEventListener('click', () => {
      update();
    });
  }
}

const app = new Applocation();
app.init();
app.search();
app.updatePic();
