import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {onLogin} from '../api/auth'
import Layout from '../components/Layout'
import {useDispatch} from 'react-redux'
import {authenticateUser} from '../redux/slices/authSlice'
import css from './pages.module.css'

const Login = () => {
    const [values, setValues] = useState({
        email: '', 
        password: ''
    })
    const [error, setError] = useState(false)

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await onLogin(values)
            dispatch(authenticateUser())
            localStorage.setItem('isAuth', 'true')
        } catch (error) {
            setError(error.response.data.errors[0].msg)
        }
    }

    return (
        <Layout>
            <h1 className={css.h1}>Вход</h1>

            <div className={[css.message, css.error].join(' ')}>
                {error}
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <input 
                    onChange={(e) => onChange(e)}
                    type='email'
                    className={css.input}
                    id='email'
                    name='email'
                    value={values.email}
                    placeholder='E-mail'
                    required
                    autoComplete='on'
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
                    autoComplete='on'
                />

                <button type='submit' className={css.button}>
                    Войти
                </button>
            </form>

            <div className={css.block}>
                <NavLink to='/register' className={css.link}>
                    У вас еще нет аккаунта? Зарегистрироваться
                </NavLink>
            </div>
        </Layout>
    )
}

export default Login
