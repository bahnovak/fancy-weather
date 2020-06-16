function getTimesOfDay(obj, sec) {
  const checkObject = obj && obj.rise && obj.set && obj.set.apparent && obj.rise.apparent;
  if (!checkObject) {
    throw new Error('Uncorrect data');
  }
  const zoneHours = sec / 3600;
  const dateNow = new Date();
  dateNow.setHours(dateNow.getUTCHours() + zoneHours);
  const rise = new Date(obj.rise.apparent * 1000);
  rise.setHours(rise.getUTCHours() + zoneHours);
  const set = new Date(obj.set.apparent * 1000);
  set.setHours(set.getUTCHours() + zoneHours);

  if (dateNow.getHours() > rise.getHours() && dateNow.getHours() < set.getHours()) {
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
      const data = await res.json();
      const coords = data.results[0];
      result.city = coords.formatted;
      result.coord = coords.annotations.DMS;
      result.sec = coords.annotations.timezone.offset_sec;
      result.timeOfDay = getTimesOfDay(coords.annotations.sun, result.sec);
      result.coordForMap = coords.geometry;
      return result;
    }
    return getPos();
  }
}

export default GetCoords;
