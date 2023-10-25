const IMG_URL = 'https://image.tmdb.org/t/p/w1280';
const API_KEY =  '04c35731a5ee918f014970082a0088b1';
//const API_URL = 'https://api.themoviedb.org/3/';
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key='+API_KEY+"&page=1";
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key='+API_KEY+"&query=";

const main = document.querySelector("main");
const form = document.querySelector("form");
const search = form.querySelector(".search");

//intially get movies
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);
    showMovies(respData.results);
}

function getClassByRate(va) {
    if (va > 8) return "good"
    if (va > 6) return "okay"
    return "bad"
}

function showMovies(movies) {
    //clear main
    main.innerHTML = "";

    movies.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
                <img src="${IMG_URL + movie.poster_path}" alt='${movie.overview}'>
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
                </div>
                <div class="overview">${movie.overview}</div>
                `

        main.appendChild(movieEl);
    });
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCH_URL+searchTerm);

        search.value = '';
    }
})

getMovies(API_URL)