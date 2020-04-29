const config = require('dotenv').config({ path: '../.env' });
const express = require('express');
const Twitter = require('twitter');
const path = require('path');
const app = express();
var cors = require('cors')

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
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

var spawn = require('child_process').spawn,
    ls    = spawn('python3',['crawler.py']);

output = ''
ls.stdout.on('data', (chunk) => {
  output += chunk.toString();
  console.log("DATA LOADED")
  newtext = output.split("\n")
  
});

ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
    
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  res.send({follow_count: follow_count, 
            tweet_count: tweet_count,
          tweet_impressions: newtext[0].replace(/['"]+/g, ''),
        profile_visits: newtext[1].replace(/['"]+/g, '')});
});


function getTime() {
  var tempDate = new Date();
  var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
  console.log("it is currently: " + date)
  return (
    date
  );
}
 
app.listen(process.env.PORT || 8080);