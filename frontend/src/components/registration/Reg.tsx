import React, {useState} from 'react';
import styles from './Reg.module.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useNavigate} from "react-router-dom";
import validation from "../../validation/validation";


function Reg() {
    const navigate = useNavigate();

    const roles = ['Выберите роль', 'Front-end', 'Java', 'Python'];
    const data = ['', 'Front-end', 'Java', 'Python'];

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
                        role: '',
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

                            <label className={styles.formLabel}>Роль:</label>
                            <Field as="select" name="role" className={styles.formField}>
                                {roles.map((role, index) => (
                                    <option key={index} value={data[index]}>
                                        {role}
                                    </option>
                                ))}
                            </Field>

                            {errors.role && touched.role && (
                                <div className={styles.formError}>
                                    {errors.role}
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
