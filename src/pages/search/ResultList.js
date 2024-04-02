import React, { useState, useContext } from "react";
import styles from "./ResultList.module.css";
import { APIContext } from "../../store/api-context";
import useFetch from "../../hooks/use-fetch";
import MovieDetail from "../browse/MovieDetail";
import defaultPoster from "../../images/default-poster.jpeg";

const ResultList = (props) => {
  const [seeDetails, setSeeDetails] = useState(false);
  const [movieDetails, getMovieDetails] = useState({});
  const [curId, setCurId] = useState();

  const ctx = useContext(APIContext);
  const { sendRequest: fetchMovie } = useFetch();

  const movieList = props.onShowResults;

  async function onFetchMovieDetails(e, id) {
    // Scroll element into view
    const element = e.target; // Target element
    const headerOffset = 70;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });

    // Check element id
    if (curId === id) {
      setSeeDetails(false);
      setCurId(null);
      return;
    }
    setCurId(id);

    try {
      // Fetch details of clicked movie
      const movieDetails = movieList.find((obj) => obj.id === id);
      // Fetch videos of clicked movie
      const videoConfig = {
        url: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ctx.API_KEY}`
      };
      const videoHandleFn = (data) => {
        // Store movie video data
        getMovieDetails({ videoData: data, details: movieDetails });
      };
      await fetchMovie(videoConfig, videoHandleFn);

      // Show movie detail section
      setSeeDetails(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className={styles["result-container"]}>
      <h2>Search Result</h2>
      <div className={styles["result-list"]}>
        {movieList.map((movie, index) => (
          <img
            key={index}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultPoster
            }
            alt={movie.title}
            onClick={(e) => onFetchMovieDetails(e, movie.id)}
          />
        ))}

        {movieList.length === 0 && (
          <p className={styles["no-sesult"]}>No movie found.</p>
        )}

        {seeDetails && (
          <MovieDetail
            video={movieDetails}
            seeDetails={setSeeDetails}
            search={true}
          />
        )}
      </div>
    </div>
  );
};

export default ResultList;
