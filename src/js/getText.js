class GetRquestByVoise {
  constructor(lang) {
    this.lang = lang;
  }

  createRequest() {
    let weatherToday;
    let nextDay;
    const city = document.querySelector('.city').innerHTML;
    let temp;
    const tempToday = `${document.querySelector('.temp-today').innerHTML}°`;
    const description = document.querySelector('.description').innerHTML;
    const feel = `${document.querySelector('.feel').innerHTML}
      ${document.querySelector('.feels-val').innerHTML}°`;
    const wind = `${document.querySelector('.wind').innerHTML} 
      ${document.querySelector('.wind-val').innerHTML}  
      `;
    const humidity = `${document.querySelector('.humidity').innerHTML}${document.querySelector('.humidity-val').innerHTML}${document.querySelector('.humidity-op').innerHTML}.`;
    if (this.lang === 'en') {
      temp = 'Temperature';
      weatherToday = 'Weather forecast for today.';
      nextDay = 'Next days weather forecast.';
    } else if (this.lang !== 'en') {
      temp = 'Температура';
      weatherToday = 'Погода на сегодня.';
      nextDay = 'Погода на следующие дни.';
    }
    const weekdayNext = document.querySelectorAll('.weekday-next');
    const tempNext = document.querySelectorAll('.temp-next');

    return `${weatherToday}. ${city}. ${temp} ${tempToday}. ${description}. ${feel}.
     ${wind}. ${humidity}. ${nextDay}. ${weekdayNext[0].innerHTML} ${tempNext[0].innerHTML}° .  
     ${weekdayNext[1].innerHTML} ${tempNext[1].innerHTML}° . ${weekdayNext[2].innerHTML} ${tempNext[2].innerHTML}° `;
  }
}

export default GetRquestByVoise;
