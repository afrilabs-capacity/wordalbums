import React, { useState, useEffect, useRef } from "react";

import { Routes, Route, Link } from "react-router-dom";
import Reader from "./pages/Reader";
import Dashboard from "./pages/dashboard";
import Master from "./pages/master";
import Publisher from "./pages/publisher/index";
import CreatePublisher from "./pages/publisher/create-publisher";
import CreateSeries from "./pages/publisher/series/create-series";
import Series from "./pages/publisher/series/index";
import PublicationOptions from "./pages/publisher/publication-options";
import Books from "./pages/publisher/series/books";
import Book from "./pages/publisher/series/book";
import CreateBook from "./pages/publisher/book/create-book";
import CreatePage from "./pages/publisher/book/create-page";
import AdHome from "./pages/publisher/ads";
import CreateAdvert from "./pages/publisher/ads/create-ad";

function App() {
  return (
    <Routes>
      <Route path="/reader/:uuid" element={<Reader />} />
      <Route path="/reader/:uuid/:pageuuid" element={<Reader />} />
      <Route path="/dashboard" element={<Master component={<Dashboard />} />} />
      <Route
        exact
        path="/publishers"
        element={<Master component={<Publisher />} />}
      />
      <Route
        exact
        path="/publisher/create-publisher"
        element={<Master component={<CreatePublisher />} />}
      />
      <Route
        exact
        path="/publisher/create-series/:userId"
        element={<Master component={<CreateSeries />} />}
      />
      <Route
        exact
        path="/publisher/publications/series/:userId"
        element={<Master component={<Series />} />}
      />
      <Route
        exact
        path="/publisher/:userId/publications/series/:seriesId/book/:bookId"
        element={<Master component={<Book />} />}
      />
      <Route
        exact
        path="/publisher/:userId/publications/series/:seriesId"
        element={<Master component={<Books />} />}
      />
      <Route
        exact
        path="/publisher/publications/options/:userId"
        element={<Master component={<PublicationOptions />} />}
      />
      <Route
        exact
        path="/publisher/create-book/:userId/:seriesId"
        element={<Master component={<CreateBook />} />}
      />
      <Route
        exact
        path="/publisher/create-book/:userId/"
        element={<Master component={<CreateBook />} />}
      />

      <Route
        exact
        path="/publisher/create-page/:userId/:bookId"
        element={<Master component={<CreatePage />} />}
      />
      <Route exact path="/ads" element={<Master component={<AdHome />} />} />
      <Route
        exact
        path="/ads/create"
        element={<Master component={<CreateAdvert />} />}
      />
    </Routes>
  );
}

export default App;
