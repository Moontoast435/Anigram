import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage } from "./Pages"

const App = () => {
    return (
        <div className="App">
             <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes> 
        </div>
    )

}

export default App;