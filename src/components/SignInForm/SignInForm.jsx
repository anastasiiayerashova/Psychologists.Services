import s from './SignInForm.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useId } from 'react';
import { schema } from '../../validation/logInSchema.js';

const SignInForm = ({ onClose }) => {

    const svg = '/sprite.svg'
    
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

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
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

    return (
        <div className={s.container}>
            <div className={s.title_wrap}>
                <p className={s.title}>Log In</p>
                <p className={s.subtitle}>Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.</p>
            </div>
            <form className={s.form}>
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
                    <button type='submit' className={s.log_btn}>Log In</button>
            </form>
        </div>
    )
}

export default SignInForm