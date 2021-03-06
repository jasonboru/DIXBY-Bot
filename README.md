# UCF Coding Bootcamp Week 10 Project (DIXBY Bot)

### Overview

For this assignment, I made DIXBY. DIXBY is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, DIXBY is a command line interface. DIXBY is a command line node app that takes in parameters and gives you back data.

### Install Dixby

1. Fork or clone this repo to your local machine.

2. Install the needed node packages (homework assigned).
   * [Twitter](https://www.npmjs.com/package/twitter)
   * [Spotify](https://www.npmjs.com/package/spotify)
   * [Request](https://www.npmjs.com/package/request)

3. Install the needed node packages (extra ones I choose to use).
   * [Colors](https://www.npmjs.com/package/colors) - used to color the text and make it more readable.
   * [Inquirer](https://www.npmjs.com/package/inquirer) - used to ask for a handle on the my-tweets command.
   * [Moment](https://www.npmjs.com/package/moment) - used to format the timestamps on tweets and timestamps in log.txt.

### Instructions

1. Make your own JavaScript file named `keys.js`. Twitter assigns user specific keys & secrets. Contact Twitter to get your own and add them to the keys.js file in the following format:

```JavaScript
console.log('this is loaded');

exports.twitterKeys = {
  consumer_key: '<input here>',
  consumer_secret: '<input here>',
  access_token_key: '<input here>',
  access_token_secret: '<input here>',
}
```

2. Get your Twitter API keys by following these steps:

   * Step One: Visit <https://apps.twitter.com/app/new>
   * Step Two: Fill out the form with dummy data. Type `http://google.com` in the Website input. Don't fill out the Callback URL input. Then submit the form.
   * Step Three: On the next screen, click the Keys and Access Tokens tab to get your consume key and secret. 
     * Copy and paste them where the `<input here>` tags are inside your keys.js file.
   * Step Four: At the bottom of the page, click the `Create my access token` button to get your access token key and secret. 
     * Copy the access token key and secret displayed at the bottom of the next screen. Paste them where the `<input here>` tags are inside your keys.js file.

4. To run Dixby go to Terminal/Bash command line and navigate to the Dixby folder.

5. dixby.js can take in one of the following commands:

   * `my-tweets`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### What Each Command Will Do

1. `node dixby.js my-tweets`

   * This command will prompt Dixby to ask for a twitter handle and then return the last 20 tweets (and when they were created) of that handle. If a handle is not typed in it will deafault to my twitter handle jasonboru. If you want to change the default to your own handle just type it into the default property inside the inquirer.prompt within the twtterCall function inside dixby.js.

2. `node dixby.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window (up to 20 results)
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

   * if no song is provided then Dixby will default to
     * "The Sign" by Ace of Base

3. `node dixby.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
       * Rotten Tomatoes Rating.
       * Rotten Tomatoes URL.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     * It's on Netflix!

4. `node dixby.js do-what-it-says`
   * Using the `fs` Node package, DIXBY will take the text from inside of random.txt and then turn it to an array and pick a random index and use it to call one of DIXBY's commands.
     * Currenty it will run one of 3 commands randomly
     	* `spotify-this-song` for "I Want it That Way,".
     	* `my-tweets`.
     	* `movie-this` for "Spotlight".

### Log

* In addition to logging the data to your terminal/bash window, Dixby will output the data to a .txt file called `log.txt`.

* If the log.txt file does not yet exist Dixby will create it and add a timestamp, command used, error true or false, and additional info.

* If the file exists, Dixby will add data to it after each Dixby command. It will not overwrite previous info.

- - -

## Copyright

Jason O'Brien (C) 2017.
