import { PsychologistsListProps } from '../../types/PropsTypes.ts'
import PsychologistsItem from '../PsychologistsItem/PsychologistsItem.tsx'
import s from './PsychologistsList.module.css'
import { AnimatePresence } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'


const PsychologistsList = ({ list }: PsychologistsListProps) => {

    useEffect(() => {
        ScrollTrigger.refresh()
    }, [list])
    
    return (
        <ul className={s.list}>
            <AnimatePresence mode='wait'>
                {list.map((item) => (
                    <PsychologistsItem key={item.id} data={item} />
                ))}
            </AnimatePresence>
        </ul>
    )
 }

export default PsychologistsList