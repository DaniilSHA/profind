import * as yup from "yup";


const validation = yup.object().shape({
    username: yup.string().required('Обязательно для заполнения').min(3, 'Логин слишком короткий'),
    password: yup.string().required('Обязательно для заполнения').min(6, 'Пароль слишком короткий'),
    email: yup.string().required('Обязательно для заполнения').email('Введите корректный email'),
})

export default validation