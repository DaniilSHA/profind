import React, {useEffect} from 'react';
import styles from './Main.module.css';
import {useNavigate} from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();
    const loginHandler = () => {
        navigate ('/login');
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.logo}
                     style={{
                         backgroundImage: 'url(/img/logo.png)',
                     }}>
                </div>
                <div className={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, dolor dolorem earum ex fuga harum
                    impedit itaque iure, iusto magni molestias nam officiis, placeat praesentium quos repellat similique
                    voluptatum. Fugit?
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.student_desc}>
                    <div className={styles.title}>Student</div>
                    <div className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                        blanditiis dolor error illo itaque non odio? Animi at cupiditate doloribus fuga iusto, neque
                        provident, quasi, qui quia reprehenderit sed tenetur.
                    </div>
                </div>
                <div className={styles.teacher_desc}>
                    <div className={styles.title}>Teacher</div>
                    <div className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                        blanditiis dolor error illo itaque non odio? Animi at cupiditate doloribus fuga iusto, neque
                        provident, quasi, qui quia reprehenderit sed tenetur.
                    </div>
                </div>
                <div className={styles.startupPlayer_desc}>
                    <div className={styles.title}>Startup Player</div>
                    <div className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                        blanditiis dolor error illo itaque non odio? Animi at cupiditate doloribus fuga iusto, neque
                        provident, quasi, qui quia reprehenderit sed tenetur.
                    </div>
                </div>
                <div className={styles.startupBoss_desc}>
                    <div className={styles.title}>Startup Boss</div>
                    <div className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                        blanditiis dolor error illo itaque non odio? Animi at cupiditate doloribus fuga iusto, neque
                        provident, quasi, qui quia reprehenderit sed tenetur.
                    </div>
                </div>
                <div className={styles.investor_desc}>
                    <div className={styles.title}>Investor</div>
                    <div className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                        blanditiis dolor error illo itaque non odio? Animi at cupiditate doloribus fuga iusto, neque
                        provident, quasi, qui quia reprehenderit sed tenetur.
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <button className={styles.btn} onClick={loginHandler}>Логин</button>
                <button className={styles.btn}>Регистрация</button>
            </div>
        </div>
    );
}

export default Main;