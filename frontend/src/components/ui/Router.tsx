import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "../main/Main";
import Login from "../login/Login";


const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<Main/>} path='/'/>
            <Route element={
                <div>
                    <Login />
                    <Main />
                </div>
            } path='/login'/>
            <Route path='*' element={<div> Not found </div>}/>
        </Routes>
    </BrowserRouter>
}

export default Router;
