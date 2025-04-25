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
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [openSnackbar, setOpenSnackbar] = useState(false)

    useEffect(() => {
        dispatch(resetList())
        dispatch(getPsychologists({ filters })).finally(() => {
            setIsFirstLoad(false)
        })
    }, [filters, dispatch])

    const handleLoadMore = () => {
        setOpenSnackbar(false)
        dispatch(getPsychologists({ filters, lastVisibleDoc }))
    }

    useEffect(() => {
        if (!loading && !hasMore && list.length > 0) {
           setOpenSnackbar(true)
        }
    }, [hasMore, loading, list])

    return (
        <section className={s.container}>
            <h2 className='visually_hidden'>Psychologists You Can Trust</h2>
            <Filters />

           {isFirstLoad ? (
                <div className={s.load_wrap}>
                    <Loader />
                </div>
            ) : (
                <>
                    <PsychologistsList list={list} />
                        
                    {hasMore && !loading && (
                        <button type="button" className={s.load_btn} onClick={handleLoadMore}>
                            Load more
                        </button>
                    )}
                        
                    <CustomAlert
                        severity='warning'
                        openSnackbar={openSnackbar}
                        handleSnackbarClose={() => setOpenSnackbar(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        alertSx={{ backgroundColor: '#ffe5b4', height: 'auto' }}
                    >
                        All psychologists loaded
                    </CustomAlert>
                        
                    {list.length === 0 && !loading && (
                        <div className={s.text_wrap}>
                            <p className={s.not_found_text}>No psychologists found for the selected filters. Please, try different filters</p>
                        </div>
                    )}
                </>
            )}
        </section>
    )
}

export default PsychologistsPage