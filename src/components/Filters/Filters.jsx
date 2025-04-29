import s from './Filters.module.css'
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/filters/slice.js';
import { useClickOutside } from '../../utils/customHook.js';
import { filters, svg } from '../../constants/index.js';
import { selectFilters } from '../../redux/filters/selectors.js';
import { motion } from 'framer-motion';

const Filters = () => {

    const isObjectsEqual = (obj1, obj2) => {
       if (!obj1 || !obj2) return false
        
       const keys1 = Object.keys(obj1)
       const keys2 = Object.keys(obj2)
  
      if (keys1.length !== keys2.length) return false

      return keys1.every(key => obj1[key] === obj2[key])
}


    const iterableFilters = Object.keys(filters)

    const findFilterNameByObject = (currentFilterObj) => {
       return Object.keys(filters).find(key => isObjectsEqual(filters[key], currentFilterObj)) || 'A to Z'
}

    const selectedFilter = useSelector(selectFilters)
    const selectedFilterName = findFilterNameByObject(selectedFilter)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const dispatch = useDispatch()

    const handleChangeFilters = (filterName) => {
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