import './style.css';
import GetWeather from './js/getweather';
import Timer from './js/timer';
import GetPicture from './js/getPiture';
import mapInit from './js/getMap';
import GetCoords from './js/getCoords';
import WeatherIcons from './js/getIcon';

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

class Applocation {
  firstInit() {
    async function information() {
      const inform = await fetch('https://ipinfo.io/json?token=85dd844063d0c0');
      const res = await inform.json();
      const location = res.loc.split(',');
      const weather = new GetWeather(res.city, 'en');
      const resWeather = await weather.get();
      console.log(resWeather);
      tempToday.innerHTML = resWeather[0].temp;
      iconToday.src = weatherIcons[resWeather[0].icon];
      description.innerHTML = resWeather[0].description;
      feelsVal.innerHTML = resWeather[0].feels_like;
      windVal.innerHTML = resWeather[0].wind;
      humidityVal.innerHTML = resWeather[0].humidity;
      for (let i = 1; i < resWeather.length; i += 1) {
        weekdayNext[i - 1].innerHTML = resWeather[i].weekday;
        tempNext[i - 1].innerHTML = resWeather[i].temp;
        iconNext[i - 1].src = weatherIcons[resWeather[i].icon];
      }
      // const pic = new GetPicture(`spring day`);
      // const resPic = await pic.getPic();
      // console.log(resPic);
      mapInit(location[1], location[0]);
      const coord = new GetCoords('new york');
      const coordsRes = await coord.get();
      // eslint-disable-next-line prefer-destructuring
      city.innerHTML = coordsRes.city;
      latVal.innerHTML = coordsRes.coord.lat;
      longVal.innerHTML = coordsRes.coord.lng;
      console.log(coordsRes);
      const time = new Timer('en', timer, coordsRes.sec);
      time.getDate();
    }

    information();
  }
}

const app = new Applocation();
app.firstInit();
