import s from './SignUpForm.module.css'
import { schema } from '../../validation/signUpSchema.js'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useId } from 'react';
import { svg } from '../../constants/index.js';
import { signUpUser } from '../../redux/auth/operations.js';

const SignUpForm = ({ onClose }) => {
        
        const dispatch = useDispatch()
        const navigate = useNavigate()
    
        const nameId = useId()
        const emailId = useId()
        const pwdId = useId()
    
        const [showPassword, setShowPassword] = useState(false)
        const togglePasswordVisibility = () => setShowPassword(!showPassword)
    
        const {
        register,
        handleSubmit,
        reset,
        trigger,
        getValues,
        watch,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema()),
        defaultValues: { name: '', email: '', password: '' },
        mode: 'onChange',
        reValidateMode: 'onChange',
      });
  
      const onSubmit = (values) => {
         dispatch(signUpUser({values}))
      }
    
        return (
            <div className={s.container}>
                <div className={s.title_wrap}>
                    <p className={s.title}>Registration</p>
                    <p className={s.subtitle}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.</p>
                </div>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.input_group}>
                        <label htmlFor={nameId} className='visually_hidden'>Name</label>
                        <input id={nameId} type='text' {...register('name')} placeholder='Name' />
                        {errors.name && <p className={s.error}>{errors.name.message}</p>}
                    </div>
                    <div className={s.input_group}>
                        <label htmlFor={emailId} className='visually_hidden'>Email</label>
                        <input id={emailId} type='text' {...register('email')} placeholder='Email' />
                        {errors.email && <p className={s.error}>{errors.email.message}</p>}
                    </div>
                    <div className={s.input_group}>
                        <label htmlFor={pwdId} className='visually_hidden'>Password</label>
                        <input id={pwdId} type={showPassword ? 'text' : 'password'} {...register('password')} placeholder='Password' />
                        {errors.password && <p className={s.error}>{errors.password.message}</p>}
                        <button
                    className={s.eyeIcon}
                    onClick={togglePasswordVisibility}
                    type="button"
                  >
                    {showPassword ? (
                      <svg width="20" height="20">
                        <use href={`${svg}#icon-eye`} />
                      </svg>
                    ) : (
                      <svg width="20" height="20">
                        <use href={`${svg}#icon-eye-off`} />
                      </svg>
                    )}
                  </button>
                    </div>
                        <button type='submit' className={s.log_btn}>Sign Up</button>
                </form>
            </div>
        )
    }

export default SignUpForm