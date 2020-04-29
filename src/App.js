import React, { useState, useEffect } from 'react'
import './App.css';
import { FaGithub, FaTwitter, FaReact , FaPython} from "react-icons/fa";
import { Timeline } from 'react-twitter-widgets'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  icon: {
    marginLeft: '5px',
    letterSpacing: '1em',
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8080/");
      res
        .json()
        .then(res => setData(res))
        .catch(err => setErrors(err));
    }

    fetchData();
  });

  return (
    <div>
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
          <h1>Tennis Tweets </h1> 
          <h2 className = {classes.icon}>
          <Link style={{ color: 'rgb(0, 184, 230)' }} href="https://twitter.com/TennisScores2" underline = "none"> <FaTwitter /></Link>
            <Link style={{ color: 'rgb(0, 184, 230)' }} href="https://github.com/jschriemer/Tennis-Tweets" underline = "none"> <FaGithub /></Link> 
            <Link style={{ color: 'rgb(0, 184, 230)' }} href="https://reactjs.org/" underline = "none" > <FaReact /></Link>
            <Link style={{ color: 'rgb(0, 184, 230)' }} href="https://github.com/jschriemer/Tennis-Tweets" underline = "none"> <FaPython /></Link></h2>
          <h2> What is it? </h2>
          <p>Tennis Tweets is a Twitter bot that live tweets ATP & ITF tennis scores.
            I created this because <br></br>I am a tennis fan and I wanted to learn more about internet bots and web scraping. </p>
          <h2>What was it built with?</h2>
          <p>Built with Python and JavaScript (React) using the TwitterAPI, Tweepy, BeautifulSoup, and Selenium.</p>
          <h2>Monthly Statistics</h2>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <h3>{data.tweet_count}</h3>
              <p id = "stat">All Time Tweets</p>
            </Grid>
            <Grid item xs={3}>
            <h3>{data.tweet_impressions}</h3>
              <p id = "stat">Tweet Impressions</p>
            </Grid>
            <Grid item xs={3}>
              <h3>{data.follow_count}</h3>
              <p id = "stat">Followers</p>
            </Grid>
            <Grid item xs={3}>
            <h3>{data.profile_visits}</h3>
              <p id = "stat">Profile Visits</p>
            </Grid>
          </Grid>
          </Paper>
        </Grid>
      <Grid item xs={4}>
      <Paper className={classes.paper}>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'tennisscores2'
          }}
          options={{
            username: 'Tennis_Tweets',
            height: '550',
            width: '300'
          }}
          onLoad={() => console.log('Timeline is loaded! :)')}
          />
        </Paper>
        </Grid>
      </Grid>
    </div>
    </div>
  );
}



export default App;
