import s from './FavouriteButton.module.css'
import { svg } from '../../constants/index.js'
import { useEffect, useState } from 'react'

const FavouriteButton = ({ isFavourite, onClick }) => {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'green')

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedTheme = localStorage.getItem('theme');
    
      if (updatedTheme) {
        setTheme(updatedTheme)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const isGreenTheme = theme === 'green'
    
  return (
    <button type="button" className={s.icon_btn} onClick={onClick}>
      {isFavourite ? (
        isGreenTheme ? (
          <svg className={s.icon}>
             <use href={`${svg}#icon-heart-green`} />
          </svg>
        ) : (
          <svg className={s.icon}>
            <use href={`${svg}#icon-heart-orange`} />
          </svg>
        )
      ) : (
        <svg className={s.icon} fill="none" stroke="black">
           <use href={`${svg}#icon-heart-black`} />
        </svg>
      )}
    </button>
  );
 }

export default FavouriteButton