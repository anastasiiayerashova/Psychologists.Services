import s from './FavouriteButton.module.css'
import { svg } from '../../constants/index.js'

const FavouriteButton = ({ isFavourite, onClick }) => {
    
    return (
        <button type='button' className={s.icon_btn} onClick={onClick}>
            {isFavourite ? (
              <svg className={s.icon}>
                 <use href={`${svg}#icon-heart-green`} />
              </svg>
            ) : (
              <svg className={s.icon} fill='none' stroke='black'>
                 <use href={`${svg}#icon-heart-black`} />
              </svg>
            )}
        </button>
    )
 }

export default FavouriteButton