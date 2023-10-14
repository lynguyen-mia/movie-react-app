import React, { useContext } from "react";
import { APIContext } from "../../store/api-context";
import NavBar from "./NavBar";
import Banner from "./Banner";
import MovieList from "./MovieList";

function Browse() {
  const ctx = useContext(APIContext);
  return (
    <div className="app">
      <NavBar />
      <Banner onRequest={ctx.requests} />
      <MovieList onRenderMovies={ctx.requests} />
    </div>
  );
}

export default Browse;
