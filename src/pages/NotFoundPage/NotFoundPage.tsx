import { Link } from "react-router-dom"
import s from './NotFoundPage.module.css'


const NotFoundPage = () => {
    return (
            <section className={s.ntf_section}>
                <div className={s.content}>
                    <h1 className={s.title}>Oops! We couldn't find the page</h1>
                    <h2 className={s.subtitle}>But don't worry, you can always go back to the homepage</h2>
                    <Link to='/' className={s.btn}>Go to home</Link>
                </div>
            </section>
    )
}

export default NotFoundPage