/* eslint-disable prettier/prettier */
class GetCoords {
  constructor(request) {
    this.request = request;
  }

  get() {
    const result = [];
    const conntext = this;
    async function getPos() {
      const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${conntext.request}&key=f5a4e91f008a486eabc54807865a5f8e&pretty=1&no_annotations=1&language=en`);
      const coords = await res.json();
      result.push(coords.results[0].formatted);
      result.push(coords.results[0].geometry);
      return result;
    }
    return getPos();
  }
}

export default GetCoords;
