// creating a namespace
const totallyRadMovieQuiz = {};

totallyRadMovieQuiz.movieResults = []; //all movie results stored here
totallyRadMovieQuiz.nonNinetiesAPIResults = []; //non90s movie results from API Call stored here
totallyRadMovieQuiz.NinetiesAPIResults = []; //90s movie results from API Call stored here

totallyRadMovieQuiz.nonNinetiesMovieArray = []; //non90s movie array
totallyRadMovieQuiz.NinetiesMovieArray = []; //90s movie array


//API Call URLs
totallyRadMovieQuiz.eightiesUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=1989-12-31&primary_release_date.gte=1987-01-01';
totallyRadMovieQuiz.oughtsUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2003-12-31&primary_release_date.gte=2000-01-01';
totallyRadMovieQuiz.ninetiesURl = 'https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&primary_release_date.lte=1999-12-31&primary_release_date.gte=1990-01-01&page='


//method to connect to The Movies DB API and retrieve 20 movies i.e 1 page
totallyRadMovieQuiz.movieApiCall = function(apiUrl) {

    return $.ajax({
        url: apiUrl,
        dataType: 'json',
        method: 'GET'
    });
}

//gets non 90s movies from the API and writes it to the non 90s movie array
totallyRadMovieQuiz.GetNonNinetiesMovies = function() {

    //retrieve '80s and '00s movies from the api
    totallyRadMovieQuiz.nonNinetiesAPIResults.push(totallyRadMovieQuiz.movieApiCall(totallyRadMovieQuiz.eightiesUrl));
    totallyRadMovieQuiz.nonNinetiesAPIResults.push(totallyRadMovieQuiz.movieApiCall(totallyRadMovieQuiz.oughtsUrl));

    $.when(...totallyRadMovieQuiz.nonNinetiesAPIResults)
        .then((...nonNinetiesPromises) => {

            let movieArray = nonNinetiesPromises.map(movies => {
                //console.log(movies[0].results);
                return movies[0].results;
            });

            totallyRadMovieQuiz.movieResults = movieArray;

            console.log(totallyRadMovieQuiz.movieResults);

            return totallyRadMovieQuiz.movieResults = movieArray;
        }).then(() => {
            console.log(' final then');
            console.log(totallyRadMovieQuiz.movieResults);

        });
}


//input: Array length, Output: random array index
totallyRadMovieQuiz.randomMovieIndex = (movieArrayLength) => {
    let movieIndex = Math.floor(Math.random(0, 1) * movieArrayLength);
    return movieIndex;
}


//init function
totallyRadMovieQuiz.init = function() {

    totallyRadMovieQuiz.GetNonNinetiesMovies();



    // console.log(totallyRadMovieQuiz.movieResults);


};


$(document).ready(function() {

    totallyRadMovieQuiz.init();

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