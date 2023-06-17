import React from 'react';
import './App.css';
import Router from "./components/ui/Router";
import {authService} from "./auth/AuthService";
import {serverAPI} from "./auth/ServerAPI";

function App() {
    serverAPI.tokenCheck('govno');
    return (
        <div className="App">
            <Router/>
        </div>
    );
}

export default App;
