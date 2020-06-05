const express = require('express');
const Twitter = require('twitter');
const path = require('path');
const app = express();
var cors = require('cors')
var crawler = require('./crawler.js');
 
crawler.crawl().catch(function (err) {
  console.log("Error running crawler.js");
  console.log(err)
  });

const client = new Twitter({
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: ""
});

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});


var params = {screen_name: 'Tennisscores2'};
console.log("loading followers..")
client.get('followers/ids', params, function(error, tweets, response) {
  if (!error) {
    follow_count = tweets.ids.length
  }
});



console.log("loading tweets..")
var params2 = {screen_name: 'Tennisscores2', q: 'Tennisscores2'};
client.get('users/search', params2, function(error, tweets2, response) {
  if (!error) {
    tweet_count = tweets2[0].statuses_count
    user_id = tweets2[0].id;
  }
});


console.log("sending over data..")
app.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  res.send({follow_count: follow_count, 
            tweet_count: tweet_count,
          tweet_impressions: crawler.twt(),
         profile_visits: crawler.pro()
  })
  res.end();
});

 
app.listen(8080);