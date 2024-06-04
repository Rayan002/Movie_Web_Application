// Titles: https://omdbapi.com/?s=thor&page=1&apikey=fc1fef96
// details: http://www.omdbapi.com/?i=tt3896198&apikey=fc1fef96

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc0b33a5`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in data-id
        movieListItem.classList.add('search-list-item');
        let moviePoster = (movies[idx].Poster != "N/A") ? movies[idx].Poster : "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc0b33a5`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

async function fetchMovieDetailsById(imdbID) {
    const result = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=fc0b33a5`);
    const movieDetails = await result.json();
    displayMovieDetails(movieDetails);
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class="movie-poster">
        <img src="${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt="movie poster">
    </div>
    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
            <li class="year">Year: ${details.Year}</li>
            <li class="rated">Ratings: ${details.Rated}</li>
            <li class="released">Released: ${details.Released}</li>
        </ul>
        <p class="genre"><b>Genre:</b> ${details.Genre}</p>
        <p class="writer"><b>Writer:</b> ${details.Writer}</p>
        <p class="actors"><b>Actors: </b>${details.Actors}</p>
        <p class="plot"><b>Plot:</b> ${details.Plot}</p>
        <p class="language"><b>Language:</b> ${details.Language}</p>
        <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
        <br>
        <button class="save-button" onclick="saveMovie()" style="padding: 10px 30px; background-color: #b10606; color: white; border: none; border-radius: 5px; cursor: pointer; float: right;">Save</button>
    </div>
    `;
}



async function saveMovie(id) {
    console.log("fav-item", id);

    localStorage.setItem(Math.random().toString(36).slice(2, 7), id);// math.random for the unique key and value pair
    alert('Movie Added to Playlist!');
}

window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});

// Add event listeners to movie items in columns
document.addEventListener('DOMContentLoaded', () => {
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach(movie => {
        movie.addEventListener('click', () => {
            const imdbID = movie.getAttribute('data-id');
            fetchMovieDetailsById(imdbID);
        });
    });
});






