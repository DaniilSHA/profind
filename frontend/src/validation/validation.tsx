import * as yup from "yup";

export const validation_log = yup.object().shape({
    username: yup.string().required('Обязательно для заполнения').min(3, 'Логин слишком короткий'),
    password: yup.string().required('Обязательно для заполнения').min(6, 'Пароль слишком короткий'),
})

export const validation_reg = yup.object().shape({
    username: yup.string().required('Обязательно для заполнения').min(3, 'Логин слишком короткий'),
    password: yup.string().required('Обязательно для заполнения').min(6, 'Пароль слишком короткий'),
})