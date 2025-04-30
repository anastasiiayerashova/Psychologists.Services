import s from './FavoritesPage.module.css'
import Filters from '../../components/Filters/Filters.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { selectFilters } from '../../redux/filters/selectors.js'
import CustomAlert from '../../components/CustomAlert/CustomAlert.jsx'
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.jsx'
import { useEffect, useState } from 'react'
import { resetFavouritesData, selectFavouritesData, selectUserId } from '../../redux/auth/slice.js'
import { getFavouritesPsychologists } from '../../redux/auth/operations.js'
import { resetList } from '../../redux/psychologists/slice.js'

const FavoritesPage = () => {

    const favourites = useSelector(selectFavouritesData)
    const userId = useSelector(selectUserId)
    const filters = useSelector(selectFilters)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [visibleCount, setVisibleCount] = useState(3)
    const [allLoaded, setAllLoaded] = useState(false)
    const [openSnackbarNotFound, setOpenSnackbarNotFound] = useState(false)
   

    useEffect(() => {
        if (userId) {
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
      list = list.filter(item => item.price_per_hour < filters.priceLess)
    }

    if (filters.priceGreater) {
      list = list.filter(item => item.price_per_hour > filters.priceGreater)
    }

    if (filters.sortBy) {
      list.sort((a, b) => {
        if (filters.sortBy === 'name') {
          return filters.direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        } else {
          return filters.direction === 'asc'
            ? a[filters.sortBy] - b[filters.sortBy]
            : b[filters.sortBy] - a[filters.sortBy]
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
      }, [allLoaded, filteredList.length, loading])
    

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, filteredList.length))
  }
    
    return (
        <section className={s.container}>
            <h2 className='visually_hidden'>Psychologists You Can Trust</h2>
            <Filters />

           {loading ? (
                <div className={s.load_wrap}>
                    <Loader />
                </div>
            ) : (
                <>
                    <PsychologistsList list={filteredList.slice(0, visibleCount)} />
                        
                    {filteredList.length > visibleCount && (
                        <button type="button" className={s.load_btn} onClick={handleLoadMore}>
                            Load more
                        </button>
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