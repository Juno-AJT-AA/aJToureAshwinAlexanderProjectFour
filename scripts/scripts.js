// creating a namespace
const radMovieQuiz = {};

radMovieQuiz.allAPIResults = []; //all movie results from API Call stored here
radMovieQuiz.nonNinetiesAPIResults = []; //non90s movie results (promises) from API Call stored here
radMovieQuiz.ninetiesAPIResults = []; //90s movie results (promises) from API Call stored here

radMovieQuiz.nonNinetiesMovieArray = []; //non90s movie array
radMovieQuiz.NinetiesMovieArray = []; //90s movie array


//The Movie Database API Call URLs. See themoviedb.org for API docs
radMovieQuiz.eightiesUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=1989-12-31&primary_release_date.gte=1987-01-01';
radMovieQuiz.oughtsUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2003-12-31&primary_release_date.gte=2000-01-01';
radMovieQuiz.nonNinetiesURLArray = [];
radMovieQuiz.ninetiesURl = 'https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_date.lte=1999-12-31&primary_release_date.gte=1990-01-01&page=';
radMovieQuiz.ninetiesURLArray = [];

//method to append page number to 90s movies API call parameters
radMovieQuiz.generateNinetiesURLArray = (baseUrl, numPages) => {
    for (let i = 1; i < numPages + 1; i++) {
        radMovieQuiz.ninetiesURLArray.push(baseUrl + i);
    }
}

//method to connect to The Movies DB API and retrieve 20 movies i.e 1 page
radMovieQuiz.movieApiCall = function(apiUrl) {

    return $.ajax({
        url: apiUrl,
        dataType: 'json',
        method: 'GET'
    });
}

//Promises for non Nineties movies API calls (movies from 80s and 2000s)
radMovieQuiz.getNonNinetiesPromises = function() {
    radMovieQuiz.nonNinetiesURLArray = [radMovieQuiz.eightiesUrl, radMovieQuiz.oughtsUrl];
    //retrieve '80s and '00s movies from the api and push promises to an array
    for (let i = 0; i < radMovieQuiz.nonNinetiesURLArray.length; i++) {

        radMovieQuiz.nonNinetiesAPIResults.push(radMovieQuiz.movieApiCall(radMovieQuiz.nonNinetiesURLArray[i]));
    }
    return radMovieQuiz.nonNinetiesAPIResults;
}

//Promises for Nineties movies API calls
radMovieQuiz.getNinetiesPromises = function() {

    //generate the 90s Movies API Urls - 6 pages of movies
    radMovieQuiz.generateNinetiesURLArray(radMovieQuiz.ninetiesURl, 6);

    //retrieve '90s movies from the api and push promises to an array
    for (let j = 0; j < radMovieQuiz.ninetiesURLArray.length; j++) {
        radMovieQuiz.ninetiesAPIResults.push(radMovieQuiz.movieApiCall(radMovieQuiz.ninetiesURLArray[j]));
    }
    return radMovieQuiz.ninetiesAPIResults;
}

//gets movies from the API and writes it to non 90s movie array and a 90s movie array
radMovieQuiz.GetMovies = async() => {

    radMovieQuiz.nonNinetiesAPIResults = radMovieQuiz.getNonNinetiesPromises();
    radMovieQuiz.NinetiesAPIResults = radMovieQuiz.getNinetiesPromises();
    radMovieQuiz.allAPIResults = radMovieQuiz.ninetiesAPIResults.concat(radMovieQuiz.nonNinetiesAPIResults);

    //extracting non 90s movies
    await $.when(...radMovieQuiz.nonNinetiesAPIResults)
        .then((...nonNinetiesPromises) => {

            radMovieQuiz.movieResults = nonNinetiesPromises.map(movies => {
                return movies[0].results;
            });
            return radMovieQuiz.movieResults;
        })
        .done(function(movieResults) {

            radMovieQuiz.nonNinetiesMovieArray = movieResults;
        });

    //extracting 90s movies
    await $.when(...radMovieQuiz.ninetiesAPIResults)
        .then((...NinetiesPromises) => {

            radMovieQuiz.movieResults = NinetiesPromises.map(movies => {
                return movies[0].results;
            });
            return radMovieQuiz.movieResults;
        })
        .done(function(movieResults) {
            console.log('90s movie results');
            radMovieQuiz.ninetiesMovieArray = movieResults;
        });
}

//input: Array length, Output: random array index
radMovieQuiz.randomMovieIndex = (movieArrayLength) => {
    let movieIndex = Math.floor(Math.random(0, 1) * movieArrayLength);
    return movieIndex;
}

//init function
radMovieQuiz.init = async function() {
    console.log('init commences');
    await radMovieQuiz.GetMovies();
    console.log(radMovieQuiz.ninetiesMovieArray);
    console.log(radMovieQuiz.nonNinetiesMovieArray);
    console.log('init finishes');
    // radMovieQuiz.GetNonNinetiesMovies();
    // console.log(totallyRadMovieQuiz.movieResults);
};


$(document).ready(function() {
    radMovieQuiz.init();
});






// done done done
//call the api and retrieve movies  from 2000 - 2003 THAT have a movie poster sorted by popularity 
//call the api and retrieve movies from 1987 - 1989/12 THAT have a movie poster sorted by popularity 
//call the api and retrieve movies from 1990 - 1999 THAT have a movie poster sorted by popularity 
// done done done

// get four random movies
//movie object = poster link, title, release date, description
//array 1 = api call 1 + api call 2  (30) from non90s 20+20 
//array 2 = api call 3  (30*4) from 90s 20*6 

//>>>>>START FROM HERE ON PLAY AGAIN

//select three RANDOM movies from array 2 and  1 RANDOM movie from array 1
// CONST MOVIE1, MOVIE2, MOVIE3, CORRECTOPTION
//display onto the page
//jquery append li img (add on class to give )
//BUTTON SUBMIT IS VISIBLE BUT DISABLED 


//on IMAGE HOVER
//BORDER CHANGES COLOR

//on IMAGE click, 
//add CLASS  border (gray) TO SELECTED IMAGE
//BUTTON SUBMIT BECOMES ENABLED 

//ON BUTTON SUBMIT CLICK, 
// ADD "WRONG STYLE" CLASS TO 3 LIST ITEMS 
// ADD "RIGHT STYLE" CLASS TO 1 LIST ITEM
// IF SELECTEDMOVIE == CORRECTOPTION 
// DISPLAY LABEL WITH CONGRATULATORY MESSAGE 
// ELSE 
// DISPLAY FAILURE MESSAGE 
// BUTTON SUBMIT TEXT CHANGES TO "PLAY AGAIN!"



// totallyRadMovieQuiz.baseUrl = 'https://image.tmdb.org/t/p/w780';
//totallyRadMovieQuiz.eightiesUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=1989-12-31&primary_release_date.gte=1987-01-01';
//totallyRadMovieQuiz.ninetiessUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=1999-12-31&primary_release_date.gte=1990-01-01';
//totallyRadMovieQuiz.oughtsUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2003-12-31&primary_release_date.gte=2000-01-01';

//     totallyRadMovieQuiz.getMovies = $.ajax({
//         url: totallyRadMovieQuiz.url,
//         method: 'GET',
//         dataType: 'JSON',
//     });

//     console.log(totallyRadMovieQuiz.getMovies);