import React, { useState, useEffect } from "react";
import styles from "./Banner.module.css";
import useFetch from "../../hooks/use-fetch";
import defaultImg from "../../images/yJEFbFax9fb8ePB0rK9UIQoXMG4.jpeg";

const Banner = (props) => {
  const { error, sendRequest: fetchMovies } = useFetch();
  const [fetchedMovie, setFetchedMovie] = useState({});

  useEffect(() => {
    const fetchConfig = {
      url: `https://api.themoviedb.org/3/${props.onRequest.fetchNetflixOriginals}`
    };

    const dataHandleFn = (data) => {
      const result = data.results;
      const randomMovie = result[Math.floor(Math.random() * result.length)];

      setFetchedMovie({
        backdrop: randomMovie.backdrop_path
          ? `https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`
          : defaultImg,
        name: randomMovie["name"],
        overview:
          randomMovie["overview"].length > 300
            ? randomMovie["overview"].substring(0, 250) + "..."
            : randomMovie["overview"]
      });
    };

    fetchMovies(fetchConfig, dataHandleFn);
  }, [fetchMovies, props.onRequest.fetchNetflixOriginals]);

  return (
    <div className={styles.banner}>
      <div className={styles.layer}></div>
      <img
        src={!error ? fetchedMovie.backdrop : null}
        alt={fetchedMovie.name}
        className={styles["banner-img"]}
      />

      {!error && fetchedMovie.backdrop && (
        <div className={styles["movie-info"]}>
          <h2 className={styles["movie-title"]}>{fetchedMovie.name}</h2>
          <div className={styles.actions}>
            <button>Play</button>
            <button>My List</button>
          </div>
          <p className={styles["movie-overview"]}>{fetchedMovie.overview}</p>
        </div>
      )}
    </div>
  );
};

export default Banner;
