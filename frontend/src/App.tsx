import React, {useEffect} from 'react';
import './App.css';
import Router from "./components/ui/Router";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Router/>
            </div>
        </BrowserRouter>
    );
}

export default App;
