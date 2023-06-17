import React from 'react';
import styles from './Reg.module.css';
import {Formik, Form, Field} from 'formik';
import {useNavigate} from "react-router-dom";
import validation from "../../validation/validation";


function Reg() {
    const navigate = useNavigate();

    const backHandler = () => {
        navigate('/');
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
                    }}

                    onSubmit={values => {
                        console.log(values);
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
