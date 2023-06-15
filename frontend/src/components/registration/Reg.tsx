import React from 'react';
import styles from './Reg.module.css';
import {Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import {findAllByDisplayValue} from "@testing-library/react";
import {useNavigate} from "react-router-dom";
import validation from "../validation/validation";

function Reg(props: any) {
    const navigate = useNavigate();
    const backHandler = () => {
        navigate('/');
        props.isReg();
    }

    return (
        <>
            <div className={styles.bg} onClick={backHandler}></div>
            <div className={styles.login}>
                <Formik
                    validationSchema={validation}
                    initialValues={{
                        username: '',
                        password: '',
                        email: '',
                    }}
                    onSubmit={values => {
                        console.log('submit', values);
                    }}
                >
                    {({errors, touched}) => (
                        <Form className={styles.form}>
                            <label className={styles.title}>
                                Регистрация
                            </label>

                            <label className={styles.formLabel}>
                                Логин:
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

                            <label className={styles.formLabel}>
                                Пароль:
                            </label>
                            <Field
                                className={styles.formField}
                                name="password"
                                type="password"
                            />
                            {errors.password && touched.password && (
                                <div className={styles.formError}>
                                    {errors.password}
                                </div>
                            )}

                            <label className={styles.formLabel}>
                                Email:
                            </label>
                            <Field
                                className={styles.formField}
                                name="email"
                                type="email"
                            />
                            {errors.email && touched.email && (
                                <div className={styles.formError}>
                                    {errors.email}
                                </div>
                            )}

                            <button
                                className={styles.btn}
                                type="submit"
                            >
                                Зарегистрироваться
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export default Reg;
