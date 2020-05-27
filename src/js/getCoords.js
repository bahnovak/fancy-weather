/* eslint-disable prettier/prettier */

function getTimesOfDay(obj) {
  const dateNow = new Date();
  dateNow.setHours(dateNow.getUTCHours());
  const rise = new Date(obj.rise.apparent * 1000);
  rise.setHours(rise.getUTCHours());
  const set = new Date(obj.set.apparent * 1000);
  set.setHours(set.getUTCHours());

  console.log(dateNow, rise, set);

  if ((Date.now() / 1000) > rise && (Date.now() / 1000) < set) {
    return 'day';
  }
  return 'night';
}
class GetCoords {
  constructor(request) {
    this.request = request;
  }

  get() {
    const result = {};
    const conntext = this;
    async function getPos() {
      const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${conntext.request}&key=f5a4e91f008a486eabc54807865a5f8e&pretty=1&limit=1&language=en`);
      const coords = await res.json();
      result.city = coords.results[0].formatted;
      console.log(coords);
      result.coord = coords.results[0].annotations.DMS;
      result.sec = coords.results[0].annotations.timezone.offset_sec;
      result.timeOfDay = getTimesOfDay(coords.results[0].annotations.sun);
      return result;
    }
    return getPos();
  }
}

export default GetCoords;
