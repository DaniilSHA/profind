import styles from "./Find.module.css"
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Form, Formik} from "formik";
import {validation_moderation} from "../../../validation/validation";
import {store} from "../../../redux/store";
import Finditem from "./findItem/Finditem";
import {serverAPI, URL_CORE_HOST} from "../../../api/ServerAPI";
import {findService} from "../../../api/find/FindService";

function Find() {
    const userData = useSelector((state: any) => (state.profile.profile));
    const [usersList, setUsersList] = useState<any[]>([]);
    setTimeout(() => {
        const storeState = store.getState();
        setUsersList(storeState.find);
    }, 50);
    console.log(usersList);

    function isArrayEmpty(arr: any[]) {
        return arr.length === 0;
    }



    const prematchHandler = (type: boolean) => {
        const storeState = store.getState();
        const currentUser = storeState.authLog.profileData.profile.username;
        if (!isArrayEmpty(usersList)) {
            serverAPI.requestWrapper({
                requestType: {
                    type: 'POST',
                },
                url: `${URL_CORE_HOST}/prematch`,
                body: {
                    "targetUsername": currentUser,
                    "swaipUsername": usersList[0].username,
                    "wasLike": type,
                },
            }).then(data => {
                if (data.status === 200) {
                    findService.updateList(data.data);
                }
            }).catch(error => {
                console.log(error);
            })
        }

        setTimeout(() => {
            serverAPI.requestWrapper({
                requestType: {
                    type: 'GET',
                },
                url: ((userData.goal == 'STUDENT')) ? `${URL_CORE_HOST}/profiles/prematch?goal=TEACHER&lang=${userData.program_language}&swaipUsers=false` : ((userData.goal == 'TEACHER')) ? `${URL_CORE_HOST}/profiles/prematch?goal=STUDENT&lang=${userData.program_language}&swaipUsers=false` : '',
                body: null,
            }).then(data => {
                console.log(data);
                if (data.status === 200) {
                    findService.updateList(data.data);
                }
            }).catch(error => {
                console.log(error);
            })
            setTimeout(() => {
                const storeState = store.getState();
                setUsersList(storeState.find);
            }, 50);
        }, 50);
    }

    return (
        <>
            <>
                {!isArrayEmpty(usersList) && <div>
                    <Finditem user={usersList[0]}/>
                    <div className={styles.btnsWrapper}>
                        <button type="button" className={styles.btn} onClick={() => {
                            prematchHandler(true);
                            console.log(usersList);
                        }}>+
                        </button>
                        <button className={styles.btn} onClick={() => {
                            prematchHandler(false);
                            console.log('fail');
                        }} type="button">-
                        </button>
                    </div>
                </div>}
                {isArrayEmpty(usersList) && <div className={styles.notFound}>Подходящих пользователей не найдено.</div>}
            </>
        </>
    );
}

export default Find;
