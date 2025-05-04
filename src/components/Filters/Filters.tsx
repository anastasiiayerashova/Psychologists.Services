import s from './Filters.module.css'
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavouritesFilter, setFilters } from '../../redux/filters/slice.ts';
import { useClickOutside } from '../../hooks/useClickOutsideHook.ts';
import { filters, svg } from '../../constants/index.ts';
import { selectFilters } from '../../redux/filters/selectors.ts';
import { motion } from 'framer-motion';
import { FilterType, FilterName } from '../../types/types.ts';
import { selectFavouritesFilters } from '../../redux/filters/selectors.ts';
import { RootState } from '../../redux/store.ts';
import { FiltersProps } from '../../types/PropsTypes.ts';
import gsap from 'gsap'


const Filters = ({ context }: FiltersProps) => {
    
    const filterRef = useRef<HTMLButtonElement>(null)
    const textRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
         gsap.fromTo(
            textRef.current,
            { opacity: 0, y: -40 },
            { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power2.out' }
        )
        
         gsap.fromTo(
            filterRef.current,
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power2.out' }
        )
    }, [context])

    const isObjectsEqual = (obj1: FilterType | undefined, obj2: FilterType | undefined): boolean => {
       if (!obj1 || !obj2) return false
        
       const keys1 = Object.keys(obj1) as (keyof FilterType)[]
       const keys2 = Object.keys(obj2) as (keyof FilterType)[]
  
      if (keys1.length !== keys2.length) return false

      return keys1.every(key => obj1[key] === obj2[key])
    }


    const iterableFilters = Object.keys(filters) as FilterName[]

    const findFilterNameByObject = (currentFilterObj: FilterType): FilterName => {
       return Object.keys(filters).find(key => isObjectsEqual(filters[key], currentFilterObj)) || 'A to Z'
    }

    const selectedFilter = useSelector<RootState, FilterType>(context === 'psychologist' ? selectFilters : selectFavouritesFilters)
    const selectedFilterName = findFilterNameByObject(selectedFilter)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const dispatch = useDispatch()

    const handleChangeFilters = (filterName: FilterName): void => {
        if (context === 'psychologist') {
            dispatch(setFilters(filters[filterName]))
            setIsDropdownOpen(false)
        }
        else {
            dispatch(setFavouritesFilter(filters[filterName]))
            setIsDropdownOpen(false)
        }
    }

    useClickOutside(dropdownRef, () => setIsDropdownOpen(false))

    return (
        <div  className={s.wrapper}>
            <p ref={textRef} className={s.title}>Filters</p>
            <button ref={filterRef} type='button' onClick={toggleDropdown} className={s.green_btn}>
                {selectedFilterName}
                <svg className={`${s.icon_arrow} ${isDropdownOpen ? s.open : ''}`} width={20} height={20}>
                    <use href={`${svg}#icon-arrow-down`} />
                </svg>
            </button>
            {isDropdownOpen && (
                <motion.div className={`${s.list_wrap} ${isDropdownOpen ? s.open : ''}`} ref={dropdownRef} initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}>
                    <ul className={s.list}>
                    {iterableFilters.map((filter) => (
                        <li className={`${s.list_item} ${selectedFilterName === filter ? s.active : ''}`} key={filter} onClick={() => handleChangeFilters(filter)}>
                            {filter}
                        </li>
                    ))}
                    </ul>
                </motion.div>
            )}
        </div>
    )
 }

export default Filters