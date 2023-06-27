import React from 'react';
import {formService} from "../../api/form/FormService";
import {useSelector} from "react-redux";
import styles from './Profile.module.css';
import {validation_profile} from "../../validation/validation";
import {Field, Form, Formik} from "formik";
import {serverAPI, URL_TOKEN_PROFILE} from "../../api/ServerAPI";
import ProfileNC from "./ProfileNC/ProfileNC";
import ProfileOK from "./ProfileOK/ProfileOK";


function Profile() {
    const userData = useSelector((state: any) => (state.profile.profile));
    const userStatus = useSelector((state: any) => (state.profile.meta.error));
    console.log(userData);
    console.log(userStatus);
    return (
        <>
            <div className={styles.item}>STATUS: {userData.status}</div>
            <div className={styles.item}>VALID MESSAGE: {userData.no_valid} </div>
            {userStatus === 200 && <ProfileOK />}
            {userStatus === 204 && <ProfileNC />}

        </>
    );
}

export default Profile;
