import s from './BookingForm.module.css'
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useId } from 'react';
import { schema } from '../../validation/bookingSchema.js';
import { svg } from '../../constants/index.js';
import TimePicker from '../TimePicker/TimePicker.jsx';
import { useRef } from 'react';
import { useClickOutside } from '../../utils/customHook.js';
import CustomAlert from '../CustomAlert/CustomAlert.jsx';

const BookingForm = ({ data, onClose }) => {
    
    const { name, avatar_url } = data
    
    const emailId = useId()
    const nameId = useId()
    const phoneId = useId()
    const commentId = useId()
    const dateId = useId()

    const dropdownRef = useRef(null)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema()),
        values: { name: '', email: '', phone: '', comment: '', date: '' },
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

      const [isOpen, setIsOpen] = useState(false);
      const [selectedHour, setSelectedHour] = useState('00')
      const [selectedMinute, setSelectedMinute] = useState('00')
    
      const onChange = (time) => {
        console.log("Selected time: ", time)
    }

      const handleSelect = (hour, minute) => {
        setSelectedHour(hour)
        setSelectedMinute(minute)
        onChange(`${hour}:${minute}`)
        setValue('date', `${hour}:${minute}`, { shouldValidate: true })
        setIsOpen(false)
    }
    
    useClickOutside(dropdownRef, () => setIsOpen(false))

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [bookedDate, setBookedDate] = useState('')
    const [bookedName, setBookedName] = useState('')

    const onSubmit = (values) => {
        console.log(values)
        setOpenSnackbar(true)
        setBookedName(values.name)
        setBookedDate(values.date)
        reset()
        setSelectedHour('00')
        setSelectedMinute('00')
        
        setTimeout(() => {
            onClose()
        }, 4000)
    }
    
    return (
        <div className={s.container}>
            <div className={s.title_wrap}>
                <p className={s.title}>Make an appointment with a psychologists</p>
                <p className={s.subtitle}>You are on the verge of changing your life for the better. Fill out the short form below to book your personal appointment with a professional psychologist. We guarantee confidentiality and respect for your privacy.</p>
            </div>
            <div className={s.avatar_wrap}>
                    <Avatar src={avatar_url} alt={name} sx={{
                    borderRadius: '15px',
                        width: {
                            xs: 44,     
                            sm: 44,     
                            lg: 44      
                        },
                        height: {
                            xs: 44,
                            sm: 44,
                            lg: 44
                        }  
                    }}
                    />
                <div className={s.name_wrap}>
                    <p className={s.head}>Your psychologists</p>
                    <p className={s.name}>{name}</p>
                </div>
            </div>

            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.input_group}>
                    <label htmlFor={nameId} className='visually_hidden'>Name</label>
                    <input id={nameId} type='text' {...register('name')} placeholder='Name' />
                    {errors.name && <p className={s.error}>{errors.name.message}</p>}
                </div>
                <div className={s.phone_wrapper}>
                    <div className={s.input_group}>
                        <label htmlFor={phoneId} className='visually_hidden'>Phone</label>
                        <input id={phoneId} type='text' {...register('phone')} placeholder='+380' />
                        {errors.phone && <p className={s.error}>{errors.phone.message}</p>}
                    </div>
                    <div className={s.input_group_icon}>
                        <label htmlFor={dateId} className='visually_hidden'>Date</label>
                        <input id={dateId} type='text' {...register('date')} placeholder='00:00'
                            value={`${selectedHour}:${selectedMinute}`}
                            onClick={() => setIsOpen(!isOpen)}
                            readOnly/>
                        <button type='button' className={s.icon_btn} onClick={() => setIsOpen(!isOpen)}>
                            <svg width="20" height="20" fill='none' stroke='black'>
                               <use href={`${svg}#icon-clock`} />
                            </svg>
                        </button>
                        {isOpen && (
                            <TimePicker
                                isOpen={isOpen}
                                selectedHour={selectedHour}
                                selectedMinute={selectedMinute}
                                handleSelect={handleSelect}
                                ref={dropdownRef}
                            />
                        )}
                        {errors.date && <p className={s.error}>{errors.date.message}</p>}
                    </div>
                </div>
                <div className={s.input_group}>
                    <label htmlFor={emailId} className='visually_hidden'>Email</label>
                    <input id={emailId} type='text' {...register('email')} placeholder='Email' />
                    {errors.email && <p className={s.error}>{errors.email.message}</p>}
                </div>
                <div className={s.input_group}>
                    <label htmlFor={commentId} className='visually_hidden'>Comment</label>
                    <textarea rows='5' cols='30' id={commentId} type='text' {...register('comment')} placeholder='Comment' />
                    {errors.comment && <p className={s.error}>{errors.comment.message}</p>}
                </div>
                <button type='submit' className={s.send_btn}>Send</button>
            </form>

            <CustomAlert
                openSnackbar={openSnackbar}
                severity='success'
                handleSnackbarClose={() => setOpenSnackbar(false)}
                alertSx={{ backgroundColor: '#d4edda', height: 'auto', textAlign: 'left' }}
            >
                {`Thank you ${bookedName}, your meeting time is ${bookedDate} !`}
            </CustomAlert>
        </div>
    )
 }

export default BookingForm