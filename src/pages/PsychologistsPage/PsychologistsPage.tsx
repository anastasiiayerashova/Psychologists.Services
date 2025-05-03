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
import { Title, Meta } from 'react-head';
// import gsap from 'gsap'

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
    // const listRef = useRef<HTMLDivElement>(null)

    // const [isPending, startTransition] = useTransition()

    useEffect(() => {
         dispatch(resetList())
         dispatch(getPsychologists({ filters })).finally(() => {
            setIsFirstLoad(false)
        })
    }, [filters, dispatch])

    // useEffect(() => {
    //     if (!loading && list.length > 0 && listRef.current) {
    //         gsap.fromTo(
    //            listRef.current,
    //            { opacity: 0, y: 40 },
    //            { opacity: isPending ? 0.5 : 1, y: 0, duration: 1.5, delay: 0.4, ease: 'power4.out' }
    //         )
    //     }
    // }, [list, loading, isPending])

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
     <>
        <Title>psychologists.services | find your psychologist</Title>
        <Meta
            name="description"
            content="Browse and filter psychologists by price, popularity, and name. View detailed profiles and book an appointment easily."
        />
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
        </>
    )
}

export default PsychologistsPage