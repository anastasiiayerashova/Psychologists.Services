import { PsychologistsListProps } from '../../types/PropsTypes.ts'
import PsychologistsItem from '../PsychologistsItem/PsychologistsItem.tsx'
import s from './PsychologistsList.module.css'


const PsychologistsList = ({ list }: PsychologistsListProps) => {
    
    return (
        <ul className={s.list}>
            {list.map((item) => (
                <PsychologistsItem key={item.id} data={item} />
            ))}
        </ul>
    )
 }

export default PsychologistsList