const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovie() {
  const { results } = await fetchAPISata('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

async function fetchAPISata(endpoint) {
  const API_KEY = 'bf2e7d792e6d253108d3f660907f9511';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&languae=en-US`
  );

  const data = await response.json();

  return data;
}

//highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovie();
      console.log('home');
      break;
    case '/shows.html':
      console.log('shows');
      break;
    case '/tv-details.html':
      console.log('tv detail');
      break;
    case '/movie-details.html':
      console.log('movie details');
      break;
    case '/search.html':
      console.log('search');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
