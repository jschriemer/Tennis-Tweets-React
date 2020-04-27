import React from 'react';
import './App.css';
import { FaGithub, FaTwitter, FaReact } from "react-icons/fa";
import { Timeline, Follow } from 'react-twitter-widgets'

function App() {
  return (
    <div className="App">
      <h1>Tennis Tweets  <FaTwitter /></h1> 
      <Follow
        username ="Tennisscores2"
        />
      <h2> What is it? </h2>
      <p></p>
      <h2>What was it built with?</h2>
      <p></p>
      <h2>Total Statistics</h2>
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: 'tennisscores2'
        }}
        options={{
          username: 'Tennis_Tweets',
          height: '400',
          width: '300'
        }}
        onLoad={() => console.log('Timeline is loaded!')}
      />
    </div>
  );
}

export default App;
