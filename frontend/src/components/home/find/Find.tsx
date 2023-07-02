import styles from "./Find.module.css"
import React, {useState} from "react";
import {useSelector} from "react-redux";

function Find() {
    const [usersList, setUsersList] = useState(useSelector((state: any) => (state.find)));
    const [currentId, setCurrentId] = useState(0);
    console.log(usersList);


    return (
        <>
            sawsaw
        </>
    );
}

export default Find;
