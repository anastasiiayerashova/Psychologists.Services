import s from './FavouriteButton.module.css'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/slice.ts';
import { FavouriteButtonProps } from '../../types/PropsTypes.ts';
import { RootState } from '../../redux/store.ts';
import { motion } from 'framer-motion';


const FavouriteButton = ({ isFavourite, onClick }: FavouriteButtonProps) => {

  const isAuth = useSelector<RootState, boolean>(selectIsAuth)
    
  return (
    <motion.button
      type="button"
      className={s.icon_btn}
      onClick={onClick}
      whileTap={{ scale: 1.3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
        {isFavourite ? (
            isAuth ? (
               <FaHeart className={s.heart} />
            ) : (
               <FaRegHeart />
            )
          ) : (
               <FaRegHeart/>
        )}
    </motion.button>
  )
 }

export default FavouriteButton