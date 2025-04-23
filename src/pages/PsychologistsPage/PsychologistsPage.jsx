import Filters from '../../components/Filters/Filters.jsx'
import { selectFilters } from '../../redux/filters/selectors.js'
import s from './PsychologistsPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectList, selectLoading, resetList, selectLastVisibleDoc, selectHasMore, selectError } from '../../redux/psychologists/slice.js'
import { getPsychologists } from '../../redux/psychologists/operations.js'
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.jsx'

const PsychologistsPage = () => {

    const dispatch = useDispatch()
    const filters = useSelector(selectFilters)
    const list = useSelector(selectList)
    const lastVisibleDoc = useSelector(selectLastVisibleDoc)
    const hasMore = useSelector(selectHasMore)
    const error = useSelector(selectError)
   

    useEffect(() => {
        dispatch(resetList())
        dispatch(getPsychologists(filters))
    }, [filters])


    const handleLoadMore = () => {
        dispatch(getPsychologists({filters, lastVisibleDoc}))
    }

    return (
        <section className={s.container}>
            <h2 className='visually_hidden'>Psychologists You Can Trust</h2>
            <Filters />
            <PsychologistsList list={list} />
        </section>
    )
}

export default PsychologistsPage