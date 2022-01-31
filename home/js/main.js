// Event listener for for submitting
document.getElementById('movieForm').addEventListener('submit', formSubmit);

// Function for handling form
function formSubmit(e) {

  //Declaring the variables by their IDs
  var movie = document.getElementById('movie').value;
  var genre = document.getElementById('genre').value;


  //Declaring the storage array
  var data = {
    filmName: movie,
    filmGenre: genre
  }

  //Making sure that the form is not submitted empty
  if (!formValidation(movie, genre)) {
    return false;
  }

  // Creating data and building connection with local storage 
  if (localStorage.getItem('film') === null) {
    var film = [];
    film.push(data);
    localStorage.setItem('film', JSON.stringify(film));
  } else {
    film = JSON.parse(localStorage.getItem('film'));
    film.push(data);
    localStorage.setItem('film', JSON.stringify(film));
  }

  // Clearing form after submitting
  document.getElementById('movieForm').reset();

  // Get Data
  getData();
}

// Function for removing movies
function removeFilm(filmName) {

  var film = JSON.parse(localStorage.getItem('film'));
  for (var i = 0; i < film.length; i++) {
    if (film[i].filmName == filmName) {
      film.splice(i, 1);
    }
  }
  //Sending back the updated data
  localStorage.setItem('film', JSON.stringify(film));

  // Get Data
  getData();
}


// Function for getting Data
function getData() {

  // Geting available data from local storage
  var film = JSON.parse(localStorage.getItem('film'));

  // Getting output area
  filmResults = document.getElementById('filmOutputs');

  // Writing output on HTML
  filmResults.innerHTML = '';
  for (var i = 0; i < film.length; i++) {
    var filmName = film[i].filmName;
    var filmGenre = film[i].filmGenre;

    filmResults.innerHTML += '<div class="well">' +
      '<h2>' + filmName + '<h3>' + filmGenre +
      ' <a onclick="removeFilm(\'' + filmName + '\') "class="btn btn-danger" href="#">Delete</a> ' +
      '</h3>' +
      '</h2>' +
      '</div>';
  }
}

window.onload = getData();

// Function for validating form
function formValidation(movie, genre) {
  if (!movie || !genre) {
    alert('Incomplete input');
    return false;
  }
  return true;
}



//Function for searching movies:


var search = document.getElementById('search');
search.addEventListener('keyup', searchFilms);


function searchFilms(e) {
  // converting to lowercase
  var text = e.target.value.toLowerCase();
  // Get DOM elements by class name
  var myFilms = filmResults.getElementsByClassName('well');

  // Convert to an array and check matching
  Array.from(myFilms).forEach(function (searchMovie) {
    var searchName = searchMovie.firstChild.textContent;
    if (searchName.toLowerCase().indexOf(text) != -1) {
      searchMovie.style.display = 'block';
    } else {
      searchMovie.style.display = 'none';
    }
  });
}