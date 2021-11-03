const searchedMovie = document.querySelector(".movieDiv");
const savedMoviesFirstDiv = document.querySelector(".savedmovies");
const movieList = document.querySelector(".movie-list");
// const toWatchList = document.querySelector(".to-watch-list");

const body = document.querySelector("body");
const moviemodal = document.querySelector(".movie-modal"); // Dark background behind modal with modal content inside
const modalContent = document.querySelector(".modal-content"); // Actual modal with content
const closeButton = document.querySelector(".close-btn"); // An X for closing the modal

const movieItem = document.createElement("li");
movieItem.classList.add("movieList-item");

let searchResult
let savedMovies = [];

const savedMoviesDiv = document.createElement("div");
savedMoviesDiv.classList.add("saved-movies-div"); //skapar ovan och lägger sen till med class 

const savedMoviesListItem = document.createElement("li");
savedMoviesListItem.classList.add("saved-moviesList-item");

const watchedMovieBtn = document.createElement("button");
watchedMovieBtn.classList.add("watched-btn");

const removeMovieBtn = document.createElement("button");
removeMovieBtn.classList.add("remove-movie-btn");


savedMoviesFirstDiv.innerText = "Your to-watch list"
savedMoviesFirstDiv.style =
"display: block; text-align: center; font-size: 1.5em; margin: 30px;";

// event listeners

document.querySelector("#searchBtn").addEventListener("click", (event) => {

  let searchInput = document.querySelector("#searchBar").value;

  searchResult = getMovieData(searchInput);
  
} );

var b = window.addEventListener("click", clickCheck);

var el = document.querySelector(".save-movie-btn").addEventListener("click", saveMovie);



// functions

//Clears the search field and the result
function clearSearch()
{

  document.querySelector(".movieDiv").innerHTML = ""; 
  let as = document.querySelector("#searchBar").value = "";
  document.querySelector(".save-movie-btn").style="display :none";
}

// saves the movie to the "To watch list" 
function saveMovie(event) {
 
  if(savedMovies.includes(searchResult))
  {
    alert("Movie is already in your list");
  }
  else
  {
    savedMovies.push(searchResult);
      initialize();  
  }
  
}

function initialize() {

  clearSearch()

  savedMovies.forEach((movie) => {

    var moviePoster = document.createElement("img");
moviePoster.src = `${movie.Poster}`;
moviePoster.height =300;

savedMoviesListItem.innerText = `
      Title = ${movie.Title} 
      Genre = ${movie.Genre}
      Imdb Rating = ${movie.imdbRating}
      
      `

    const button = document.createElement("button");
    button.innerText = movie.Title;
  
    button.classList.add("btn");
    button.classList.add("modalBtn");
    button.classList.add("img-center");
    button.style = "margin:10px;";
  
    savedMoviesFirstDiv.appendChild(savedMoviesDiv)
    savedMoviesDiv.appendChild(moviePoster);
    savedMoviesDiv.appendChild(button);
    savedMoviesDiv.append(savedMoviesListItem)
  });
}

//Checks where the user clicks and opens modal if that button is clicked
function clickCheck(e) {
  const target = e.target;
  if (target.classList.contains("modalBtn")) {

 openModal(target.innerText); 
console.log(target.innerText)
  } else if (target === closeButton || target === moviemodal) {
    toggleModal();
  }
}

function openModal(movieItem) {
  savedMovies.forEach((movie) => {
    if (movieItem === movie.Title) {
      let content = modalContent.children;
      console.log(modalContent.children)
  content[1].src = movie.Poster;
  content[2].innerText = movie.Title;
  content[3].innerText = movie.Genre;
  content[4].innerText = movie.Plot;
  content[5].innerText = `Runtime : ${movie.Runtime}`
  content[6].innerText = `Director : ${movie.Director}`
  content[7].innerText = `Actors : ${movie.Actors}`
  content[8].innerText = `Released : ${movie.Released}`
  content[9].innerText = `Imdb Rating : ${movie.imdbRating}`
    
  toggleModal();
}
})}

function toggleModal() {
  console.log(moviemodal.classList)

  moviemodal.classList.toggle("hidden-modal");
}


async function getMovieData(searchInput) {
  let movie = await getDataAsync(searchInput);

var moviePoster = document.createElement("img");
moviePoster.src = `${movie.Poster}`;
moviePoster.height =300;

if (movie.Response == "False")
{
  movieItem.innerText = "No such title found, check your spelling."
}
else{


  movieItem.innerText = `
Title = ${movie.Title} 
Genre = ${movie.Genre}
Runtime = ${movie.Runtime}
Actors = ${movie.Actors}
Director = ${movie.Director}
Released = ${movie.Released}
Imdb Rating = ${movie.imdbRating}

`
movieItem.append(moviePoster)


searchedMovie.appendChild(movieList);
movieList.appendChild(movieItem);

var btn = document.querySelector(".save-movie-btn").style =
"display: inline; margin : 10px; height: 20px; width: 50px;"
btn.innerText = "Save";

searchResult = movie;
;
}

async function getDataAsync(searchInput) {

  let res = await axios

    .get("https://www.omdbapi.com/?i=tt3896198&apikey=44515a04&t=".concat(searchInput))
    .catch((error) => console.error(error));

  console.log(res.data)
  return res.data;
}


}
  