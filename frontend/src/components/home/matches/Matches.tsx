import React, {useState} from 'react';
import styles from './Matches.module.css';
import {defaultService} from "../../../api/default/DefautlService";
import {useSelector} from "react-redux";
import {store} from "../../../redux/store";
import Finditem from "../find/findItem/Finditem";
import Prematchesitem from "./prematchesItem/Prematchesitem";
import {serverAPI, URL_CORE_HOST} from "../../../api/ServerAPI";
import {findService} from "../../../api/find/FindService";
import {prematchService} from "../../../api/prematch/PrematchService";


function Matches() {
    const [prematch, setPrematch] = useState(false);
    const userData = useSelector((state: any) => (state.profile.profile));
    const [usersList, setUsersList] = useState<any[]>(useSelector((state: any) => (state.prematch)));

    setTimeout(() => {
        const storeState = store.getState();
        setUsersList(storeState.prematch);
    }, 100);

    const isArrayEmpty = (arr: any[]) => {
        return arr.length === 0;
    }
    const prematchHandler = () => {
        defaultService.prematchInit();
        setPrematch(!prematch);
    }

    const prematchCompleteHandler = (wasLike: boolean) => {
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
                    "wasLike": wasLike,
                },
            }).then(data => {
                if (data.status === 200) {
                    defaultService.prematchInit();
                    defaultService.findInit();
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <>
            <div className={styles.btns_wrapper}>
                <button className={styles.btn} type='button'>match</button>
                <button className={styles.btn} onClick={prematchHandler} type='button'>pre-match</button>
            </div>
            {prematch && <div className={styles.prematch_wrapper}>
                {!isArrayEmpty(usersList) && (userData.status === 'VALID') && <div>
                    <Prematchesitem user={usersList[0]}/>
                    <div className={styles.btns_wrapper}>
                        <button type="button" className={styles.btn} onClick={() => {
                            prematchCompleteHandler(true);
                            console.log('success');
                        }}>+
                        </button>
                        <button className={styles.btn} onClick={() => {
                            prematchCompleteHandler(false);
                            console.log('fail');
                        }} type="button">-
                        </button>
                    </div>
                </div>}
                {isArrayEmpty(usersList) && userData.status === 'VALID' &&
                    <div className={styles.notFound}>Подходящих пользователей не найдено.</div>}
            </div>}
        </>
    );
}

export default Matches;
