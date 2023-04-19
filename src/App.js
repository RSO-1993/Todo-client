import { 
    BrowserRouter, 
    Navigate, 
    Routes, 
    Route, 
    Outlet 
} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Home from './pages/home'
import Content from './pages/content'
import Register from './pages/register'
import Login from './pages/login'
import './global.css'

const PrivateRoutes = () => {
    const {isAuth} = useSelector((state) => state.auth)
    return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
    const {isAuth} = useSelector((state) => state.auth)
    return <>{!isAuth ? <Outlet /> : <Navigate to='/content' />}</>
}

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<PrivateRoutes />}>
                    <Route path='/content' element={<Content />} />
                </Route>
                <Route element={<RestrictedRoutes />}>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
