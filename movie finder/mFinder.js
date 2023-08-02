console.log(1)
const API_URL="http://www.omdbapi.com/?i=tt3896198&apikey=df32bf7d&s=";
const API_URL_SEARCH="http://www.omdbapi.com/?apikey=df32bf7d&i=";

document.addEventListener("DOMContentLoaded", function () {
    let searchInput = document.getElementById("form-input");
    let card = document.getElementsByClassName("movie-card")[0];



document.getElementsByClassName("search")[0].addEventListener("click",function(){
    console.log(searchInput.value);
    console.log(1)
    const query =searchInput.value;
    if(query){
        console.log(query);
        getMovies(API_URL+query);
    }
})
console.log(API_URL+newFunction());
function newFunction() {
    return "avatar";
}

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.search);
    console.log(respData.search);
}

function showMovies(movies){
    card.innerHTML="";
    movies.forEach(async function(movie){
        const movieData = await fetch(API_URL_SEARCH+movie.imdbID);
        const movieDataobj = await movieData.json();
        movie_display(movieDataobj);

        
    });
}

function movie_display(imovie){
    const movieElm = document.createElement("div");
    movieElm.classList.add ("movie-card");
    movieElm.innerHTML=`
    <div class="card">
        <img src="${imovie.Poster}" alt="poster" height="300px" width="300px"/>
    <br>
    <div class="movie-desction">
        <span class=movie-title><b>Title</b><span class="value">${imovie.Title} </span>
        <span class=movie-title><b>Rating</b><span class="value">${imovie.imdbRating} </span>
        <span class=movie-title><b>Director</b><span class="value">${imovie.Director} </span>
        <span class=movie-title><b>Released</b><span class="value">${imovie.Released} </span>
        <span class=movie-title><b>Genre</b><span class="value">${imovie.Genre} </span>
        
    </div>
    </div>
    `;
   card.appendChild(movieElm);
}


