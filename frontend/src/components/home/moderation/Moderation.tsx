import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Moditem from "./modItem/Moditem";
import {Field, Form, Formik} from "formik";
import {validation_moderation, validation_profile} from "../../../validation/validation";
import styles from "./Moderation.module.css"
import {serverAPI, URL_TOKEN_MODERATION_PUT, URL_TOKEN_PROFILE} from "../../../api/ServerAPI";
import {formService} from "../../../api/form/FormService";
import {store} from "../../../redux/store";

function Moderation() {

    const [usersList, setUsersList] = useState(useSelector((state: any) => (state.moderation)));
    setTimeout(()=>{
        const storeState = store.getState();
        setUsersList(storeState.moderation);
    },1000);
    const [currentId, setCurrentId] = useState(0);

    function isArrayEmpty(arr: []) {
        return arr.length === 0;
    }

    const validateHandler = (status: string, msg: string): void => {
        serverAPI.requestWrapper({
            requestType: {
                type: 'PUT',
            },
            url: `${URL_TOKEN_MODERATION_PUT}${usersList[currentId].username}`,
            body: {
                status: status,
                name: usersList[currentId].name,
                about: usersList[currentId].about,
                goal: usersList[currentId].goal,
                program_language: usersList[currentId].program_language,
                no_valid: msg,
                contact: {
                    vk: usersList[currentId].contact.vk,
                    telegram: usersList[currentId].contact.telegram,
                    phone: usersList[currentId].contact.phone,
                    email: usersList[currentId].contact.email,
                }
            },
        }).catch(error => {
            console.log(error);
        })
        if (usersList[currentId + 1]) {
            setCurrentId(currentId + 1);
        } else {
            setUsersList([]);
        }
    }

    return (
        <>
            {!isArrayEmpty(usersList) && <div>
                <Moditem user={usersList[currentId]}/>
                <Formik
                    validationSchema={validation_moderation}
                    initialValues={{
                        error_msg: '',
                    }}
                    onSubmit={values => {
                        console.log('success');
                        validateHandler('NO_VALID', values.error_msg);
                    }}
                >
                    {({errors, touched}) => (
                        <Form>
                            <label className={styles.itemLabel}>Текст ошибки:</label>
                            <Field as="textarea" name="error_msg" className={styles.textarea}/>
                            {errors.error_msg && touched.error_msg && (
                                <div className={styles.formError}>
                                    {errors.error_msg}
                                </div>
                            )}
                            <div className={styles.btnsWrapper}>
                                <button type="button" className={styles.btn} onClick={() => {
                                    validateHandler('VALID', 'Анкета прошла валидацию. Удачного пользования.')
                                }}>VALID
                                </button>
                                <button className={styles.btn} type="submit">NO_VALID</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>}
            {isArrayEmpty(usersList) && <div className={styles.notFound}>Анкет на проверку не найдено.</div>}
        </>
    );
}

export default Moderation;
