import React from 'react';
import styles from './Login.module.css';
import {Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import {findAllByDisplayValue} from "@testing-library/react";

function Login() {
    const validation = yup.object().shape({
        username: yup.string().required('Обязательно для заполнения').min(3, 'Логин слишком короткий'),
        password: yup.string().required('Обязательно для заполнения').min(6, 'Пароль слишком короткий'),
    })
    return (
        <div className={styles.login}>
            <Formik
                validationSchema={validation}
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={values => {
                    console.log('submit', values);
                }}
            >
                {({errors, touched}) => (
                    <Form className={styles.form}>
                        <label className={styles.title}>
                            Вход
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
                            Войти
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
