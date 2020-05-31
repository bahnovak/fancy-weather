class WeatherDescription {
  constructor(language) {
    switch (language) {
      case 'en':
        // thunderstorm
        this.feel = 'Feels like: ';
        this.wind = 'Wind: ';
        this.humidity = 'Humidity: ';
        this.lat = 'Latitude : ';
        this.lng = 'Longitude : ';
        this.wOp = 'm/s';
        this[200] = 'Thunderstorm with light rain';
        this[201] = 'Thunderstorm with rain';
        this[202] = 'Thunderstorm with heavy rain';
        this[210] = 'Light thunderstorm';
        this[211] = 'Thunderstorm';
        this[212] = 'Heavy thunderstorm';
        this[221] = 'Ragged thunderstorm';
        this[230] = 'Thunderstorm with light drizzle';
        this[231] = 'Thunderstorm with drizzle';
        this[232] = 'Thunderstorm with heavy drizzle';
        // drizzle
        this[300] = 'Light intensive drizzle';
        this[301] = 'Drizzle';
        this[302] = 'Heavy intensive drizzle';
        this[310] = 'Light intensive drizzle rain';
        this[311] = 'Drizzle rain';
        this[312] = 'Heavy intensive drizzle rain';
        this[313] = 'Shower rain and drizzle';
        this[314] = 'Heavy shower rain and drizzle';
        this[321] = 'Shower drizzle';
        // rain
        this[500] = 'Light rain';
        this[501] = 'Moderate rain';
        this[502] = 'Heavy intensive rain';
        this[503] = 'Very heavy rain';
        this[504] = 'Extreme rain';
        this[511] = 'Freezing rain';
        this[520] = 'Light intensive shower rain';
        this[521] = 'Shower rain';
        this[522] = 'Heavy intensive shower rain';
        this[531] = 'Ragged shower rain';
        // snow
        this[600] = 'Light snow';
        this[601] = 'Snow';
        this[602] = 'Heavy snow';
        this[611] = 'Sleet';
        this[612] = 'Light shower sleet';
        this[613] = 'Shower sleet';
        this[615] = 'Light rain and snow';
        this[616] = 'Rain and snow';
        this[620] = 'Light shower snow';
        this[621] = 'Shower snow';
        this[622] = 'Heavy shower snow';
        // atmosphere
        this[701] = 'Mist';
        this[711] = 'Smoke';
        this[721] = 'Haze';
        this[731] = 'Dust whirls';
        this[741] = 'Fog';
        this[751] = 'Sand';
        this[761] = 'Dust';
        this[762] = 'Volcanic ash';
        this[771] = 'Squalls';
        this[781] = 'Tornado';
        // clear
        this[800] = 'Clear sky';
        // clouds
        this[801] = 'Few clouds';
        this[802] = 'Scattered clouds';
        this[803] = 'Broken clouds';
        this[804] = 'Overcast clouds';
        break;
      case 'ru':
        this.feel = 'Ощущается: ';
        this.wind = 'Ветер: ';
        this.humidity = 'Влажность: ';
        this.lat = 'Широта : ';
        this.lng = 'Долгота : ';
        this.wOp = 'м/c';
        // thunderstorm
        this[200] = 'Гроза, небольшой дождь';
        this[201] = 'Гроза, дождь';
        this[202] = 'Гроза, сильный дождь';
        this[210] = 'Слабая гроза';
        this[211] = 'Гроза';
        this[212] = 'Сильная гроза';
        this[221] = 'Местами гроза';
        this[230] = 'Гроза, легкая изморось';
        this[231] = 'Гроза, изморось';
        this[232] = 'Гроза, сильная изморось';
        // drizzle
        this[300] = 'Легкая изморось';
        this[301] = 'Изморось';
        this[302] = 'Сильная изморось';
        this[310] = 'Легкий моросящий дождь';
        this[311] = 'Моросящий дождь';
        this[312] = 'Сильный моросящий дождь';
        this[313] = 'Проловной дождь, изморось';
        this[314] = 'Ливень, изморось';
        this[321] = 'Сильный моросящий дождь';
        // rain
        this[500] = 'Небольшой дождь';
        this[501] = 'Умеренный дождь';
        this[502] = 'Сильный дождь';
        this[503] = 'Ливень';
        this[504] = 'Ливень';
        this[511] = 'Град';
        this[520] = 'Слабый проливной дождь';
        this[521] = 'Проливной дождь';
        this[522] = 'Сильный приливной дождь';
        this[531] = 'Местами дождь';
        // snow
        this[600] = 'Небольшой снег';
        this[601] = 'Снег';
        this[602] = 'Сильный снег';
        this[611] = 'Мокрый снег';
        this[612] = 'Небольшой мокрый снег';
        this[613] = 'Мокрый снег';
        this[615] = 'Небольшой дождь, снег';
        this[616] = 'Дождь, снег';
        this[620] = 'Небольшая метель';
        this[621] = 'Метель';
        this[622] = 'Сильная метель';
        // atmosphere
        this[701] = 'Туман';
        this[711] = 'Смог';
        this[721] = 'Легкий туман';
        this[731] = 'Пылевая буря';
        this[741] = 'Туман';
        this[751] = 'Песчаная буря';
        this[761] = 'Пылевая буря';
        this[762] = 'Вулканический смог';
        this[771] = 'Шквал';
        this[781] = 'Торнадо';
        // clear
        this[800] = 'Ясное небо';
        // clouds
        this[801] = 'Малооблачно';
        this[802] = 'Облачно с прояснениями';
        this[803] = 'Пасмурно с прояснениями';
        this[804] = 'Пасмурно';
        break;
      case 'be':
        this.feel = 'Падобна:';
        this.wind = 'Вецер:';
        this.humidity = 'Вільготнасць:';
        this.lat = 'Шырата:';
        this.lng = 'Даўгата:';
        this.wOp = 'м/c';
        // thunderstorm
        this[200] = 'Навальніца, невялікі дождж';
        this[201] = 'Навальніца, дождж';
        this[202] = 'Навальніца, моцны дождж';
        this[210] = 'Слабая навальніца';
        this[211] = 'Навальніца';
        this[212] = 'Моцная навальніца';
        this[221] = 'Месцамі навальніца';
        this[230] = 'Навальніца, лёгкая імжа';
        this[231] = 'Навальніца, імжа';
        this[232] = 'Навальніца, моцная імжа';
        // drizzle
        this[300] = 'лёгкая імжа';
        this[301] = 'Імжа';
        this[302] = 'Моцная імжа';
        this[310] = 'Лёгкі дробны дождж';
        this[311] = 'Дробны дождж';
        this[312] = 'Моцны дробны дождж';
        this[313] = 'Праліўны дождж, імжа';
        this[314] = 'Лівень, імжа';
        this[321] = 'Моцны дробны дождж';
        // rain
        this[500] = 'Невялікі дождж';
        this[501] = 'Умераны дождж';
        this[502] = 'Моцны дождж';
        this[503] = 'Лівень';
        this[504] = 'Лівень';
        this[511] = 'Град';
        this[520] = 'Слабы праліўны дождж';
        this[521] = 'Праліўны дождж';
        this[522] = 'Моцны праліўны дождж';
        this[531] = 'Месцамі дождж';
        // snow
        this[600] = 'Невялікі снег';
        this[601] = 'Снег';
        this[602] = 'Моцны снег';
        this[611] = 'Мокры снег';
        this[612] = 'Невялікі мокры снег';
        this[613] = 'Мокры снег';
        this[615] = 'Невялікі дождж, снег';
        this[616] = 'Дождж, снег';
        this[620] = 'Невялікая мяцеліца';
        this[621] = 'Мяцеліца';
        this[622] = 'Моцная мяцеліца';
        // atmosphere
        this[701] = 'Туман';
        this[711] = 'Змог';
        this[721] = 'Лёгкі туман';
        this[731] = 'Пылавая бура';
        this[741] = 'Туман';
        this[751] = 'Пясчаная бура';
        this[761] = 'Пылавая бура';
        this[762] = 'Вулканічны змог';
        this[771] = 'Шквал';
        this[781] = 'Тарнада';
        // clear
        this[800] = 'Яснае неба';
        // clouds
        this[801] = 'Малавоблачна';
        this[802] = 'Пагодна';
        this[803] = 'Пахмурна з праясненнямі';
        this[804] = 'Пахмурна';
        break;
      default:
        break;
    }
  }
}

export default WeatherDescription;
