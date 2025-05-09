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
import { motion } from 'framer-motion'

const PsychologistsPage = () => {

    const dispatch = useDispatch<AppDispatch>()
    const filters = useSelector<RootState, FilterType>(selectFilters)
    const list = useSelector<RootState, IPsychologist[]>(selectList)
    const lastVisibleDoc = useSelector<RootState, string | null>(selectLastVisibleDoc)
    const hasMore = useSelector<RootState, boolean>(selectHasMore)
    const loading = useSelector<RootState, boolean>(selectLoading)
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
    const [suppressAlerts, setSuppressAlerts] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [openSnackbarNotFound, setOpenSnackbarNotFound] = useState<boolean>(false)

    useEffect(() => {
        const fetchPsychologists = async (): Promise<void> => {
            try {
                setSuppressAlerts(true)
                dispatch(resetList())
                await dispatch(getPsychologists({ filters })).unwrap()
            }
            catch (e: unknown) {
                console.log('Error during fetching psychologists:', e)
            }
            finally {
                setIsFirstLoad(false)
                setSuppressAlerts(false)
            }
        }
        fetchPsychologists()
    }, [filters, dispatch])


    const handleLoadMore = () => {
        setOpenSnackbar(false)
        dispatch(getPsychologists({ filters, lastVisibleDoc }))
    }


    const [prevListLength, setPrevListLength] = useState<number>(0)


    useEffect(() => {
        const loadedMore = list.length > prevListLength

        if (!suppressAlerts && !loading && !hasMore && loadedMore ) {
           setOpenSnackbar(true)
        }

        if (!suppressAlerts && list.length === 0 && !loading && Object.keys(filters).length > 0) {
            setOpenSnackbarNotFound(true)
        }
        setPrevListLength(list.length)
    }, [suppressAlerts, hasMore, loading, list, filters, prevListLength])


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
                                <motion.button
                                    type="button"
                                    whileTap={{ scale: 1.3 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                    className={s.load_btn}
                                    onClick={handleLoadMore}>
                                       Load more
                                </motion.button>
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