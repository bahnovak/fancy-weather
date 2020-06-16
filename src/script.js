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
import Converter from './js/tempConverter';
import speakers from './js/speaks';
import GetRquestByVoise from './js/getText';

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
const micro = document.querySelector('.micro');
const play = document.querySelector('.play');


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
      if (!resPic) {
        background.src = await './public/desc.jpg';
      } else if (resPic) {
        background.src = resPic;
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
      if (localStorage.getItem('lang')) {
        const trans = new Translate('en', localStorage.getItem('lang'), context.id);
        chooseLang.value = localStorage.getItem('lang');
        trans.do();
        context.lang = localStorage.getItem('lang');
      }
      context.converter();
      loader(false);
    }

    information();
  }

  addListeners() {
    buttonSearch.addEventListener('click', () => {
      searchRequest(citySearch.value, this);
      citySearch.value = '';
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        searchRequest(citySearch.value, this);
        citySearch.value = '';
      }
    });
    updateImg.addEventListener('click', () => {
      this.updatePic();
    });
    chooseLang.addEventListener('click', (event) => {
      if (event.target.value !== this.lang) {
        const trans = new Translate(this.lang, event.target.value, this.id);
        trans.do();
        this.lang = event.target.value;
        localStorage.setItem('lang', event.target.value);
      }
    });
  }

  updatePic() {
    const context = this;
    async function update() {
      updateImg.classList.add('anim');
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
      setTimeout(() => updateImg.classList.remove('anim'), 500);
    }
    update();
  }

  converter() {
    const conv = new Converter();
    conv.do();
  }

  recognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // eslint-disable-next-line no-undef
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'ru';
    function recoStart() {
      recognition.start();
    }
    micro.addEventListener('click', (ev) => {
      ev.stopPropagation();
      if (!micro.classList.contains('animMicro')) {
        micro.classList.add('animMicro');
        recognition.addEventListener('result', (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
          if (event.results[0].isFinal) {
            searchRequest(transcript, this);
          }
        });
        recognition.addEventListener('end', recoStart);
        recognition.start();
      } else if (micro.classList.contains('animMicro')) {
        micro.classList.remove('animMicro');
        recognition.abort();
        recognition.removeEventListener('end', recoStart);
      }
    });

    play.addEventListener('click', () => {
      if (!play.classList.contains('animPlay')) {
        const msg = new SpeechSynthesisUtterance();
        play.classList.add('animPlay');
        msg.volume = 1;
        msg.rate = 1.5;
        msg.pitch = 1.5;
        msg.text = new GetRquestByVoise(this.lang).createRequest();
        let voice;
        if (this.lang === 'en') {
          // eslint-disable-next-line prefer-destructuring
          voice = speakers[10];
        } else if (this.lang !== 'en') {
          // eslint-disable-next-line prefer-destructuring
          voice = speakers[27];
        }
        msg.voiceURI = voice.name;
        msg.lang = voice.lang;
        speechSynthesis.speak(msg);
      } else if (play.classList.contains('animPlay')) {
        speechSynthesis.cancel();
        play.classList.remove('animPlay');
      }
    });
  }
}

const app = new Applocation();
app.init();
app.addListeners();
app.updatePic();
app.converter();
app.recognition();
