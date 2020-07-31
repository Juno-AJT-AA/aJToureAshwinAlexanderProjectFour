// creating a namespace
const totallyRadMovieQuiz = {};

totallyRadMovieQuiz.movieResults = [];

totallyRadMovieQuiz.eightiesUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=1989-12-31&primary_release_date.gte=1987-01-01';
totallyRadMovieQuiz.oughtsUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2003-12-31&primary_release_date.gte=2000-01-01';
// totallyRadMovieQuiz.ninetiesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&primary_release_date.lte=1999-12-31&primary_release_date.gte=1990-01-01`;




//init function
totallyRadMovieQuiz.init = function() {

    totallyRadMovieQuiz.movieApiCall(totallyRadMovieQuiz.eightiesUrl); //eighties 
    totallyRadMovieQuiz.movieApiCall(totallyRadMovieQuiz.oughtsUrl); //2000s

    for (i = 1; i < 7; i++) {
        totallyRadMovieQuiz.ninetiesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=bbdeeb2ee8dee00541ba5f527454ce0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&primary_release_date.lte=1999-12-31&primary_release_date.gte=1990-01-01`;
        totallyRadMovieQuiz.movieApiCall(totallyRadMovieQuiz.ninetiesUrl);
    }
    console.log(totallyRadMovieQuiz.movieResults);

};


//function to connect to The Movies DB API and retrieve 20 movies i.e 1 page
totallyRadMovieQuiz.movieApiCall = function(apiUrl) {
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'JSON',
    }).then(function(object) {

        totallyRadMovieQuiz.movieResults.push(object.results);


    });
}




//console.log(totallyRadMovieQuiz.getMovies.responseJSON.results[0]);

//call the api and retrieve movies  from 2000 - 2003 THAT have a movie poster sorted by popularity 

//call the api and retrieve movies from 1987 - 1989/12 THAT have a movie poster sorted by popularity 



//call the api and retrieve movies from 1990 - 1999 THAT have a movie poster sorted by popularity 

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


$(document).ready(function() {

    totallyRadMovieQuiz.init();

});

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