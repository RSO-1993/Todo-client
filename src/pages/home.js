import {TbWalk} from 'react-icons/tb'
import Layout from '../components/Layout'
import css from './pages.module.css'

const Home = () => {
    return (
        <Layout>
            <div className={css.home}>
                <TbWalk className={css.home__icon} />
            </div>
        </Layout>
    )
}

export default Home
