/* eslint-disable no-param-reassign */
function getRate(id) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=e858f9dd`;
  return fetch(url)
    .then((res) => res.json())
    .then((dataId) => dataId.imdbRating);
}
async function getResult(idArr, res, idMov) {
  const resultId = await Promise.all(idArr);
  function test() {
    for (let i = 0; i < resultId.length; i += 1) {
      res[i].push(resultId[i]);
      res[i].push(`https://www.imdb.com/title/${idMov[i]}/`);
    }
  }
  test();
  return res;
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
  return getResult(idArray, result, id).then((val) => val);
}

class GetAbout {
  constructor(request) {
    this.request = request.trim();
    this.page = 2;
  }

  getFirstPage() {
    async function getMovies(request) {
      try {
        const url = `https://www.omdbapi.com/?s=${request}&apikey=e858f9dd`;
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
      const url = `https://www.omdbapi.com/?s=${request}&page=${page}&apikey=e858f9dd`;
      const res = await fetch(url);
      const data = await res.json();
      const arr = await getValues(data);
      return arr;
    }
    return getMovies(this.request, this.page)
      .then((val) => {
        this.page += 1;
        return val;
      })
      .catch(() => false);
  }
}
export default GetAbout;
