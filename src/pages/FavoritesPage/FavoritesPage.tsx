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
import { Title, Meta } from 'react-head'
import { motion } from 'framer-motion'

const FavoritesPage = () => {

    const favourites = useSelector<RootState, IPsychologist[]>(selectFavouritesData)
    const userId = useSelector<RootState, string | null>(selectUserId)
    const filters = useSelector<RootState, FilterType>(selectFavouritesFilters)
    const dispatch = useDispatch<AppDispatch>()

    const [loading, setLoading] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [visibleCount, setVisibleCount] = useState<number>(3)
    const [openSnackbarNotFound, setOpenSnackbarNotFound] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [suppressAlerts, setSuppressAlerts] = useState<boolean>(false)
   
  
    useEffect(() => {
      const fetchFavourites = async (): Promise<void> => {
        try {
          if (userId) {
            dispatch(resetFavouritesList())
            setLoading(true)
            await dispatch(getFavouritesPsychologists(userId)).unwrap()
          }
        }
        catch (e: unknown) {
          console.log('Error during fetching favourites:', e)
        }
        finally {
          setLoading(false)
        }
      }
      fetchFavourites()
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

    return list
    }, [favourites, filters])
    

    useEffect(() => {
      setVisibleCount(3)
      setOpenSnackbarNotFound(false)
      setSuppressAlerts(true)
      const timeout = setTimeout(() => {
         setSuppressAlerts(false)
  }, 100)

  return () => clearTimeout(timeout)
  }, [filters])

    
  useEffect(() => {
      const hasFilters = Object.keys(filters).length > 0
      const hasFavourites = favourites.length > 0
      const noMatches = filteredList.length === 0

      if (!suppressAlerts && !loading && hasFilters && hasFavourites && noMatches) {
         setOpenSnackbar(true)
      } else {
         setOpenSnackbar(false)
      }
  }, [filters, favourites.length, filteredList.length, loading, suppressAlerts])
    

  const handleLoadMore = () => {
      setIsLoading(true)
      setTimeout(() => {
        setVisibleCount(prev => {
          const newCount = Math.min(prev + 3, filteredList.length)
          if (newCount >= filteredList.length) {
            setOpenSnackbarNotFound(true)
          }
          return newCount
          })
          setIsLoading(false)
      }, 500)
  }
    
return (
    <>
      <Title>psychologists.services | your favourite psychologists</Title>
      <Meta
          name="description"
          content="View and manage your favorite psychologists. Apply filters and book appointments directly from your saved list."
      />
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
                            <motion.button
                                type="button"
                                className={s.load_btn}
                                whileTap={{ scale: 1.3 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                onClick={handleLoadMore}>
                                    Load more
                            </motion.button>
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
      </>
    )
}

export default FavoritesPage