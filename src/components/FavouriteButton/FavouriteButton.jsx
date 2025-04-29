import s from './FavouriteButton.module.css'
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/slice.js';

const FavouriteButton = ({ isFavourite, onClick }) => {

  const isAuth = useSelector(selectIsAuth)
    
  return (
    <button type="button" className={s.icon_btn} onClick={onClick}>
      {isFavourite ? (
        isAuth ? (<FaHeart className={s.heart} /> ) : (<FaRegHeart/>)
      ) : (
        <FaRegHeart/>
      )}
    </button>
  );
 }

export default FavouriteButton