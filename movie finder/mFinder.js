console.log(1)
const API_URL="http://www.omdbapi.com/?i=tt3896198&apikey=df32bf7d&s=";
const API_URL_SEARCH="http://www.omdbapi.com/?apikey=df32bf7d&i=";

document.addEventListener("DOMContentLoaded", function () {
    let searchInput = document.getElementById("form-input");
    let card = document.getElementsByClassName("movie-cards")[0];




document.getElementsByClassName("search")[0].addEventListener("click",function(){
    console.log(searchInput.value);
    console.log(1)
    const query =searchInput.value;
    if(query){
        console.log(query);
        getMovies(API_URL+query);
    }
});
console.log(API_URL+newFunction());
function newFunction() {
    return "avatar";
}

async function getMovies(url){
    /*const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.search);
    console.log(respData.search);*/
    try {
        const resp = await fetch(url);
        const respData = await resp.json();
        if (respData.Response === 'True') {
          showMovies(respData.Search);
          console.log(respData);
        } else {
          console.error(respData.Error);
        }
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
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
    movieElm.classList.add ("movie-cards");
    movieElm.innerHTML=`
    <div class="card">
        <img src="${imovie.Poster}" alt="poster" height="300px" width="300px"/>
    <br>
    <div class="movie-desc">
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

});
