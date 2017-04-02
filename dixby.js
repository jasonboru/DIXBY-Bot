//node file system
const fs = require('fs');

//npm packages for OMDB request and inquirer to ask questions
const request = require('request');
const inquirer = require("inquirer");

//npm packages to get APi info from twitter & spotify
const Twitter = require('twitter');
const Spotify = require('spotify');

//grab twitter keys form the keys.js file
const keys = require('./keys.js');
 
//new Twitter api call
const client = new Twitter(keys.twitterKeys);

const userCommand = process.argv[2];  				//3rd argument [index 2] at terminal becomes dixbyCommand
var userData = process.argv.slice(3).join(" ");	//grabs all term typed in 4th argument and on 
var dataArray = [];

console.log("__________userData__________");
console.log(userData);
console.log("____________________________");

function dixbyCommand(command) {

	switch (command) {

		case 'my-tweets':
			console.log("Here are your last 20 tweets: ");
			twitterCall();
			break;

		case 'spotify-this-song':
			console.log("Here is some information on your song.");
			spotifyCall();
			break;

		case 'movie-this':
			console.log("Here is some information on your movie.");
			omdbCall();
			break;

		case 'do-what-it-says':
			console.log("Random choice...");
			randomCall();
			break;

		default:
			console.log("");
			console.log("there was an error"); 
			console.log("");
			console.log("Re-enter your command.");
			console.log("-----------------------");
			console.log("");
			console.log("'my-tweets': will show your last 20 tweets and when they were created at in your terminal/bash window.");
			console.log("'spotify-this-song <song title>': will show the following information about the song in your terminal/bash window");
			console.log("'movie-this <movie title>': will output detailed movie information to your terminal/bash window");
			console.log("'do-what-it-says': Dixby will randomly choose a command for you.");
			console.log("");
			console.log("-----------------------");
	}
}

function twitterCall() {
	console.log("twitter call")
}

function spotifyCall() {
	console.log("spotify call")
}

function omdbCall() {
	//console.log("omdb call")

    var movie = userData/*.replace(/\s/g, "+")*/ ;

    if(movie === ""){
        movie = "mr+nobody";
    }

    var omdbUrl = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r=json';

	console.log("__________omdb_url__________");
	console.log(omdbUrl);
	console.log("____________________________");

    request(omdbUrl, function (err, response, body) {
        if(err){
            throw err;
        }

        var data = JSON.parse(body);

        console.log("");
		console.log("____________Movie Info__________________");
		console.log("");
        console.log("Title: " + data.Title);
        console.log("Release Year: " + data.Year);
        console.log("IMDB Rating: " + data.imdbRating);
        console.log("Origin Country: " + data.Country);
        console.log("Language: " + data.Language);
        console.log("");
        console.log("Plot: " + data.Plot);
        console.log("");
        console.log("Actors: " + data.Actors.toString(", "));
        console.log("");
        console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
        console.log("Rotten Tomatoes URL: " + data.tomatoURL);
        console.log("________________________________________");

        //console.log(JSON.stringify(dataArray, null, 2));
    });
}

function randomCall() {
	console.log("random call")
}

dixbyCommand(userCommand);