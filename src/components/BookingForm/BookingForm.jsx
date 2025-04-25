import s from './BookingForm.module.css'
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useId } from 'react';
import { schema } from '../../validation/bookingSchema.js';

const BookingForm = ({ data, onClose }) => {
    
    const { name, avatar_url } = data
    
    const emailId = useId()
    const nameId = useId()
    const phoneId = useId()
    const commentId = useId()

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        watch,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema()),
        values: { name: '', email: '', phone: '', comment: '', date: '' },
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

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

            <form className={s.form}>
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
                    <div className={s.input_group}>
                        <label htmlFor={phoneId} className='visually_hidden'>Phone</label>
                        <input id={phoneId} type='number' {...register('phone')} placeholder='+380' />
                        {errors.phone && <p className={s.error}>{errors.phone.message}</p>}
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
        </div>
    )
 }

export default BookingForm