import styles from "./Matchesitem.module.css"
import React, {useState} from "react";

function Matchesitem(props: any) {
    const [check, setCheck] = useState(false);

    const checkHandler = () => {
        setCheck(!check);
    }
    return (
        <>
            <div className={styles.main}>
                {!check && <div className={styles.wrapper}>
                    <div className={styles.shortInfo}>
                        {props.userInfo.username}
                    </div>
                    <button onClick={checkHandler} className={styles.btn}>check contacts</button>
                </div>}
                {check && <div>
                    <div>
                        <div className={styles.item}>
                            <p>NAME: {props.userInfo.name}</p>
                        </div>
                        <div className={styles.item}>
                            <p>ABOUT: {props.userInfo.about}</p>
                        </div>
                        <div className={styles.item}>
                            <p>GOAL: {props.userInfo.goal}</p>
                        </div>
                        <div className={styles.item}>
                            <p>PROGRAM LANGUAGE: {props.userInfo.program_language}</p>
                        </div>
                    </div>
                    <div className={styles.itemWrapper}>
                        <label className={styles.itemLabel}>Contacts:</label>
                        <div className={styles.item}>
                            {(props.userInfo.contact.vk !== null) && <p>vk: {props.userInfo.contact.vk}</p>}
                        </div>
                        <div className={styles.item}>
                            <p>telegram: {props.userInfo.contact.telegram}</p>
                        </div>
                        <div className={styles.item}>
                            {(props.userInfo.contact.phone !== null) && <p>phone: {props.userInfo.contact.phone}</p>}
                        </div>
                        <div className={styles.item}>
                            <p>email: {props.userInfo.contact.email}</p>
                        </div>
                    </div>
                    <button onClick={checkHandler} className={styles.btn}>Hide</button>
                </div>}
            </div>
        </>
    );
}

export default Matchesitem;
