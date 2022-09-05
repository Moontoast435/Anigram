import React from "react";
import { Routes, Route } from "react-router-dom";
import { PageWrapper } from "./layout";
import * as Pages from "./pages";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<PageWrapper />}>
        <Route exact path="/" element={<Pages.HomePage />} />
        <Route exact path="*" element={<Pages.NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
