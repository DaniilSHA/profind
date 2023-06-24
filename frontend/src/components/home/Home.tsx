import React from 'react';
import styles from './Home.module.css';
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {authService} from "../../api/auth/AuthService";
import {serverAPI, URL_TOKEN_PROFILE} from "../../api/ServerAPI";


function Home() {
    const navigate = useNavigate();
    const username = useSelector((state: any) => state.authLog.profileData.profile.username);
    const role = useSelector((state: any) => state.authLog.profileData.profile.role);

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    }

    const handleTest = () => {
        serverAPI.requestWrapper({
            requestType: {
                type: 'GET',
            },
            url: URL_TOKEN_PROFILE,
            body: null,
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <>
            <div className={styles.container}>
                <header>
                    <nav className={styles.nav}>
                        <ul className={styles.nav__list}>
                            <li className={styles.nav__list__item}>
                                <NavLink to='find'
                                         onClick={handleTest} className={({isActive}) => `${isActive ? styles.activeLink : styles.link}`}>find</NavLink>
                            </li>
                            <li className={styles.nav__list__item}>
                                <NavLink to='matches'
                                         className={({isActive}) => `${isActive ? styles.activeLink : styles.link}`}>matches</NavLink>
                            </li>
                            <li className={styles.nav__list__item}>
                                <NavLink to='form'
                                         className={({isActive}) => `${isActive ? styles.activeLink : styles.link}`}>form</NavLink>
                            </li>
                            {(role === 'MODER') &&
                                <li className={styles.nav__list__item}>
                                    <NavLink to='moderation'
                                             className={({isActive}) => `${isActive ? styles.activeLink : styles.link}`}>moderation</NavLink>
                                </li>
                            }
                            <li className={styles.nav__list__item}>
                                <a className={styles.link_nonclick}>
                                    <span className={styles.link_span}>username:</span>
                                    <br/>
                                    {username}
                                </a>
                            </li>
                            <li className={styles.nav__list__item}><a className={styles.logout}
                                                                      onClick={handleLogout}>logout</a></li>
                        </ul>
                    </nav>
                </header>
                <Outlet/>
            </div>
        </>
    );
}

export default Home;
