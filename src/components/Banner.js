import axios from "axios";
import React, { useState, useEffect } from "react";
import requests from "../requests";
import "./Banner.css";

function Banner() {
  //set up a random movie every time and use it as header
  // usestate keep track of movies
  const [movie, setmovie] = useState([]);

  //use effect ,a piece of code runs in a given condition
  //we want this to run when banner component loads

  useEffect(() => {
    async function fetchData() {
      //now we need predefine requests so import it
      const request = await axios.get(requests.fetchTrending);
      //now we want to chose a random one for header
      //Math.floor(Math.random() * request.data.results.length -1);
      //check what we get console.log(request.data.result[Math.floor(Math.random() * request.data.results.length - 1])

      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }
    fetchData();
  }, []);
  // to test it's working, do a console.log (movie)
  //this function is use to limite the movie description words.  from stackoverflow https://stackoverflow.com/questions/36703544/truncate-a-string-javascript
  function truncate(str, max) {
    return str?.length > max ? str.substr(0, max - 1) + "…" : str;
  }

  return (
    //layout structure
    //header instead of div because it's in the top

    // <header> {/* give header  a background image */}
    //   {/* title */}
    // container div
    //   2 buttons
    //   description
    //  container div
    // </header>

    <header
      className="banner"
      style={{
        //take up the container
        backgroundSize: "cover",
        // if no movie .handle it
        backgroundImage: `url(
                  "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        //center it
        backgroundPosition: "top",
      }}
    >
      {/* question marks is cool */}
      <div className="banner-contents">
        {/* this our title */}
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* add 2 buttons */}
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        {/* description { movie?.overview, 150}*/}
        <h1 className="banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>
      {/* empty div , fadebottom , invisial banner */}
      <div className="banner-fadebottom" />
    </header>
  );
}

export default Banner;
