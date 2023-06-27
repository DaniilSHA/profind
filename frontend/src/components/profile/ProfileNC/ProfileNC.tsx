import {useSelector} from "react-redux";
import styles from './ProfileNC.module.css';
import React from "react";
import {Field, Form, Formik} from "formik";
import {validation_profile} from "../../../validation/validation";
import {serverAPI, URL_TOKEN_PROFILE} from "../../../api/ServerAPI";
import {formService} from "../../../api/form/FormService";

function ProfileNC() {

    return <>
        <div className={styles.main}>
            <Formik
                validationSchema={validation_profile}
                initialValues={{
                    username: '',
                    about: '',
                    goal: '',
                    program_language: '',
                }}
                onSubmit={values => {
                    serverAPI.requestWrapper({
                        requestType: {
                            type: 'POST',
                        },
                        url: URL_TOKEN_PROFILE,
                        body: {
                            status: 'NO_VALID',
                            name: values.username,
                            about: values.about,
                            goal: values.goal,
                            program_language: values.program_language,
                            no_valid: 'Ваш профиль ещё не проверен модератором',
                        },
                    }).then(data => {
                        formService.updateData({
                            status: 'NO_VALID',
                            name: values.username,
                            about: values.about,
                            goal: values.goal,
                            program_language: values.program_language,
                            no_valid: 'Ваш профиль ещё не проверен модератором',
                        })
                        formService.updateMeta(data.status);
                    }).catch(error => {
                        formService.updateMeta(error.status);
                    })
                }}
            >
                {({errors, touched}) => (
                    <Form>
                            <div className={styles.item}>
                                <label className={styles.formLabel}>
                                    NAME:
                                </label>
                                <Field
                                    className={styles.formField}
                                    name="username"
                                />
                                {errors.username && touched.username && (
                                    <div className={styles.formError}>
                                        {errors.username}
                                    </div>
                                )}
                            </div>

                            <div className={styles.item}>
                                <label className={styles.formLabel}>
                                    ABOUT:
                                </label>
                                <Field
                                    className={styles.formField}
                                    name="about"
                                />
                                {errors.about && touched.about && (
                                    <div className={styles.formError}>
                                        {errors.about}
                                    </div>
                                )}
                            </div>
                            <div className={styles.item}>
                                <label className={styles.formLabel}>
                                    GOAL
                                </label>
                                <Field as="select" name="goal" className={styles.formField}>
                                    <option value=''>Цель</option>
                                    <option value="STUDENT">STUDENT</option>
                                    <option value="TEACHER">TEACHER</option>
                                    <option value="STARTUP_PLAYER">STARTUP_PLAYER</option>
                                    <option value="STARTUP_BOSS">STARTUP_BOSS</option>
                                    <option value="INVESTOR">INVESTOR</option>
                                </Field>
                                {errors.goal && touched.goal && (
                                    <div className={styles.formError}>
                                        {errors.goal}
                                    </div>
                                )}
                            </div>
                            <div className={styles.item}>
                                <label className={styles.formLabel}>
                                    PROGRAM_LANGUAGE
                                </label>
                                <Field as="select" name="program_language" className={styles.formField}>
                                    <option value=''>Язык программирования</option>
                                    <option value="JAVA">JAVA</option>
                                    <option value="JS">JS</option>
                                    <option value="PYTHON">PYTHON</option>
                                </Field>
                                {errors.program_language && touched.program_language && (
                                    <div className={styles.formError}>
                                        {errors.program_language}
                                    </div>
                                )}
                            </div>
                            <button
                                className={styles.btn}
                                type="submit"
                            >
                                Отправить данные
                            </button>
                    </Form>
                )}
            </Formik>
        </div>
    </>
}

export default ProfileNC;
