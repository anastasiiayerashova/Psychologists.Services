import s from './PsychologistsItem.module.css'
import { svg } from '../../constants/index.ts'
import PsychologistsFeaturesList from '../PsychologistsFeaturesList/PsychologistsFeaturesList.tsx'
import PsychologistAvatar from '../PsychologistAvatar/PsychologistAvatar.tsx'
import Reviews from '../Reviews/Reviews.tsx'
import { useState, useRef, useEffect } from 'react'
import { useModal } from '../../utils/ModalContext.ts'
import FavouriteButton from '../FavouriteButton/FavouriteButton.tsx'
import { useSelector, useDispatch } from 'react-redux'
import { selectFavouritesData, selectIsAuth, selectUserId } from '../../redux/auth/slice.ts'
import { AnimatePresence, motion } from 'framer-motion'
import { reviewsVariants } from '../../styles/animation.ts'
import { addFavouritePsychologist, removeFavouritePsychologist } from '../../redux/auth/operations.ts'
import { PsychologistItemProps } from '../../types/PropsTypes.ts'
import { AppDispatch, RootState } from '../../redux/store.ts'
import { IPsychologist } from '../../types/IPsychologist.ts'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


const PsychologistsItem = ({ data }: PsychologistItemProps) => {
  
  const { about, id, name, price_per_hour, rating } = data

   const [showReviews, setShowReviews] = useState<boolean>(false)

   const { openModal, showAlert } = useModal()
   
   const isAuth = useSelector<RootState, boolean>(selectIsAuth)
   const userId = useSelector<RootState, string | null>(selectUserId) 
   const aboutRef = useRef<HTMLParagraphElement | null>(null)
   const aboutRefMob = useRef<HTMLParagraphElement | null>(null)
   
   const handleMakeAppointment = (): void => {
        openModal('booking', data)
   }
   
   const dispatch = useDispatch<AppDispatch>()

   const favourites = useSelector<RootState, IPsychologist[]>(selectFavouritesData)
   const isFavourite = favourites.some(favourite => favourite.id === id)

   const handleToggleFavourite = (): void => {
      if (!isAuth) {
         showAlert('error', 'You must be logged in to add to favorites')
         return
      }
      
      if (!userId || !id) {
         showAlert('error', 'Sorry, psychologist is not available at the moment')
         return
      }

      if (isFavourite) {
         dispatch(removeFavouritePsychologist({ userId, psychologistId: id }))
            .unwrap()
            .then(() => {
               showAlert('success', `Psychologist ${name} removed from favourites`)
            })
            .catch((e: unknown) => {
            console.log('Error during remove favourites:', e)
         })
      }
      else {
         dispatch(addFavouritePsychologist({ userId, psychologistId: id }))
            .unwrap()
            .then(() => {
               showAlert('success', `Psychologist ${name} added to favourites`)
            })
            .catch((e: unknown) => {
            console.log('Error during add favourites:', e)
         })
      }
   }

   useEffect(() => {
      gsap.from(aboutRef.current, {
          y: 100,                 
          autoAlpha: 0,          
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
             trigger: aboutRef.current,
             start: 'top 90%',
             toggleActions: 'play none none none',
          },
      })

      gsap.from(aboutRefMob.current, {
          y: 50,                 
          autoAlpha: 0,          
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
             trigger: aboutRef.current,
             start: 'top 90%',
             toggleActions: 'play none none none',
          },
      })
   }, [])
  
return (
   <motion.li
      className={s.card}
      layout   
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
      transition={{ duration: 0.3 }}>
      
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
                 <p ref={aboutRef} className={s.about}>{about}</p>
                 <AnimatePresence initial={false}>
                        {showReviews && (
                          <motion.div
                             initial="hidden"
                             animate="visible"
                             exit="exit"
                             variants={reviewsVariants}
                           >
                              <Reviews data={data}/>
                          </motion.div>
                        )}
                 </AnimatePresence>
                 <motion.button
                    type='button'
                    whileTap={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    onClick={showReviews ? handleMakeAppointment : () => setShowReviews(true)}
                    className={showReviews ? s.make : s.read}>
                       {showReviews ? 'Make an appointment' : 'Read more'}
                 </motion.button>
              </div>
          </div>
      </div>

      <div className={s.card_body_mob}>
         <PsychologistsFeaturesList data={data} />
         <p ref={aboutRefMob} className={s.about}>{about}</p>
            <AnimatePresence initial={false}>
               {showReviews && (
                 <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={reviewsVariants}
                  >
                    <Reviews data={data}/>
                 </motion.div>
               )}
            </AnimatePresence>
         <motion.button
            type='button'
            whileTap={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            onClick={showReviews ? handleMakeAppointment : () => setShowReviews(true)}
            className={showReviews ? s.make : s.read}>
               {showReviews ? 'Make an appointment' : 'Read more'}
          </motion.button>
      </div>
   </motion.li>
  )
}

export default PsychologistsItem

