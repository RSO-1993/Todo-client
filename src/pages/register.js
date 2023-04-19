import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {onRegistration} from '../api/auth'
import Layout from '../components/Layout'
import css from './pages.module.css'

const Register = () => {
    const [values, setValues] = useState({
        login: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await onRegistration(values)
            setError('')
            setSuccess(data.message)
            setValues({
                login: '',
                email: '',
                password: ''
            })
        } catch (error) {
            setError(error.response.data.errors[0].msg)
            setSuccess('')
        }
    }

    return (
        <Layout>
            <h1 className={css.h1}>Регистрация</h1>

            <div className={
                    error ? 
                    [css.message, css.error].join(' ') : 
                    [css.message, css.success].join(' ')
            }>
                {error || success}
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <input 
                    onChange={(e) => onChange(e)}
                    type='text'
                    className={css.input}
                    id='login'
                    name='login'
                    value={values.login}
                    placeholder='Логин'
                    required
                    autoComplete='off'
                />

                <input 
                    onChange={(e) => onChange(e)}
                    type='email'
                    className={css.input}
                    id='email'
                    name='email'
                    value={values.email}
                    placeholder='E-mail'
                    required
                    autoComplete='off'
                />

                <input 
                    onChange={(e) => onChange(e)}
                    type='password'
                    className={css.input}
                    id='password'
                    name='password'
                    value={values.password}
                    placeholder='Пароль'
                    required
                    autoComplete='off'
                />

                <button type='submit' className={css.button}>
                    Регистрация
                </button>
            </form>

            <div className={css.block}>
                <NavLink to='/login' className={css.link}>
                    У вас уже есть аккаунт? Вход
                </NavLink>
            </div>
        </Layout>
    )
}

export default Register
