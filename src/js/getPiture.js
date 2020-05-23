/* eslint-disable comma-dangle */
class GetPicture {
  constructor(request) {
    this.request = request;
  }

  getPic() {
    const context = this;
    async function getFromApi() {
      const res = await fetch(
        `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${context.request}&client_id=zc5MC8x6DZIscbMTf_qpxvWZKMjQN-NkR_1RLwC4PVY`
      );
      const img = await res.json();
      return img.urls.regular;
    }

    return getFromApi();
  }
}

export default GetPicture;
