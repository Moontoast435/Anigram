import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, ChatPage } from "./Pages"

const App = () => {
    return (
        <div className="App">
             <Routes>
                <Route exact path="/" element={<HomePage />} />
            </Routes> 
        </div>
    )

}

export default App;
