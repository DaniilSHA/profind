import styles from './ProfileOK.module.css';
import React from "react";
import {useSelector} from "react-redux";

function ProfileOK() {
    const userData = useSelector((state: any) => (state.profile.profile));
    return <>
        <div className={styles.main}>
            <div className={styles.item}>
                <p>NAME: {userData.name}</p>
            </div>
            <div className={styles.item}>
                <p>ABOUT: {userData.about}</p>
            </div>
            <div className={styles.item}>
                <p>GOAL: {userData.goal}</p>
            </div>
            <div className={styles.item}>
                <p>PROGRAM LANGUAGE: {userData.program_language}</p>
            </div>
        </div>
    </>
}

export default ProfileOK;
