import s from './SignInForm.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useId } from 'react';

const SignInForm = ({ onClose }) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const emailId = useId()
    const pwdId = useId()
    
    return (
        <div className={s.container}>
            <div className={s.title_wrap}>
                <p className={s.title}>Log In</p>
                <p className={s.subtitle}>Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.</p>
            </div>
        </div>
    )
}

export default SignInForm