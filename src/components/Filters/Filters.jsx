import s from './Filters.module.css'
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../redux/filters/slice.js';
import { useClickOutside } from '../../utils/customHook.js';
import { filters, svg } from '../../constants/index.js';

const Filters = () => {

    const iterableFilters = Object.keys(filters)

    const [selectedFilter, setSelectedFilter] = useState('A to Z')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const dispatch = useDispatch()

    const handleChangeFilters = (filterName) => {
        console.log("Selected filter:", filterName); 
        console.log("Filter object:", filters[filterName]);
        dispatch(setFilters(filters[filterName]))
        setSelectedFilter(filterName)
        setIsDropdownOpen(false)
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