import Filters from '../../components/Filters/Filters.jsx'
import s from './PsychologistsPage.module.css'

const PsychologistsPage = () => {
    return (
        <section className={s.container}>
            <h2 className='visually_hidden'>Psychologists You Can Trust</h2>
            <Filters/>
        </section>
    )
}

export default PsychologistsPage