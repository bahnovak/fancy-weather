/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import WeatherDescription from './weatherDescription';

async function getTranslation(word, from, to) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T172115Z.378fce2446b14212.ea24c6129e4a3b4e139fc560626a10030b354dfb&text= ${word} &lang=${from}-${to}`;
  const res = await fetch(url);
  const data = await res.json();
  return String(data.text);
}

class Translate {
  constructor(langFrom, langTo, id) {
    this.langFrom = langFrom;
    this.langTo = langTo;
    this.id = id;
  }

  do() {
    const context = this;
    const descriptionObj = new WeatherDescription(this.langTo);
    const description = document.querySelector('.description');
    const feel = document.querySelector('.feel');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const windOp = document.querySelector('.windOp');
    const latInfo = document.querySelector('.latInfo');
    const longInfo = document.querySelector('.longInfo');
    const city = document.querySelector('.city');
    const date = document.querySelector('.date');
    const weekdayNext = document.querySelectorAll('.weekdayNext');
    const main = document.querySelector('main');

    async function trans() {
      const cityTrans = await getTranslation(city.innerHTML, context.langFrom, context.langTo);
      const dateTrans = await getTranslation(date.innerHTML, context.langFrom, context.langTo);
      const weekOneTrans = await getTranslation(weekdayNext[0].innerHTML, context.langFrom, context.langTo);
      const weekTwoTrans = await getTranslation(weekdayNext[1].innerHTML, context.langFrom, context.langTo);
      const weekThreeTrans = await getTranslation(weekdayNext[2].innerHTML, context.langFrom, context.langTo);

      city.innerHTML = cityTrans;
      date.innerHTML = dateTrans;
      weekdayNext[0].innerHTML = weekOneTrans;
      weekdayNext[1].innerHTML = weekTwoTrans;
      weekdayNext[2].innerHTML = weekThreeTrans;
      description.innerHTML = descriptionObj[context.id];
      feel.innerHTML = descriptionObj.feel;
      wind.innerHTML = descriptionObj.wind;
      humidity.innerHTML = descriptionObj.humidity;
      windOp.innerHTML = descriptionObj.wOp;
      latInfo.innerHTML = descriptionObj.lat;
      longInfo.innerHTML = descriptionObj.lng;
    }

    trans();
  }
}

export default Translate;
