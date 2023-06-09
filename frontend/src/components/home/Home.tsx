import React from 'react';
import styles from './Home.module.css';
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {authService} from "../../api/auth/AuthService";
import {serverAPI, URL_TOKEN_PROFILE} from "../../api/ServerAPI";
import {formService} from "../../api/form/FormService";


function Home() {
    const navigate = useNavigate();
    const username = useSelector((state: any) => state.authLog.profileData.profile.username);
    const role = useSelector((state: any) => state.authLog.profileData.profile.role);

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    }

    const startProfile = () => {
        serverAPI.requestWrapper({
            requestType: {
                type: 'GET',
            },
            url: URL_TOKEN_PROFILE,
            body: null,
        }).then(data => {
            console.log(data);
            formService.updateData(data.data);
            formService.updateMeta(data.status);
        }).catch(error => {
            console.log(error);
            formService.updateMeta(error.status);
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
                                         className={({isActive}) => `${isActive ? styles.activeLink : styles.link}`}>find</NavLink>
                            </li>
                            <li className={styles.nav__list__item}>
                                <NavLink to='matches'
                                         className={({isActive}) => `${isActive ? styles.activeLink : styles.link}`}>matches</NavLink>
                            </li>
                            <li className={styles.nav__list__item}>
                                <NavLink to='profile'
                                         onClick={startProfile}
                                         className={({isActive}) => `${isActive ? styles.activeLink : styles.link}`}>profile</NavLink>
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
                <main className={styles.main}>
                    <Outlet/>
                </main>
            </div>
        </>
    );
}

export default Home;
