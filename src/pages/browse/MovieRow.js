import React, { useEffect, useState, useContext } from "react";
import styles from "./MovieRow.module.css";
import Movie from "./Movie";
import useFetch from "../../hooks/use-fetch";

import MovieDetail from "./MovieDetail";
import { APIContext } from "../../store/api-context";

const MovieRow = (props) => {
  const { sendRequest: fetchMovies } = useFetch();
  const [movieArr, setMovieArr] = useState([]);

  const [seeDetails, setSeeDetails] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [curId, setCurId] = useState(null);
  const ctx = useContext(APIContext);

  // Render a row of movies
  useEffect(() => {
    try {
      const originalConfig = {
        url: `https://api.themoviedb.org/3/${props.movieArrAPI}`
      };

      // Fetch movies of different types for each row
      fetchMovies(originalConfig, (data) => setMovieArr(data.results));
    } catch (err) {
      console.error(err.message);
    }
  }, [fetchMovies]);

  // Render movie details upon clicking a movie
  async function onClickMovie(e, id, movie) {
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
      // Fetch videos of clicked movie
      const movieConfig = {
        url: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ctx.API_KEY}`
      };
      const dataHandleFn = (data) => {
        // Store movie details
        setMovieDetails({ videoData: data, details: movie });
      };
      await fetchMovies(movieConfig, dataHandleFn);

      // Show movie detail section
      setSeeDetails(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <React.Fragment>
      <h2 className={styles["list-title"]}>{props.title}</h2>
      <div className={styles["movies-row"]}>
        <Movie
          originalType={props.original}
          movies={movieArr}
          onSelectMovie={onClickMovie}
        />
      </div>

      {/* Movie information card */}
      {seeDetails && (
        <MovieDetail video={movieDetails} seeDetails={setSeeDetails} />
      )}
    </React.Fragment>
  );
};

export default MovieRow;
