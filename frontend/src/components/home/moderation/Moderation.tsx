import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
function Moderation() {
    const usersList = useSelector((state: any) => (state.moderation));
    console.log(usersList);

    const dispatch = useDispatch();

    return (
        <>
            hello
        </>
    );
}

export default Moderation;
