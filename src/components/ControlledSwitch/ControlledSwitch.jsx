import { useState, useEffect } from 'react'
import { CustomSwitcher } from "react-custom-switcher"
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUserId } from '../../redux/auth/slice.js';
import { db } from '../../config/firebase.js';

const trackGrayOverride = {
  track: {
    backgroundColor: '#ccc',
    height: 4,
    borderRadius: 10,
  },
   thumb: {
    width: 8, 
    height: 12,
    borderRadius: 10,
  },
}

const themeOptions = [
  {
    label: <div style={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: '#54be96' }} />,
    value: 'green',
    color: '#54be96',
  },
  {
    label: <div style={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: '#3470ff' }} />,
    value: 'blue',
    color: '#3470ff',
  },
  {
    label: <div style={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: '#fc832c' }} />,
    value: 'orangered',
    color: '#fc832c',
  },
]

const ControlledSwitch = () => {

const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem('theme') || 'green'
  })

const userId = useSelector(selectUserId)


const handleChange = async (value) => {
  setSelectedTheme(value)
  updateTheme(value)
  localStorage.setItem('theme', value)
  window.dispatchEvent(new Event('storage'))

  if (userId) {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {theme: value})
  }
}
  

const updateTheme = (theme) => {
  const root = document.documentElement
  root.classList.remove('green-theme', 'blue-theme', 'orangered-theme')
  root.classList.add(`${theme}-theme`)
}
  

useEffect(() => {
  updateTheme(selectedTheme)
}, [selectedTheme])
  

return (
    <div className='track'>
        <CustomSwitcher
        options={themeOptions}
        value={selectedTheme}
        variant='secondary'
        overrides={trackGrayOverride}
        containerWidth={120}
        switchSize={30}
        callback={handleChange}
        />
    </div>
  )
 }

export default ControlledSwitch