import { TimePickerProps } from '../../types/PropsTypes'
import s from './TimePicker.module.css'
import { motion } from 'framer-motion'


const TimePicker = ({ selectedHour, selectedMinute, handleSelect, ref }: TimePickerProps) => {

    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))

    const minutes = ['00', '30']

    const totalSlots = hours.length * minutes.length

    return (
       <motion.div
          className={s.popover}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          ref={ref}
        >
          <p className={s.popover_title}>Meeting time</p>
          <div className={s.picker}>
                
          {Array.from({ length: totalSlots }).map((_, idx) => {
              const hour = hours[Math.floor(idx / minutes.length)]
              const minute = minutes[idx % minutes.length]
              const key = `${hour}:${minute}`
              const isActive = hour === selectedHour && minute === selectedMinute;

                return (
                   <div
                      key={key}
                      className={`${s.timeSlot} ${isActive ? s.active : ''}`}
                      onClick={() => handleSelect(hour, minute)}
                    >
                      <div className={`${s.item} ${isActive ? s.active : ''}`}>{hour}</div>
                      <div className={`${s.separator} ${isActive ? s.active : ''}`}>:</div>
                      <div className={`${s.item} ${isActive ? s.active : ''}`}>{minute}</div>
                    </div>
                )
            })}
          </div>
        </motion.div>
    )
 }

export default TimePicker