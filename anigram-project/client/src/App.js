import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, Dashboard , CreatePost, MainPage, ChatPage } from "./Pages"


const App = () => {
    return (
        <div className="App">
             <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/create" element={<CreatePost />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path ="/main" element={<MainPage />}/>
                <Route exact path ="/chats" element={<ChatPage />}/>
            </Routes> 
        </div>
    )
  }
export default App;
