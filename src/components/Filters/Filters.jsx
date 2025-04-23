import s from './Filters.module.css'
import { FormControl, MenuItem, Select } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setFilters } from '../../redux/filters/slice.js';
import { useClickOutside } from '../../utils/customHook.js';

const Filters = () => {

    const svg = '/sprite.svg'

    const filters = {
        'A to Z': { direction: 'asc' },
        'Z to A': { direction: 'desc' },
        'Less than 10$': { priceLess: 10 },
        'Greater than 10$': { priceGreater: 10 },
        'Popular': { sortBy: 'rating', direction: 'desc' },
        'Not popular': { sortBy: 'rating', direction: 'asc' },
        'Show all': {}
    }

    const iterableFilters = Object.keys(filters)

    const [selectedFilter, setSelectedFilter] = useState('A to Z')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const dispatch = useDispatch()

    const handleChangeFilters = (filterName) => {
        dispatch(setFilters(filters[filterName]))
        setSelectedFilter(filterName)
         setIsDropdownOpen(false)
         console.log(filterName)
    }

    useClickOutside(dropdownRef, () => setIsDropdownOpen(false))

    return (
        <div className={s.wrapper}>
            <p className={s.title}>Filters</p>
            <button onClick={toggleDropdown} className={s.green_btn}>
                {selectedFilter}
                <svg className={`${s.icon_arrow} ${isDropdownOpen ? s.open : ''}`} width={20} height={20}>
                    <use href={`${svg}#icon-arrow-down`} />
                </svg>
            </button>
            {isDropdownOpen && (
                <div className={`${s.list_wrap} ${isDropdownOpen ? s.open : ''}`} ref={dropdownRef}>
                    <ul className={s.list}>
                    {iterableFilters.map((filter) => (
                        <li className={`${s.list_item} ${selectedFilter === filter ? s.active : ''}`} key={filter} onClick={() => handleChangeFilters(filter)}>
                            {filter}
                        </li>
                    ))}
                    </ul>
                </div>
            )}
        </div>
    )
 }

export default Filters