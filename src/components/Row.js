import axios from "axios";
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Rows.css";

// if we have a default export, the inport name does not matter
// we can import using the name instance or axois or 1111, doesn't matter
//

const base_imgUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  // use state to keep track of movies
  const [movies, setmovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");

  //a snippet of code which runs base on a specific condition(useEffect)
  // when a row runs/loads, we make a request for the specific row
  useEffect(() => {
    // make a request and wait for it to comeback
    async function fetchData() {
      // this is our dependency, fetchurl,  both title and fetchurl is ouside the function block
      const request = await axios.get(fetchUrl);
      //   now we console.log(request); // see the data structure we get back;
      // following is s what we looking for
      setmovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // change [] to dependency
  // if [], run once when the row loads and don't run agin.
  //   if we put[movie], it's gonna run when row loads and every movie changes;
  // console.log (movies)

  //now we can console.log(movies) to see if everything is pulling back ok.
  // now we try to render out movies and poster
  //   console.table(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=x_EEwGe-a9o
          const urlParans = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParans.get("v"));
        })

        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      {/* this is our layout structure:::::: */}

      {/* <big div> */}
      {/* 1.      title */}
      {/* container div */}
      {/* 2.     several posters/ several movies * /}
      {/* container div */}
      {/* <big div> */}

      {/* we need these rows(posters and moviews) inside container cuz we need to scroll them. */}

      <h2>{title}</h2>

      <div className="row-posters">
        {/* now we use map to iterate through and get image back */}
        {movies.map((movie) => (
          <img
            //optimazation, in react, when render big data, we pass unique identity
            // so it doesn't re-render everything. FASTER, SMOOTH.
            // in this case, a unique key.
            key={movie.id}
            // add a onclick when click image we play video
            onClick={() => handleClick(movie)}
            // if you have isLargeRow functionality you get a diff class
            className={`row-poster ${isLargeRow && "row-poster-large"}`}
            // if largerow, make it a diff img path
            src={`${base_imgUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* install reactyoutube get opts on documentations */}
      {/* when we have a trailer url then we play the video */}
      {/* now we need a onclick function on image  */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
