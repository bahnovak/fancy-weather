/* eslint-disable no-param-reassign */
function getRate(id) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=736dfe54`;
  return fetch(url)
    .then((res) => res.json())
    .then((dataId) => dataId.imdbRating);
}
function getValues(data) {
  const result = [];
  const id = [];
  const idArray = [];
  const keys = Object.keys(data.Search);
  for (let i = 0; i < keys.length; i += 1) {
    const arr = [];
    arr.push(data.Search[i].Title);
    arr.push(data.Search[i].Poster);
    arr.push(data.Search[i].Year);
    result.push(arr);
    idArray.push(getRate(data.Search[i].imdbID));
    id.push(data.Search[i].imdbID);
  }
  async function getResult() {
    const resultId = await Promise.all(idArray);
    function test() {
      for (let i = 0; i < resultId.length; i += 1) {
        result[i].push(resultId[i]);
        result[i].push(`https://www.imdb.com/title/${id[i]}/`);
      }
    }
    await test();
    return result;
  }
  return getResult().then((val) => val);
}

class GetAbout {
  constructor(request) {
    this.request = request.trim();
    this.page = 2;
  }

  getFirstPage() {
    async function getMovies(request) {
      try {
        const url = `https://www.omdbapi.com/?s=${request}&apikey=736dfe54`;
        const res = await fetch(url);
        const data = await res.json();
        const arr = await getValues(data);
        return arr;
      } catch (e) {
        throw Error();
      }
    }

    return getMovies(this.request)
      .then((val) => val)
      .catch(() => false);
  }

  getNextPage() {
    async function getMovies(request, page) {
      const url = `https://www.omdbapi.com/?s=${request}&page=${page}&apikey=736dfe54`;
      const res = await fetch(url);
      const data = await res.json();
      const arr = await getValues(data);
      return arr;
    }
    return getMovies(this.request, this.page).then((val) => {
      this.page += 1;
      return val;
    });
  }
}
export default GetAbout;
