import * as yup from "yup";

const validation = yup.object().shape({
    username: yup.string().required('Обязательно для заполнения').min(3, 'Логин слишком короткий'),
    password: yup.string().required('Обязательно для заполнения').min(6, 'Пароль слишком короткий'),
})

export default validation