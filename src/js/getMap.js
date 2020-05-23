/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
function mapInit(lat, long) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYmFobm92YWsiLCJhIjoiY2thamNsc2VpMDllMjJxbXcxenU1N2R3biJ9.9M8FN8hpNl69RzETLP0AnQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lat, long],
    zoom: 8,
  });

  const marker = new mapboxgl.Marker()
    .setLngLat([lat, long])
    .addTo(map);
}

export default mapInit;
