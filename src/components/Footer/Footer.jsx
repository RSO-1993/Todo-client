import {TbEdit} from 'react-icons/tb'
import css from './Footer.module.css'

const Footer = () => {
    return (
        <div className={css.footer}>
            <TbEdit className={css.footer__icon} /> Todo - 2023
        </div>
    )
}

export default Footer
