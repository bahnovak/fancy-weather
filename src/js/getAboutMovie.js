function getValues(data) {
  const result = [];
  const keys = Object.keys(data.Search);
  for (let i = 0; i < keys.length; i += 1) {
    const obj = {};
    obj.name = data.Search[i].Title;
    obj.img = data.Search[i].Poster;
    obj.year = data.Search[i].Year;
    const url = `https://www.omdbapi.com/?i=${data.Search[i].imdbID}&apikey=736dfe54`;
    fetch(url)
      .then((res) => res.json())
      .then((dataId) => {
        obj.rating = dataId.imdbRating;
      });
    result.push(obj);
  }
  return result;
}

class GetAbout {
  constructor(request) {
    this.request = request;
    this.movies = [];
  }

  getFirstPage() {
    let array = [];
    async function getMovies(request) {
      const url = `https://www.omdbapi.com/?s=${request}&apikey=736dfe54`;
      const res = await fetch(url);
      const data = await res.json();
      const arr = await getValues(data);
      console.log(arr);
      array = arr;
    }
    getMovies(this.request);
    this.movies = array;
    console.log(this.movies);
  }

  getMoviesArray() {
    this.getFirstPage();
    return this.movies;
  }
}

export default GetAbout;
