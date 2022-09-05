import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreatePost, HomePage } from './Pages';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/create" element={<CreatePost />} />
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
