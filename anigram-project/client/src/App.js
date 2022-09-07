import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  Layout  from "./layout/PageWrapper/Layout";
import * as Pages from './Pages';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pages.LandingPage />} />
        <Route path="/register" element={<Pages.Register />} />
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/create" element={<Pages.PostPage />} />
          <Route path="/profile" element={<Pages.ProfilePage />} />
          <Route path="/feed" element={<Pages.FeedPage />} />
          <Route path="/chats" element={<Pages.ChatPage />} />
          {/* <Route path="/edit/post/:id" element={<Pages.EditPost />} /> */}
        </Route>

        <Route path="*" element={<Pages.NotFoundPage />} />
      </Routes>
    </div>
  );
};
export default App;
