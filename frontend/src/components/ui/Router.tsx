import React from 'react';
import {BrowserRouter, Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Main from "../main/Main";
import Reg from "../registration/Reg";
import Login from "../login/Login";


const Router = () => {


    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main/>}>
                <Route path='/login' element={<Login/>}/>
                <Route path='/reg' element={<Reg/>}/>
                <Route path='*' element={<div> Not found </div>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default Router;
