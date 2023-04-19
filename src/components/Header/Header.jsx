import {useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {SlHome} from 'react-icons/sl'
import css from './Header.module.css'

const Header = () => {
    const {isAuth} = useSelector((state) => state.auth)

    return (
        <div className={css.header}>
            <nav className={css.header__navbar}>
                    <NavLink to='/' className={css.navbar__link}>
                        <SlHome className={css.navbar__link_icon} />
                        <span>Главная</span>
                    </NavLink>
                {isAuth ? (
                    <NavLink to='/content' className={css.navbar__link_button}>
                        Задания
                    </NavLink>
                ) : (
                    <NavLink to='/login' className={css.navbar__link_button}>
                        Вход
                    </NavLink>
                )}
            </nav>
        </div>
    )
}

export default Header
