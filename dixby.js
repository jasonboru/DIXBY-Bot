//node file system
const fs = require('fs');

//npm packages for OMDB request and inquirer to ask questions
const request = require('request');
const inquirer = require("inquirer");
const moment = require('moment');

//npm packages to get APi info from twitter & spotify
const twitter = require('twitter');
const spotify = require('spotify');

//grab twitter keys form the keys.js file
const keys = require('./keys.js');

//new Twitter api call
const client = new twitter(keys.twitterKeys);

const userCommand = process.argv[2]; //3rd argument [index 2] at terminal becomes dixbyCommand
var userData = process.argv.slice(3).join(" "); //grabs all terms typed in 4th argument and on

//console.log("__________userData__________");
//console.log(userData);
//console.log("____________________________");

//Switch statement to run the right function based off the command by the user
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

//function to call to twitter for last 20 tweets
function twitterCall() {
    //parameters object used in twitter call
    var parameters = {
        screen_name: 'jasonboru',
        count: "20"
    };
    //twitter call based on their docs
    client.get('statuses/user_timeline', parameters, function(error, tweets) {
        if (error) {
            throw error;
        }
        //loop through the rturned tweets to print each one.
        for (var i = 0; i < tweets.length; i++) {
        	var tweetTime = moment(new Date(tweets[i].created_at));
        	var tweetTimeStamp = tweetTime.format("dddd, MMMM Do YYYY, h:mm:ss a");
            var tweetNum = i + 1;
            console.log("___________Tweet# " + tweetNum + "____"+ "(" + JSON.stringify(tweetTimeStamp) + ")" +"____________"); 
            console.log("");           
            var tweetPost = tweets[i].text            
            console.log(JSON.stringify(tweetPost));
            console.log("______________________________________________________________________");
            console.log("");
            console.log("");
        }
        // add logEntry to log.txt
        logEntry.tweetsReturned = tweets.length;
        logData(logEntry);
    });
}

// function to call spotify for song info
function spotifyCall() {

    var song = userData; 

    if (song === "") {
        song = "the+sign+ace+of+base"
    }

    var param = {
        type: "track",
        query: song
    };

    spotify.search(param, function(err, data) {
        if (err) {
        	logEntry.error= true;
            throw err;
        }

        //console.log("*********spotify-data***************");
        //console.log(JSON.stringify(data.tracks.items[0],  null, 2));
        //console.log("************************************");  

        logEntry.artist = data.tracks.items[0].artists[0].name;
        logEntry.song = data.tracks.items[0].name;
        logEntry.preview = data.tracks.items[0].preview_url; 
        logEntry.albumn = data.tracks.items[0].album.name;     

        console.log("");
        console.log("____________Song Info__________________");
        console.log("");
        console.log("Artist: " + logEntry.artist);
        console.log("Song Name: " + logEntry.song);
        console.log("Preview URL: " + logEntry.preview);
        console.log("Album: " + logEntry.albumn);
        console.log("________________________________________");
        logEntry.response = 'success';

        logData(logEntry);
    });
}

// function to call spotify for song info
function omdbCall() {
    
    var movie = userData;

    if (movie === "") {
        movie = "mr+nobody";
    }

    var omdbUrl = 'http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r=json';

    //console.log("__________omdb_url__________");
    //console.log(omdbUrl);
    //console.log("____________________________");

    request(omdbUrl, function(err, response, body) {
        if (!err && response.statusCode === 200) {

	        var data = JSON.parse(body);

	        logEntry.title = data.Title;
		    logEntry.released = data.Year;	    	
		    logEntry.imdbRating = data.imdbRating;	    	
		    logEntry.country = data.Country;	    	
		    logEntry.language = data.Language;
		    logEntry.plot = data.Plot;
		    logEntry.actors = data.Actors;
		    logEntry.tomatoRating = data.Ratings[1].Value;
		    logEntry.tomatoURL = data.tomatoURL;

	        console.log("");
	        console.log("____________Movie Info__________________");
	        console.log("");
	        console.log("Title: " + logEntry.title);
	        console.log("Release Year: " + logEntry.released);
	        console.log("IMDB Rating: " + logEntry.imdbRating);
	        console.log("Origin Country: " + logEntry.country);
	        console.log("Language: " + logEntry.Language);
	        console.log("");
	        console.log("Plot: " + logEntry.plot);
	        console.log("");
	        console.log("Actors: " + logEntry.actors);
	        console.log("");
	        if (data.Ratings[1] === undefined) {
	            console.log("Rotten Tomatoes Rating: N/A")
	        } else {
	            console.log("Rotten Tomatoes Rating: " + logEntry.tomatoRating);
	        }
	        console.log("Rotten Tomatoes URL: " + data.tomatoURL);
	        console.log("________________________________________");
	        logEntry.response = 'success';
	    } else {
	    	throw err
	    	logEntry.error= true;
	    }

	logData(logEntry);

    });
}

// function to call a random command from random.txt
function randomCall() {

    fs.readFile('random.txt', 'utf-8', function(err, data) {
        if (err) {
            throw err;
        } else {
            var commandList = data.split("|");                                  //splits the array in random.txt by the |
            var randomIndex = Math.floor(Math.random() * commandList.length);   //generates a random index of the array based on its length
            var randomChoice = commandList[randomIndex].split(",");             //grabs argv2 (and argv3 if its there then splits it by the comma)
            var randomCommand = randomChoice[0];                                //random command becomes the first index of randomChoice
            if (randomChoice[1]) {                                              //if there is a 2nd index in randomChoice....
                userData = randomChoice[1];                                     //use the sencond index of randomChoice as userData
            }

            dixbyCommand(randomCommand);                                        //call dixbyCommand function based of randomCommand
        }
    });

}

// function to add info to the log.txt file
function logData(object) {
	if (!fs.existsSync('log.txt')) {                                           //check to see if log.txt exists
		fs.writeFileSync('log.txt', "[" + JSON.stringify(object) + "]");       // if not create the file and add the argument passed into it when called
	} else {
		fs.readFile('log.txt', 'utf-8', function(err, data) {                  // else the file already exist read it to get current data
			if (err) {
				console.log(err);
			}

			var arr = JSON.parse(data);                                        // variable for the existing data in file

			arr.push(object);                                                  // push the argument into the array taken from log.txt 

			fs.writeFile('log.txt', JSON.stringify(arr), function(err) {       // re-write the new more complete arr onto the log.txt file
  				if (err) {
                    throw err;
                }
  			});
			
		});
	}
}

var logTimeStamp = moment(new Date());                                         // use moment() to grab the current time at submission
    logTimeStamp = logTimeStamp.format("dddd, MMMM Do YYYY, h:mm:ss a");       // use moment to format the date more readable
var logEntry = {                                                               // every log entry will have a timestamp, the command used, and error status
	logTimestamp: logTimeStamp, 
	command: userCommand, 
	error: false
};

//calls the dixbyCommand function on userCommand
dixbyCommand(userCommand);                  
