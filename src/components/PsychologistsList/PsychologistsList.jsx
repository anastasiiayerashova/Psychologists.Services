import PsychologistsItem from '../PsychologistsItem/PsychologistsItem.jsx'
import s from './PsychologistsList.module.css'

const PsychologistsList = ({ list }) => {
    
    return (
        <ul className={s.list}>
            {list.map((item) => (
                <PsychologistsItem key={item} data={item} />
            ))}
        </ul>
    )
 }

export default PsychologistsList