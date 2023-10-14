import React, { useState, useContext } from "react";
import { APIContext } from "../../store/api-context";
import NavBar from "../browse/NavBar";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const ctx = useContext(APIContext);

  // Find movies based on input query
  const onFindMovie = async (searchQuery, showResult = true) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&api_key=${ctx.API_KEY}`
      );
      const results = await res.json();
      setSearchResults(results);

      // Display search result
      setShowResult(showResult);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <NavBar />
      <SearchForm onSearch={onFindMovie} />
      {showResult && <ResultList onShowResults={searchResults.results} />}
    </div>
  );
};

export default Search;
