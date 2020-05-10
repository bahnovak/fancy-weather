class CreateCard {
  constructor(name, img, year, rating, link, parent) {
    this.name = name;
    this.img = img;
    this.year = year;
    this.rating = rating;
    this.link = link;
    this.parent = parent;
    this.card = document.createElement('div');
    this.card.classList.add('card');
  }

  create() {
    const nameMovie = document.createElement('a');
    nameMovie.classList.add('nameMovie');
    const imgMovie = document.createElement('img');
    imgMovie.classList.add('imgMovie');
    const yearMovie = document.createElement('div');
    yearMovie.classList.add('yearMovie');
    const ratingMovie = document.createElement('div');
    ratingMovie.classList.add('ratingMovie');

    nameMovie.textContent = this.name;
    nameMovie.href = this.link;
    nameMovie.target = '_blank';
    imgMovie.src = this.img;
    if (this.img === 'N/A') {
      imgMovie.src = '../public/noImage.jpg';
    }
    yearMovie.textContent = this.year;
    ratingMovie.textContent = this.rating;

    this.card.append(nameMovie);
    this.card.append(imgMovie);
    this.card.append(yearMovie);
    this.card.append(ratingMovie);
    this.parent.append(this.card);
  }
}

export default CreateCard;
