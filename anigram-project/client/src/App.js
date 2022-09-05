import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, Dashboard  } from "./Pages"


const App = () => {
    return (
        <div className="App">
             <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes> 
        </div>
    )

}

export default App;