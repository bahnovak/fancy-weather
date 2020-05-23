import './style.css';
import GetWeather from './js/getweather';
import Timer from './js/timer';
import GetPicture from './js/getPiture';
import mapInit from './js/getMap';

async function information() {
  const inform = await fetch('https://ipinfo.io/json?token=85dd844063d0c0');
  const res = await inform.json();
  console.log(res);
  const location = res.loc.split(',');
  console.log(location);
  const test = new GetWeather(res.city, 'en');
  const up = await test.get();
  console.log(up);
  const pic = new GetPicture(up[0].description);
  const resPic = await pic.getPic();
  console.log(resPic);
  mapInit(location[1], location[0]);
}

information();

const timer = document.querySelector('.time');

const time = new Timer('en', timer);
time.getDate();
