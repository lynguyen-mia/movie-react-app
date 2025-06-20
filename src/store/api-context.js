import React, { useMemo, createContext } from "react";

const API_KEY = "9a455d806a595e3a9558a8da9c09a147";

const APIContext = createContext();

const APIContextProvider = (props) => {
  const requests = useMemo(
    () => ({
      fetchTrending: `trending/all/week?api_key=${API_KEY}&language=en-US`,
      fetchNetflixOriginals: `discover/tv?api_key=${API_KEY}&with_network=123`,
      fetchTopRated: `movie/top_rated?api_key=${API_KEY}&language=en-US`,
      fetchActionMovies: `discover/movie?api_key=${API_KEY}&with_genres=28`,
      fetchComedyMovies: `discover/movie?api_key=${API_KEY}&with_genres=35`,
      fetchHorrorMovies: `discover/movie?api_key=${API_KEY}&with_genres=27`,
      fetchRomanceMovies: `discover/movie?api_key=${API_KEY}&with_genres=10749`,
      fetchDocumentaries: `discover/movie?api_key=${API_KEY}&with_genres=99`,
      fetchSearch: `search/movie?api_key=${API_KEY}&language=en-US`,
    }),
    []
  );

  return (
    <APIContext.Provider value={{ API_KEY, requests }}>
      {props.children}
    </APIContext.Provider>
  );
};

export { APIContext, APIContextProvider };
