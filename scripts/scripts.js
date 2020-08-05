//creating a namespace
const radMovieQuiz = {};
radMovieQuiz.apikey = "bbdeeb2ee8dee00541ba5f527454ce0e";
radMovieQuiz.baseImageURL = "https://image.tmdb.org/t/p/w342"; //append poster path returned from API Call to this URL to get full image
radMovieQuiz.startDate = new Date("1990-01-01");
radMovieQuiz.endDate = new Date("1999-12-31");

radMovieQuiz.nonNinetiesAPIResults = []; //non90s movie results (promises) from API Call stored here
radMovieQuiz.ninetiesAPIResults = []; //90s movie results (promises) from API Call stored here

radMovieQuiz.nonNinetiesMovieArray = []; //non90s movie array
radMovieQuiz.NinetiesMovieArray = []; //90s movie array

radMovieQuiz.selectedMovie; //holds the user selected movie object (assigned on focus)
radMovieQuiz.finalFour = []; //holds the four random movies
radMovieQuiz.selectedMovieIndex; //holds the index of the movie in focus
radMovieQuiz.IsQuizOn = true; //flag to check if the quiz questions are to be served and evaluated

//the Movie Database API Call URLs. See themoviedb.org for API docs
radMovieQuiz.eightiesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${radMovieQuiz.apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=1989-12-31&primary_release_date.gte=1987-01-01&with_original_language=en`;
radMovieQuiz.oughtsUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${radMovieQuiz.apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2003-12-31&primary_release_date.gte=2000-01-01&with_original_language=en`;
radMovieQuiz.nonNinetiesURLArray = [];
radMovieQuiz.ninetiesURl = `https://api.themoviedb.org/3/discover/movie?api_key=${radMovieQuiz.apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_date.lte=1999-12-31&primary_release_date.gte=1990-01-01&with_original_language=en&page=`;
radMovieQuiz.ninetiesURLArray = [];

//helper method to append page number to 90s movies API call parameters
radMovieQuiz.generateNinetiesURLArray = (baseUrl, numPages) => {
  for (let i = 1; i < numPages + 1; i++) {
    radMovieQuiz.ninetiesURLArray.push(baseUrl + i);
  }
};

//method to connect to The Movies DB API and retrieve 20 movies i.e 1 page
radMovieQuiz.movieApiCall = function (apiUrl) {
  return $.ajax({
    url: apiUrl,
    dataType: "json",
    method: "GET",
  });
};

//Promises for non Nineties movies API calls (movies from 80s and 2000s)
radMovieQuiz.getNonNinetiesPromises = function () {
  radMovieQuiz.nonNinetiesURLArray = [radMovieQuiz.eightiesUrl, radMovieQuiz.oughtsUrl];
  //retrieve '80s and '00s movies from the api and push promises to an array
  for (let i = 0; i < radMovieQuiz.nonNinetiesURLArray.length; i++) {
    radMovieQuiz.nonNinetiesAPIResults.push(
      radMovieQuiz.movieApiCall(radMovieQuiz.nonNinetiesURLArray[i])
    );
  }
  return radMovieQuiz.nonNinetiesAPIResults;
};

//Promises for Nineties movies API calls
radMovieQuiz.getNinetiesPromises = function () {
  //generate the 90s Movies API Urls - 6 pages of movies
  radMovieQuiz.generateNinetiesURLArray(radMovieQuiz.ninetiesURl, 6);

  //retrieve '90s movies from the api and push promises to an array
  for (let j = 0; j < radMovieQuiz.ninetiesURLArray.length; j++) {
    radMovieQuiz.ninetiesAPIResults.push(
      radMovieQuiz.movieApiCall(radMovieQuiz.ninetiesURLArray[j])
    );
  }
  return radMovieQuiz.ninetiesAPIResults;
};

//gets movies from the API and writes it to a non 90s movie array and a 90s movie array
radMovieQuiz.GetMovies = async () => {
  radMovieQuiz.nonNinetiesAPIResults = radMovieQuiz.getNonNinetiesPromises(); //2
  radMovieQuiz.NinetiesAPIResults = radMovieQuiz.getNinetiesPromises(); //6

  //extracting non 90s movies
  await $.when(...radMovieQuiz.nonNinetiesAPIResults) //2
    .then((...nonNinetiesPromises) => {
      radMovieQuiz.movieResults = nonNinetiesPromises.map((movies) => {
        return movies[0].results;
      });
      return radMovieQuiz.movieResults;
    })
    .done(function (movieResults) {
      radMovieQuiz.nonNinetiesMovieArray = movieResults;
    });

  //extracting 90s movies
  await $.when(...radMovieQuiz.ninetiesAPIResults) //6
    .then((...NinetiesPromises) => {
      radMovieQuiz.movieResults = NinetiesPromises.map((movies) => {
        return movies[0].results;
      });
      return radMovieQuiz.movieResults;
    })
    .done(function (movieResults) {
      radMovieQuiz.ninetiesMovieArray = movieResults;
    });
};

//input: number of random numbers requested, Max number Output: array of one or more random numbers
radMovieQuiz.randomIndexGenerator = (howMany, movieArrayLength) => {
  let arrayofIndexes = [];
  while (arrayofIndexes.length < howMany) {
    let r = Math.floor(Math.random() * movieArrayLength);
    if (arrayofIndexes.indexOf(r) === -1) arrayofIndexes.push(r);
  }
  return arrayofIndexes;
};

//input: number of random movies requested along with the list
//output: returns requested random movies from a list
radMovieQuiz.getRandomMovies = (numMovies, sourceArray) => {
  let tempMovieList = [];
  let randomMovies = [];

  //first consolidate all the movies into one array
  for (let i = 0; i < sourceArray.length; i++) {
    tempMovieList.push(...sourceArray[i]);
  }

  //next extract X random movies from the array
  let indexArray = radMovieQuiz.randomIndexGenerator(
    numMovies,
    tempMovieList.length
  );
  for (j = 0; j < indexArray.length; j++) {
    randomMovies.push(tempMovieList[indexArray[j]]);
  }

  return randomMovies;
};

//slow scroll function
radMovieQuiz.scrollAway = function (from, to) {
  $(from).click(function (e) {
    e.preventDefault();
    $("html").animate(
      {
        scrollTop: $(to).offset().top,
      },
      "slow"
    );
  });
};

//input: two arrays with correct and incorrect movies list
//output: write to page
radMovieQuiz.displayQuiz = () => {
  let ninetiesMovies = radMovieQuiz.getRandomMovies(3, radMovieQuiz.ninetiesMovieArray);
  let nonNinetiesMovies = radMovieQuiz.getRandomMovies(1, radMovieQuiz.nonNinetiesMovieArray);
  let arrayMovies = radMovieQuiz.shuffle([...ninetiesMovies, ...nonNinetiesMovies]); //shuffle the movies in the array

  if (arrayMovies.length == 4) {
    radMovieQuiz.finalFour = arrayMovies; //assigning the final four movies to a global object.
    $(".movieOptionOne input[type=image]").attr("src", radMovieQuiz.baseImageURL.concat(arrayMovies[0].poster_path));
    $(".movieOptionOne input[type=image]").attr("alt", arrayMovies[0].title);
    $(".movieOptionTwo input[type=image]").attr("src", radMovieQuiz.baseImageURL.concat(arrayMovies[1].poster_path));
    $(".movieOptionTwo input[type=image]").attr("alt", arrayMovies[1].title);
    $(".movieOptionThree input[type=image]").attr("src", radMovieQuiz.baseImageURL.concat(arrayMovies[2].poster_path));
    $(".movieOptionThree input[type=image]").attr("alt", arrayMovies[2].title);
    $(".movieOptionFour input[type=image]").attr("src", radMovieQuiz.baseImageURL.concat(arrayMovies[3].poster_path));
    $(".movieOptionFour input[type=image]").attr("alt", arrayMovies[3].title);

  }
};

//helper function to identify the index of the correct answer
radMovieQuiz.getAnswerIndex = function () {
  let selectedReleaseDate;
  for (let i = 0; i < radMovieQuiz.finalFour.length; i++) {
    selectedReleaseDate = new Date(radMovieQuiz.finalFour[i].release_date);
    if (
      (selectedReleaseDate < radMovieQuiz.startDate) ||
      (selectedReleaseDate > radMovieQuiz.endDate)
    ) {

      return i;
    }
  }
}

radMovieQuiz.styleRightWrong = () => {
  //first style the one in focus

  $(`.movieOption:nth-of-type(${radMovieQuiz.selectedMovieIndex}) div`).text("❌ Released: " + radMovieQuiz.finalFour[radMovieQuiz.selectedMovieIndex - 1].release_date.split('-')[0]).addClass("focusAnswer");
  //next style the image that is correct 
  let answerIndex = radMovieQuiz.getAnswerIndex();
  let nthOfTypeValue = answerIndex + 1;

  $(`.movieOption:nth-of-type(${nthOfTypeValue}) div`).text("✔️ Released: " + radMovieQuiz.finalFour[answerIndex].release_date.split('-')[0]).addClass("correctAnswer");;


};

radMovieQuiz.eventListener = function () {
  //event listener for the Get Started button
  radMovieQuiz.scrollAway(".btnStart", ".movieQuiz");

  //when a movie is in focus save the selected movie
  $(".movieOption input[type=image]").on("click", function (e) {

    e.preventDefault();
    if (radMovieQuiz.IsQuizOn) {
      radMovieQuiz.selectedMovieIndex = $(this).attr("index"); //values from 1 to 4
      radMovieQuiz.selectedMovie = radMovieQuiz.finalFour[radMovieQuiz.selectedMovieIndex - 1];
      $(".btnSubmit").attr("disabled", false);
    }
  });

  //on submitting the movie selection
  $("form").on("submit", function (e) {
    e.preventDefault();
    if (radMovieQuiz.IsQuizOn) {
      //show correct / incorrect answers
      radMovieQuiz.styleRightWrong();
      radMovieQuiz.resetEverything();
    }
    else {
      //load new questions
      radMovieQuiz.loadNextQuestion();
    }

  });
};

radMovieQuiz.loadNextQuestion = () => {
  radMovieQuiz.IsQuizOn = true;
  radMovieQuiz.displayQuiz();
  $(".btnSubmit").text("Submit");
  $(".movieOption div").text("").removeClass();
  $(".btnSubmit").prop('disabled', true);

}


//reset Submit button
radMovieQuiz.resetEverything = () => {
  $(".btnSubmit").text("Play Again");
  radMovieQuiz.IsQuizOn = false;
}

//helper function to shuffle elements within an array (Fisher-Yates shuffle)
//source: https://javascript.info/task/shuffle
radMovieQuiz.shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    // swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//init function - on first load
radMovieQuiz.init = async function () {
  await radMovieQuiz.GetMovies(); //wait for all the results from the multiple API calls
  // let ninetiesMovies = radMovieQuiz.getRandomMovies(3, radMovieQuiz.ninetiesMovieArray);
  // let nonNinetiesMovies = radMovieQuiz.getRandomMovies(1, radMovieQuiz.nonNinetiesMovieArray);
  // let allmovies = radMovieQuiz.shuffle([...ninetiesMovies,...nonNinetiesMovies]); //shuffle the movies in the array
  // radMovieQuiz.displayQuiz(allmovies);

  radMovieQuiz.displayQuiz();

  radMovieQuiz.eventListener();
};

$(document).ready(function () {
  radMovieQuiz.init();
});


