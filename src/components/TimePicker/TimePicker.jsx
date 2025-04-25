import s from './TimePicker.module.css'
import { useState } from 'react'
import { motion } from 'framer-motion'

const TimePicker = ({ isOpen, selectedHour, selectedMinute, handleSelect }) => {

 const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const minutes = ['00', '30'];
    
      const timeSlots = hours.flatMap(hour =>
    minutes.map(minute => ({
      time: `${hour}:${minute}`,
      hour,
      minute
    }))
  );
    
    return (
       <motion.div
          className={s.popover}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <p className={s.popover_title}>Meeting time</p>
          <div className={s.picker}>
            {hours.map((h) => (
              <div
                key={h}
                className={s.timeSlot}
                onClick={() => handleSelect(h, selectedMinute)}
              >
                <div className={s.item}>{h}</div>
                <div className={s.separator}>:</div>
                <div className={s.item}>{selectedMinute}</div>
              </div>
            ))}
            {minutes.map((m) => (
              <div
                key={m}
                className={s.timeSlot}
                onClick={() => handleSelect(selectedHour, m)}
              >
                <div className={s.item}>{selectedHour}</div>
                <div className={s.separator}>:</div>
                <div className={s.item}>{m}</div>
              </div>
            ))}
          </div>
        </motion.div>
    )
 }

export default TimePicker