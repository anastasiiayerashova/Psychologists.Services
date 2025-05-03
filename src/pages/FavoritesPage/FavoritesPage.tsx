import s from './FavoritesPage.module.css'
import Filters from '../../components/Filters/Filters.tsx'
import Loader from '../../components/Loader/Loader.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { selectFavouritesFilters } from '../../redux/filters/selectors.ts'
import CustomAlert from '../../components/CustomAlert/CustomAlert.tsx'
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.tsx'
import { useEffect, useState, useMemo } from 'react'
import { resetFavouritesList, selectFavouritesData, selectUserId } from '../../redux/auth/slice.ts'
import { getFavouritesPsychologists } from '../../redux/auth/operations.ts'
import { AppDispatch, RootState } from '../../redux/store.ts'
import { IPsychologist } from '../../types/IPsychologist.ts'
import { FilterType } from '../../types/types.ts'

const FavoritesPage = () => {

    const favourites = useSelector<RootState, IPsychologist[]>(selectFavouritesData)
    const userId = useSelector<RootState, string | null>(selectUserId)
    const filters = useSelector<RootState, FilterType>(selectFavouritesFilters)
    const dispatch = useDispatch<AppDispatch>()

    const [loading, setLoading] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [visibleCount, setVisibleCount] = useState<number>(3)
    const [allLoaded, setAllLoaded] = useState<boolean>(false)
    const [openSnackbarNotFound, setOpenSnackbarNotFound] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
   
  
    useEffect(() => {
      if (userId) {
            dispatch(resetFavouritesList())
            setLoading(true)
            dispatch(getFavouritesPsychologists(userId))
                .unwrap()
                .finally(() => {
                setLoading(false)
            })
        }
    }, [dispatch, userId])


    const filteredList = useMemo(() => {
    let list = [...favourites]

    if (filters.priceLess) {
      list = list.filter(item => item.price_per_hour! < filters.priceLess!)
    }

    if (filters.priceGreater) {
      list = list.filter(item => item.price_per_hour! > filters.priceGreater!)
    }
      
    const sortBy = filters.sortBy as keyof IPsychologist

    if (filters.sortBy) {
      list.sort((a, b) => {
        if (filters.sortBy === 'name') {
          return filters.direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        } else {
          return filters.direction === 'asc'
            ? (a[sortBy] as number) - (b[sortBy] as number)
            : (b[sortBy] as number) - (a[sortBy] as number)
        }
      })
    }

    if (list.length === 0 && favourites.length > 0) {
      setOpenSnackbar(true)
    }
    else {
      setOpenSnackbar(false)
    }

    return list
    }, [favourites, filters])
    

    useEffect(() => {
      setVisibleCount(3)
      setAllLoaded(false)
      setOpenSnackbarNotFound(false)
    }, [filters])

    
    useEffect(() => {
    if (visibleCount >= filteredList.length && filteredList.length !== 0) {
      setAllLoaded(true)
    }
    }, [visibleCount, filteredList])

    
    useEffect(() => {
    if (allLoaded && filteredList.length >= visibleCount && !loading) {
      setOpenSnackbarNotFound(true)
    }
      }, [allLoaded, filteredList.length, loading, visibleCount])
    

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 3, filteredList.length))
      setIsLoading(false)
    }, 500)
  }
    
    return (
        <section className={s.container}>
            <h2 className='visually_hidden'>Psychologists You Can Trust</h2>
            <Filters context='favourites'/>

           {loading ? (
                <div className={s.load_wrap}>
                    <Loader />
                </div>
            ) : (
                <>
                    <PsychologistsList list={filteredList.slice(0, visibleCount)} />
                        
                    {filteredList.length > visibleCount && (
                        isLoading ? (
                            <div className={s.load_wrap_btn}>
                                <Loader />
                            </div>
                        ) : (
                                <button type="button" className={s.load_btn} onClick={handleLoadMore}>
                                    Load more
                                </button>
                            )
                        ) 
                    }
                    <CustomAlert
                        severity='warning'
                        openSnackbar={openSnackbar}
                        handleSnackbarClose={() => setOpenSnackbar(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        alertSx={{ backgroundColor: '#fff4e5', height: 'auto' }}
                    >
                        No favorites found for the selected filters
                        </CustomAlert>
                        
                        <CustomAlert
                                    severity="info"
                                    openSnackbar={openSnackbarNotFound}
                                    handleSnackbarClose={() => {setOpenSnackbarNotFound(false)}}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                    alertSx={{ height: 'auto' }}
                                >
                                    All psychologists loaded
                                </CustomAlert>
                        
                    {filteredList.length === 0 && !openSnackbar && favourites.length === 0 && (
                        <div className={s.text_wrap}>
                            <p className={s.not_found_text}>You have no favourite psychologists yet. But you can add some to favourites!</p>
                        </div>
                    )}
                </>
            )}
        </section>
    )
}

export default FavoritesPage