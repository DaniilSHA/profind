import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {authService} from "./api/auth/AuthService";
import {serverAPI} from "./api/auth/ServerAPI";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

authService.init();
serverAPI.start();

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

reportWebVitals();
