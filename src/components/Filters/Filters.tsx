import s from './Filters.module.css'
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/filters/slice.ts';
import { useClickOutside } from '../../hooks/useClickOutsideHook.ts';
import { filters, svg } from '../../constants/index.ts';
import { selectFilters } from '../../redux/filters/selectors.ts';
import { motion } from 'framer-motion';
import { FilterType } from '../../types/types.ts';

const Filters = () => {

    const isObjectsEqual = (obj1: FilterType | undefined, obj2: FilterType | undefined): boolean => {
       if (!obj1 || !obj2) return false
        
       const keys1 = Object.keys(obj1) as (keyof FilterType)[]
       const keys2 = Object.keys(obj2) as (keyof FilterType)[]
  
      if (keys1.length !== keys2.length) return false

      return keys1.every(key => obj1[key] === obj2[key])
}


    const iterableFilters = Object.keys(filters)

    const findFilterNameByObject = (currentFilterObj: FilterType): string => {
       return Object.keys(filters).find(key => isObjectsEqual(filters[key], currentFilterObj)) || 'A to Z'
}

    const selectedFilter = useSelector(selectFilters)
    const selectedFilterName = findFilterNameByObject(selectedFilter)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const dispatch = useDispatch()

    const handleChangeFilters = (filterName: string) => {
        dispatch(setFilters(filters[filterName]))
        setIsDropdownOpen(false)
    }

    useClickOutside(dropdownRef, () => setIsDropdownOpen(false))

    return (
        <div className={s.wrapper}>
            <p className={s.title}>Filters</p>
            <button type='button' onClick={toggleDropdown} className={s.green_btn}>
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