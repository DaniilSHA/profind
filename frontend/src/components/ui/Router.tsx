import React from 'react';
import {BrowserRouter, Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Main from "../main/Main";
import Login from "../login/Login";


const Router = () => {


    return <BrowserRouter>
        <Routes>
            <Route element={<Main/>} path='/'/>
            <Route element={<Main/>} path='/login'/>
            <Route element={<Main/>} path='/reg'/>
            <Route path='*' element={<div> Not found </div>}/>
        </Routes>
    </BrowserRouter>
}

export default Router;
