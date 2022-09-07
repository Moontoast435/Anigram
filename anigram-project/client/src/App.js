import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { PageWrapper } from "./layout";
import * as Pages from './Pages';

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* <Route exact path="/" element={<PageWrapper />}> */}
        <Route exact path="/" element={<Pages.Home />} />
        <Route exact path="/register" element={<Pages.Register />} />
        <Route exact path="/create" element={<Pages.CreatePost />} />
        <Route exact path="/login" element={<Pages.Login />} />
        <Route exact path="/dashboard" element={<Pages.Dashboard />} />
        <Route exact path="/main" element={<Pages.MainPage />} />
        <Route exact path="/chats" element={<Pages.ChatPage />} />
        <Route exact path="/edit/post/:id" element={<Pages.EditPost />} />

        <Route exact path="*" element={<Pages.NotFoundPage />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
};
export default App;
