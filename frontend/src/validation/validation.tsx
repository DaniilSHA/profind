import * as yup from "yup";

export const validation_log = yup.object().shape({
    username: yup.string().required('Обязательно для заполнения').min(3, 'Логин слишком короткий'),
    password: yup.string().required('Обязательно для заполнения').min(6, 'Пароль слишком короткий'),
})

export const validation_reg = yup.object().shape({
    username: yup.string().required('Обязательно для заполнения').min(3, 'Логин слишком короткий'),
    password: yup.string().required('Обязательно для заполнения').min(6, 'Пароль слишком короткий'),
})

export const validation_profile = yup.object().shape({
    username: yup.string().required('Обязательно для заполнения'),
    about: yup.string().required('Обязательно для заполнения').min(10, 'Описание слишком мало.'),
    goal: yup.string().required('Выберите роль'),
    program_language: yup.string().required('Выберите язык программирования'),
})

export const validation_moderation = yup.object().shape({
    error_msg: yup.string().required('Обязательно для заполнения при отказе валидации.'),
})