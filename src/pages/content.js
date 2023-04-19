import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {fetchProtectedInfo, onLogout} from '../api/auth'
import {unauthenticateUser} from '../redux/slices/authSlice'
import Tasks from '../components/Tasks/Tasks'
import Layout from '../components/Layout'
import Loader from '../components/UI/Loader/Loader'
import css from './pages.module.css'

const Content = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [protectedData, setProtectedData] = useState(null)

    const logout = async () => {
        try {
            await onLogout()
            dispatch(unauthenticateUser())
            localStorage.removeItem('isAuth')
        } catch (error) {
            console.log(error.response)
        }
    }

    const protectedInfo = async () => {
        try {
            const {data} = await fetchProtectedInfo()
            setProtectedData(data.info)
            setIsLoading(false)
        } catch (error) {
            logout()
        }
    }

    useEffect(() => {
        protectedInfo()
    }, [])

    return !isLoading ? (
        <Layout>
            <button 
                onClick={() => logout()} 
                className={css.content__button_exit}
            >x</button>
            <Tasks />
        </Layout>
    ) : (
        <Layout>
            <Loader />
        </Layout>
    )
}

export default Content
