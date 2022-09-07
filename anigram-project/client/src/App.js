import React from "react";
import { Routes, Route } from "react-router-dom";
import { PageWrapper } from "./layout";
import * as Pages from "./Pages";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pages.LandingPage />} />
        <Route path="/register" element={<Pages.Register />} />
        <Route path="/login" element={<Pages.Login />} />
        <Route exact path="/" element={<PageWrapper />}>
          <Route path="/create" element={<Pages.CreatePost />} />
          <Route path="/profile" element={<Pages.ProfilePage />} />
          <Route path="/feed" element={<Pages.FeedPage />} />

          <Route path="*" element={<Pages.NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
