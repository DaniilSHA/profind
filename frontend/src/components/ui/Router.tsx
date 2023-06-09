import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Main from "../main/Main";
import Reg from "../registration/Reg";
import Login from "../login/Login";
import Home from "../home/Home";
import {useSelector} from "react-redux";
import Profile from "../profile/Profile";


const Router = () => {
    const isAuth: boolean = useSelector((state: any) => state.authLog.authData.isAuth);
    const currentRole = useSelector((state: any) => state.authLog.profileData.profile.role);
    const navigate = useNavigate();

    const backToMain = () => {
        navigate('/');
    }

    return (
        <>
            <Routes>
                <Route path='/' element={<Main/>}>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/reg' element={<Reg/>}/>
                </Route>
                <Route path='*' element={<div> Not found, <a onClick={backToMain}>back to main</a></div>}/>
                {isAuth &&
                    <Route path='/home' element={<Home/>}>
                        <Route path='find' element={<div>FIND</div>}/>
                        <Route path='matches' element={<div>MATCHES</div>}/>
                        <Route path='profile' element={<Profile/>}/>
                        {(currentRole !== 'USER') &&
                            <Route path='moderation' element={<div>MODERATION</div>}/>
                        }
                    </Route>
                }
            </Routes>
        </>
    )
}

export default (Router);
