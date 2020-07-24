/* eslint-disable operator-linebreak */
const options = {
  weekday: 'long',
};

function desiredDate(val) {
  const day = new Date();
  const hour = new Date().getHours();
  const dateVal = new Date(val);
  if (dateVal.getDate() === day.getDate() && hour >= dateVal.getHours()) {
    return true;
  }
  if (dateVal.getHours() === 12) {
    return true;
  }
  return false;
}
function desiredValueSort(arr, lang) {
  const res = [{}, {}, {}, {}];

  for (let i = 0; i < 4; i += 1) {
    if (i === 0) {
      res[i].description = arr[i].weather[i].description;
      res[i].feels_like = Math.round(arr[i].main.feels_like);
      res[i].wind = arr[i].wind.speed;
      res[i].humidity = arr[i].main.humidity;
      res[i].id = arr[i].weather[i].id;
    }

    if (i > 0) {
      res[i].weekday = new Date(arr[i].dt_txt).toLocaleString(lang, options);
    }
    res[i].temp = Math.round(arr[i].main.temp);
    res[i].icon = arr[i].weather[0].icon;
  }
  return res;
}
function desiredValue(arr, lang) {
  const result = [];
  arr.forEach((element) => {
    if (desiredDate(element.dt_txt) && result.length < 4) {
      result.push(element);
    }
  });
  return desiredValueSort(result, lang);
}

class GetWeather {
  constructor(city, lang) {
    this.city = city;
    this.lang = lang;
  }

  get() {
    const context = this;
    async function weather() {
      const cityRequest = await fetch(
        // eslint-disable-next-line comma-dangle
        `https://api.openweathermap.org/data/2.5/forecast?q=${context.city}&lang=${context.lang}&units=metric&APPID=2b0636f5c3300e630bf1ab433e7fe6ad`
      );
      const resWether = await cityRequest.json();
      return desiredValue(resWether.list, context.lang);
    }
    return weather()
      .then((e) => e)
      .catch(() => false);
  }
}

export default GetWeather;
