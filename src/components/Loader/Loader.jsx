import s from './Loader.module.css'

const Loader = () => {

    return (
        <div className={s.wrp}>
            <span className={s.loader}></span>
        </div>
    )
}

export default Loader