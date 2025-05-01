import s from './FavouriteButton.module.css'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/slice.ts';
import { FavouriteButtonProps } from '../../types/PropsTypes.ts';

const FavouriteButton = ({ isFavourite, onClick }: FavouriteButtonProps) => {

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