import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import DetailsPage from "./components/DetailsPage/DetailsPage";

const App = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  console.log(searchResults);

  return (
    <BrowserRouter>
      <Header
        setSearch={setSearch}
        search={search}
        setSearchResults={setSearchResults}
      />
      <Routes>
        <Route
          path="/"
          element={<HomePage searchResults={searchResults} search={search} />}
        />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
