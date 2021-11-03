const searchedMovie = document.querySelector(".movieDiv");
const savedMoviesDiv = document.querySelector(".savedmovies");
const movieList = document.querySelector(".movie-list");
// const toWatchList = document.querySelector(".to-watch-list");

const body = document.querySelector("body");
const moviemodal = document.querySelector(".movie-modal"); // Dark background behind modal with modal content inside
const modalContent = document.querySelector(".modal-content"); // Actual modal with content
const closeButton = document.querySelector(".close-btn"); // An X for closing the modal

const movieItem = document.createElement("li");
movieItem.classList.add("movieList-item");

let previousSearch;
var openedMovie;
let searchResult;
let savedMovies = [];
 

const savedMoviesListItem = document.createElement("li");
savedMoviesListItem.classList.add("saved-moviesList-item");

const removeMovieBtn = document.createElement("button");
removeMovieBtn.classList.add("remove-movie-btn");


savedMoviesDiv.innerText = "Your to-watch list"

// event listeners

document.querySelector("#searchBtn").addEventListener("click", (event) => {

  let searchInput = document.querySelector("#searchBar").value;

if (searchInput != previousSearch)
{
  previousSearch = searchInput;
  searchResult = getMovieData(searchInput);
}

} );

window.addEventListener("click", clickCheck);
document.querySelector(".save-movie-btn").addEventListener("click", saveMovie);
document.querySelector(".remove-movie-btn").addEventListener("click", removeMovie);



// functions

//Clears the search field and the result
function clearSearch()
{
  document.querySelector(".movieDiv").innerHTML = ""; 
  document.querySelector(".savedmovies").innerHTML = ""; 
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
//Removes movie
function removeMovie(event){
  const index = savedMovies.indexOf(openedMovie);
if (index > -1) {
  savedMovies.splice(index, 1);
  clearSearch();
  toggleModal();
  initialize();
}}

//populates the "to watch list" 
function initialize() {

  clearSearch();

  savedMovies.forEach((movie) => {

    var moviePoster = document.createElement("img");
    moviePoster.classList.add("saved-movie-poster")
moviePoster.src = `${movie.Poster}`;


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
}
if (target.classList.contains("modalBtnSearch")) {
  openModalSearch(target.innerText); 
  
 }

else if (target === closeButton || target === moviemodal) {
    toggleModal();
  }
}
//Saved movies modal
function openModal(movieItem) {
  savedMovies.forEach((movie) => {
    if (movieItem === movie.Title) {
      let content = modalContent.children;

  content[1].src = movie.Poster;
  content[2].innerText = movie.Title;
  content[3].innerText = movie.Genre;
  content[4].innerText = movie.Plot;
  content[5].innerText = `Runtime : ${movie.Runtime}`
  content[6].innerText = `Director : ${movie.Director}`
  content[7].innerText = `Actors : ${movie.Actors}`
  content[8].innerText = `Released : ${movie.Released}`
  content[9].innerText = `Imdb Rating : ${movie.imdbRating}`
  openedMovie = movie;
  
  var removeBtn = document.querySelector(".remove-movie-btn").style ="display: block";
  var saveBtn = document.querySelector(".save-movie-btn").style ="display: none";    
  toggleModal();
}
})}

//The Search modal
function openModalSearch(movieItem) {
  movie = searchResult 
      let content = modalContent.children;
  content[1].src = movie.Poster;
  content[2].innerText = movie.Title;
  content[3].innerText = movie.Genre;
  content[4].innerText = movie.Plot;
  content[5].innerText = `Runtime : ${movie.Runtime}`
  content[6].innerText = `Director : ${movie.Director}`
  content[7].innerText = `Actors : ${movie.Actors}`
  content[8].innerText = `Released : ${movie.Released}`
  content[9].innerText = `Imdb Rating : ${movie.imdbRating}`
  
  var removeBtn = document.querySelector(".remove-movie-btn").style ="display: none";
  var saveBtn = document.querySelector(".save-movie-btn").style ="display: block";   


  toggleModal();

}

function toggleModal() {

  moviemodal.classList.toggle("hidden-modal");

}


async function getMovieData(searchInput) {
  let movie = await getDataAsync(searchInput);

var moviePoster = document.createElement("img");
moviePoster.src = `${movie.Poster}`;
moviePoster.height =300;
if (movie.Response === "False")
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
    const button = document.createElement("button");
    button.innerText = movie.Title;
  
    button.classList.add("btn");
    button.classList.add("modalBtnSearch");
    button.classList.add("img-center");
    button.style = "margin:10px;";

searchedMovie.appendChild(movieList);
movieList.appendChild(movieItem);
movieList.appendChild(button);

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
  