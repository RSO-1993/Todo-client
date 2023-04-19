import Header from './Header/Header'
import Footer from './Footer/Footer'
import css from './Layout.module.css'

const Layout = ({children}) => {
    return (
        <>
            <Header />
            <div className={css.content}>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout
