import React, { useState, useEffect } from 'react'
import './App.css';
import { FaGithub, FaTwitter, FaReact , FaPython} from "react-icons/fa";
import axios from 'axios';
import { Timeline, Follow } from 'react-twitter-widgets'
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
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
          <h1>Tennis Tweets </h1> 
          <h2 className = {classes.icon}>
          <Link href="https://twitter.com/TennisScores2" underline = "none"> <FaTwitter /></Link>
            <Link href="https://github.com/jschriemer/Tennis-Tweets" underline = "none"> <FaGithub /></Link> 
            <Link href="https://reactjs.org/" underline = "none" > <FaReact /></Link>
            <Link href="https://github.com/jschriemer/Tennis-Tweets" underline = "none"> <FaPython /></Link></h2>
          <h2> What is it? </h2>
          <p>Tennis Tweets is a Twitter bot that live tweets ATP & ITF tennis scores.
            I created this because <br></br>I am a tennis fan and I wanted to learn more about internet bots and web scraping. </p>
          <h2>What was it built with?</h2>
          <p>Built with Python and JavaScript (React) using libraries Tweepy and BeautifulSoup.</p>
          <h2>Total Statistics</h2>
          <span>{JSON.stringify(data)}</span>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <h3>12</h3>
              <p>Total Tweets</p>
            </Grid>
            <Grid item xs={3}>
              <h3>345</h3>
              <p>Tweet Impressions</p>
            </Grid>
            <Grid item xs={3}>
              <h3>8</h3>
              <p>Followers</p>
            </Grid>
            <Grid item xs={3}>
              <h3>12</h3>
              <p>Profile Visits</p>
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
  );
}



export default App;
