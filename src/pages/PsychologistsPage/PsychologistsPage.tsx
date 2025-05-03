import Filters from '../../components/Filters/Filters.tsx'
import { selectFilters } from '../../redux/filters/selectors.ts'
import s from './PsychologistsPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { selectList, selectLoading, resetList, selectLastVisibleDoc, selectHasMore } from '../../redux/psychologists/slice.ts'
import { getPsychologists } from '../../redux/psychologists/operations.ts'
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.tsx'
import Loader from '../../components/Loader/Loader.tsx'
import CustomAlert from '../../components/CustomAlert/CustomAlert.tsx'
import { AppDispatch, RootState } from '../../redux/store.ts'
import { FilterType } from '../../types/types.ts'
import { IPsychologist } from '../../types/IPsychologist.ts'

const PsychologistsPage = () => {

    const dispatch = useDispatch<AppDispatch>()
    const filters = useSelector<RootState, FilterType>(selectFilters)
    const list = useSelector<RootState, IPsychologist[]>(selectList)
    const lastVisibleDoc = useSelector<RootState, string | null>(selectLastVisibleDoc)
    const hasMore = useSelector<RootState, boolean>(selectHasMore)
    const loading = useSelector<RootState, boolean>(selectLoading)
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [openSnackbarNotFound, setOpenSnackbarNotFound] = useState<boolean>(false)

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

        if (list.length === 0 && !loading && Object.keys(filters).length > 0) {
            setOpenSnackbarNotFound(true)
        }
    }, [hasMore, loading, list, filters])

    useEffect(() => {
         if (list.length > 0 && openSnackbarNotFound) {
            setOpenSnackbarNotFound(false)
        }
    }, [list, openSnackbarNotFound])
    

    return (
        <section className={s.container}>
            <h2 className='visually_hidden'>Psychologists You Can Trust</h2>
            <Filters context='psychologist'/>

           {isFirstLoad ? (
                <div className={s.load_wrap}>
                    <Loader />
                </div>
            ) : (
                <>
                    <PsychologistsList list={list} />
                        
                        {hasMore ? (
                            loading ? (
                                <div className={s.load_wrap_btn}>
                                    <Loader />
                                </div>
                            ) : (
                                <button type="button" className={s.load_btn} onClick={handleLoadMore}>
                                     Load more
                                </button>
                            )
                        ) : null}
                        
                    <CustomAlert
                        severity='info'
                        openSnackbar={openSnackbar}
                        handleSnackbarClose={() => setOpenSnackbar(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        alertSx={{ height: 'auto' }}
                    >
                        All psychologists loaded
                    </CustomAlert>
                        
                    <CustomAlert
                        severity='warning'
                        openSnackbar={openSnackbarNotFound}
                        handleSnackbarClose={() => setOpenSnackbarNotFound(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        alertSx={{ height: 'auto' }}
                    >
                        No psychologists found for the selected filters
                    </CustomAlert>
                    
                </>
            )}
        </section>
    )
}

export default PsychologistsPage