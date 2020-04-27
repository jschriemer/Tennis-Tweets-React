const express = require('express');
const Twitter = require('twitter');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const client = new Twitter({
  
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

var params = {screen_name: 'Tennisscores2'};
console.log("loading followers")
client.get('followers/ids', params, function(error, tweets, response) {
  if (!error) {
    follow_count = tweets.ids.length
  }
});
console.log("loading tweets")
var params2 = {screen_name: 'Tennisscores2', q: 'Tennisscores2'};
client.get('users/search', params2, function(error, tweets2, response) {
  if (!error) {
    tweet_count = tweets2[0].statuses_count
  }
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  res.send({follow_count: follow_count, 
            tweet_count: tweet_count});
});

app.listen(process.env.PORT || 8080);