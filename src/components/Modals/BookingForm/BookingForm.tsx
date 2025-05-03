import s from './BookingForm.module.css'
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useId, useRef } from 'react';
import { schema } from '../../../validation/bookingSchema.ts';
import { svg } from '../../../constants/index.ts';
import TimePicker from '../../TimePicker/TimePicker.tsx';
import { useClickOutside } from '../../../hooks/useClickOutsideHook.ts';
import { BookingFormProps } from '../../../types/PropsTypes.ts';
import { BookingFormData } from '../../../types/types.ts';
import { useModal } from '../../../utils/ModalContext.ts';
import Confetti from '../../Confetti/Confetti.tsx';


const BookingForm = ({ data, onClose }: BookingFormProps) => {
    
    const { name, avatar_url } = data
    
    const emailId = useId()
    const nameId = useId()
    const phoneId = useId()
    const commentId = useId()
    const dateId = useId()

    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {errors}
    } = useForm<BookingFormData>({
        resolver: yupResolver(schema()),
        values: { name: '', email: '', phone: '', comment: '', date: '' },
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

      const [isOpen, setIsOpen] = useState<boolean>(false);
      const [selectedHour, setSelectedHour] = useState<string>('00')
      const [selectedMinute, setSelectedMinute] = useState<string>('00')
      const [bookedName, setBookedName] = useState<string>('')
      const [isVisible, setIsVisible] = useState<boolean>(false)
      const {showAlert} = useModal()
    
      const onChange = (time: string) => {
        console.log("Selected time: ", time)
    }

      const handleSelect = (hour: string, minute: string) => {
        setSelectedHour(hour)
        setSelectedMinute(minute)
        onChange(`${hour}:${minute}`)
        setValue('date', `${hour}:${minute}`, { shouldValidate: true })
        setIsOpen(false)
    }
    
    useClickOutside(dropdownRef, () => setIsOpen(false))

    const onSubmit = (values: BookingFormData) => {
        setBookedName(values.name)
        showAlert('success', `Thank you ${bookedName}! Your meeting with ${name} is scheduled for ${values.date} !`)
        setIsVisible(true)
        reset()
        setSelectedHour('00')
        setSelectedMinute('00')
        
        setTimeout(() => {
            onClose()
        }, 2000)
    }
    
    return (
        <div className={s.container}>
            {isVisible && <Confetti />}
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
                    <textarea rows={5} cols={30} id={commentId} {...register('comment')} placeholder='Comment' />
                    {errors.comment && <p className={s.error}>{errors.comment.message}</p>}
                </div>
                <button type='submit' className={s.send_btn}>Send</button>
            </form>
        </div>    
    )
 }

export default BookingForm