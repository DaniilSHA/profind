import React from 'react';
import {useSelector} from "react-redux";
import styles from './Profile.module.css';
import ProfileNotOk from "./ProfileNC/ProfileNotOk";
import ProfileOK from "./ProfileOK/ProfileOK";


function Profile() {
    const userData = useSelector((state: any) => (state.profile.profile));
    const userStatus = useSelector((state: any) => (state.profile.meta.error));
    return (
        <>
            <div className={styles.item}>STATUS: {userData.status}</div>
            <div className={styles.item}>VALID MESSAGE: {userData.no_valid} </div>
            {userStatus === 200 && <ProfileOK />}
            {userStatus === 204 && <ProfileNotOk />}
        </>
    );
}

export default Profile;
