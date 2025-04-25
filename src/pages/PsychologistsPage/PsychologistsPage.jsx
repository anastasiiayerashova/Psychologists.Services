import Filters from '../../components/Filters/Filters.jsx'
import { selectFilters } from '../../redux/filters/selectors.js'
import s from './PsychologistsPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { selectList, selectLoading, resetList, selectLastVisibleDoc, selectHasMore } from '../../redux/psychologists/slice.js'
import { getPsychologists } from '../../redux/psychologists/operations.js'
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import CustomAlert from '../../components/CustomAlert/CustomAlert.jsx'

const PsychologistsPage = () => {

    const dispatch = useDispatch()
    const filters = useSelector(selectFilters)
    const list = useSelector(selectList)
    const lastVisibleDoc = useSelector(selectLastVisibleDoc)
    const hasMore = useSelector(selectHasMore)
    const loading = useSelector(selectLoading)

    useEffect(() => {
        dispatch(resetList())
        dispatch(getPsychologists({filters}))
    }, [filters, dispatch])

    const handleLoadMore = () => {
        dispatch(getPsychologists({filters, lastVisibleDoc}))
    }

    const [openSnackbar, setOpenSnackbar] = useState(false)

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return
           setOpenSnackbar(false);
    }

    useEffect(() => {
        if (!lastVisibleDoc && list.length !== 0) {
           setOpenSnackbar(true)
        }
    }, [lastVisibleDoc, list])

    return (
        <section className={s.container}>
            <h2 className='visually_hidden'>Psychologists You Can Trust</h2>
            <Filters />

            {loading && list.length === 0 && (
                <div className={s.load_wrap}>
                    <Loader/>
                </div>
            )}
            
            {!loading && list.length > 0 && (
                <PsychologistsList list={list} />
            )}

            {!loading && hasMore && (
                <button type='button' className={s.load_btn} onClick={handleLoadMore}>Load more</button>
            )}

            {!loading && !lastVisibleDoc && list.length !==0 && (
                <CustomAlert openSnackbar={openSnackbar} handleSnackbarClose={handleSnackbarClose}>All psychologists loaded</CustomAlert>
            )}

            {!loading && list.length === 0 && (
                <div className={s.text_wrap}>
                    <p className={s.not_found_text}>No psychologists found for the selected filters. Please, try different filters</p>
                </div>
            )
            }
        </section>
    )
}

export default PsychologistsPage