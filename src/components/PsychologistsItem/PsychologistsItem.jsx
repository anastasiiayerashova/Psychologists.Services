import s from './PsychologistsItem.module.css'
import { svg } from '../../constants/index.js'
import PsychologistsFeaturesList from '../PsychologistsFeaturesList/PsychologistsFeaturesList.jsx'
import PsychologistAvatar from '../PsychologistAvatar/PsychologistAvatar.jsx'
import Reviews from '../Reviews/Reviews.jsx'
import { useState } from 'react'
import { useModal } from '../../utils/ModalContext.js'
import FavouriteButton from '../FavouriteButton/FavouriteButton.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { selectFavourites, toggleFavourite } from '../../redux/favourites/slice.js'

const PsychologistsItem = ({ data }) => {
  
  const { about, avatar_url, experience, id, initial_consultation, license, name, price_per_hour, rating, reviews, specialization } = data

   const [showReviews, setShowReviews] = useState(false)

   const {openModal} = useModal()
   
   const handleMakeAppointment = () => {
        openModal('booking', data)
   }
   
   const dispatch = useDispatch()

   const favourites = useSelector(selectFavourites)
   const isFavourite = favourites.some(favourite => favourite.id === id)

   const handleToggleFavourite = () => {
        dispatch(toggleFavourite(data))
    }
  
  return (
    <li className={s.card}>
      <div className={s.card_header}>
        <FavouriteButton isFavourite={isFavourite} onClick={handleToggleFavourite}/>
        <PsychologistAvatar data={data} />
           <div className={s.card_main}>

              <div className={s.header_wrap}>
                 <div className={s.title_wrap}>
                    <p className={s.subtitle}>Psychologist</p>
                    <h2 className={s.name}>{name}</h2>
                 </div>

                 <div className={s.meta}>
                    <p className={s.rating}>
                       <svg width={16} height={16}>
                          <use href={`${svg}#icon-star`} />
                       </svg>
                       {`Rating: ${rating}`}
                    </p>
                    <span className={s.separator}>|</span>
                    <p className={s.price_label}>
                    Price / 1 hour: <span>{`${price_per_hour}$`}</span>
                    </p>
                  </div>
              </div>

              <div className={s.card_body_desc}>
                 <PsychologistsFeaturesList data={data} />
                 <p className={s.about}>{about}</p>
                 <div className={`${s.reviewsWrapper} ${showReviews ? s.open : ''}`}>
                      <Reviews data={data}/>
                 </div>
                 <button type='button' onClick={showReviews ? handleMakeAppointment : () => setShowReviews(true)} className={showReviews ? s.make : s.read}>
                     {showReviews ? 'Make an appointment' : 'Read more'}
                 </button>
              </div>
          </div>
      </div>

      <div className={s.card_body_mob}>
         <PsychologistsFeaturesList data={data} />
         <p className={s.about}>{about}</p>
         <div className={`${s.reviewsWrapper} ${showReviews ? s.open : ''}`}>
              <Reviews data={data}/>
         </div>
         <button type='button' onClick={showReviews ? handleMakeAppointment : () => setShowReviews(true)} className={showReviews ? s.make : s.read}>
              {showReviews ? 'Make an appointment' : 'Read more'}
          </button>
      </div>
    </li>
  )
}

export default PsychologistsItem

