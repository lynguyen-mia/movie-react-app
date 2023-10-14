import React, { useState, useContext } from "react";
import styles from "./MovieList.module.css";
import MovieRow from "./MovieRow";
// import MovieDetail from "./MovieDetail";

import useFetch from "../../hooks/use-fetch";
// import { APIContext } from "../../store/api-context";

const MovieList = (props) => {
  const original = props.onRenderMovies.fetchNetflixOriginals;
  const trend = props.onRenderMovies.fetchTrending;
  const topRated = props.onRenderMovies.fetchTopRated;
  const action = props.onRenderMovies.fetchActionMovies;
  const comedy = props.onRenderMovies.fetchComedyMovies;
  const horror = props.onRenderMovies.fetchHorrorMovies;
  const romance = props.onRenderMovies.fetchRomanceMovies;
  const documentary = props.onRenderMovies.fetchDocumentaries;

  // const [seeDetails, setSeeDetails] = useState(false);
  // const [movieDetails, setMovieDetails] = useState({});
  // const [curId, setCurId] = useState(null);

  // const ctx = useContext(APIContext);
  // const { sendRequest: fetchMovie } = useFetch();

  // async function onClickMovie(e, id, movie) {
  //   // Scroll element into view
  //   const element = e.target; // Target element
  //   const headerOffset = 70;
  //   const elementPosition = element.getBoundingClientRect().top;
  //   const offsetPosition = elementPosition + window.scrollY - headerOffset;

  //   window.scrollTo({
  //     top: offsetPosition,
  //     behavior: "smooth"
  //   });

  //   // Check element id
  //   if (curId === id) {
  //     setSeeDetails(false);
  //     setCurId(null);
  //     return;
  //   }

  //   setCurId(id);

  //   try {
  //     // Fetch videos of clicked movie
  //     const movieConfig = {
  //       url: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ctx.API_KEY}`
  //     };
  //     const dataHandleFn = (data) => {
  //       // Store movie details
  //       setMovieDetails({ videoData: data, details: movie });
  //     };
  //     await fetchMovie(movieConfig, dataHandleFn);

  //     // Show movie detail section
  //     setSeeDetails(true);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  return (
    <div className={styles["movie-list"]}>
      <MovieRow
        title=""
        movieArrAPI={original}
        original={true}
        // onGetDetails={onClickMovie}
      />
      <MovieRow
        title="XU HƯỚNG"
        movieArrAPI={trend}
        // onGetDetails={onClickMovie}
      />
      <MovieRow
        title="XẾP HẠNG CAO"
        movieArrAPI={topRated}
        // onGetDetails={onClickMovie}
      />
      <MovieRow
        title="HÀNH ĐỘNG"
        movieArrAPI={action}
        // onGetDetails={onClickMovie}
      />
      <MovieRow title="HÀI" movieArrAPI={comedy} />
      <MovieRow
        title="KINH DỊ"
        movieArrAPI={horror}
        // onGetDetails={onClickMovie}
      />
      <MovieRow
        title="LÃNG MẠN"
        movieArrAPI={romance}
        // onGetDetails={onClickMovie}
      />
      <MovieRow
        title="TÀI LIỆU"
        movieArrAPI={documentary}
        // onGetDetails={onClickMovie}
      />

      {/* {seeDetails && <MovieDetail video={movieDetails} />} */}
    </div>
  );
};

export default MovieList;
