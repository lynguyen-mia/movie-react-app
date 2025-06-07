import React from "react";
import styles from "./Movie.module.css";
import defaultBackdrop from "../../images/default-backdrop.jpeg";
import defaultPoster from "../../images/default-poster.jpeg";

const Movie = (props) => {
  return (
    <React.Fragment>
      {props.movies?.map((movie, index) =>
        // prettier-ignore
        <div  onClick={(e) => props.onSelectMovie(e, movie.id, movie)}
              key={index}
              className={styles[`${props.originalType ? "img-container__original" : "img-container__types"}`]}>
              
              {/* Handle movies with no poster or backdrop*/}
              {props.originalType ?
                  <img
                       src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultPoster}
                       alt={movie.name}
                       className={styles['movie-img']}  />
                       
                : <img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`: defaultBackdrop}
                       alt={movie.name}
                       className={styles['movie-img']} />}
        </div>
      )}
    </React.Fragment>
  );
};

export default Movie;
