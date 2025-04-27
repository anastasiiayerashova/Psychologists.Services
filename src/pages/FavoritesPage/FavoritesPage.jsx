import s from './FavoritesPage.module.css'
import Filters from '../../components/Filters/Filters.jsx'
import Loader from '../../components/Loader/Loader.jsx'
import { useSelector } from 'react-redux'
import { selectFavourites } from '../../redux/favourites/slice.js'
import { selectFilters } from '../../redux/filters/selectors.js'
import CustomAlert from '../../components/CustomAlert/CustomAlert.jsx'
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.jsx'
import { useEffect, useState } from 'react'

const FavoritesPage = () => {

    const favourites = useSelector(selectFavourites)
    const filters = useSelector(selectFilters)
    const [filteredList, setFilteredList] = useState([])
    const [loading, setLoading] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)

    useEffect(() => {
        setLoading(true)

        const timeId = setTimeout(() => {
            filterFavourites()
            setLoading(false)
        }, 300)

        return () => clearTimeout(timeId)
    }, [favourites, filters])


    const filterFavourites = () => {
        let updateList = [...favourites]

        if (filters.priceLess) {
            updateList = updateList.filter(item => item.price_per_hour < filters.priceLess)
        }

        if (filters.priceGreater) {
            updateList = updateList.filter(item => item.price_per_hour > filters.priceGreater)
        }

        if (filters.sortBy) {
            updateList.sort((a, b) => {
                if (filters.sortBy === 'name') {
                    return filters.direction === 'asc' ?
                        a.name.localeCompare(b.name)
                        :
                        b.name.localeCompare(a.name)
                }
                else if (filters.sortBy === 'price_per_hour' || filters.sortBy === 'rating') {
                    return filters.direction === 'asc' ?
                        a[filters.sortBy] - b[filters.sortBy]
                        :
                        b[filters.sortBy] - a[filters.sortBy]
                }
                return 0
            })
        }

        setFilteredList(updateList)
        setOpenSnackbar(false)

        if (updateList.length === 0 && favourites.length > 0) {
            setOpenSnackbar(true)
        }
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
                    <PsychologistsList list={filteredList} />
                        
                    {/* {filteredList.length !== 0 && !loading && (
                        <button type="button" className={s.load_btn} onClick={handleLoadMore}>
                            Load more
                        </button>
                    )} */}
                        
                    <CustomAlert
                        severity='warning'
                        openSnackbar={openSnackbar}
                        handleSnackbarClose={() => setOpenSnackbar(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        alertSx={{ backgroundColor: '#fff4e5', height: 'auto' }}
                    >
                        No favorites found for the selected filters
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