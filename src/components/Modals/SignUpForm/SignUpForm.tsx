import s from './SignUpForm.module.css'
import { schema } from '../../../validation/signUpSchema.ts'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useId } from 'react';
import { svg } from '../../../constants/index.ts';
import { signUpUser } from '../../../redux/auth/operations.ts';
import CustomAlert from '../../CustomAlert/CustomAlert.tsx';
import useFirebaseError from '../../../hooks/firebaseErrorsHook.ts';
import { passwordValidation } from '../../../validation/passwordValidation.ts';
import PasswordHint from '../../PasswordHint/PasswordHint.tsx';
import { AppDispatch } from '../../../redux/store.ts';
import { SignUpFormProps } from '../../../types/PropsTypes.ts';
import { SignUpFormData } from '../../../types/types.ts';

const SignUpForm = ({ onClose }: SignUpFormProps) => {
        
        const dispatch = useDispatch<AppDispatch>()
        const navigate = useNavigate()
    
        const nameId = useId()
        const emailId = useId()
        const pwdId = useId()
    
        const [showPassword, setShowPassword] = useState<boolean>(false)
        const togglePasswordVisibility = () => setShowPassword(!showPassword)
        const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
        const [successMessage, setSuccessMessage] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>('')
        const [password, setPassword] = useState<string>('')

        const { getErrorMessage } = useFirebaseError()
        const {isPasswordValid, hasMinLength, hasMaxLength, hasLowerCase, hasUpperCase, hasDigit, hasSpecialChar} = passwordValidation(password)

        useEffect(() => {
          if (errorMessage) {
            setOpenSnackbar(true)
          }
        }, [errorMessage])
    
        const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<SignUpFormData>({
        resolver: yupResolver(schema()),
        defaultValues: { name: '', email: '', password: '' },
        mode: 'onChange',
        reValidateMode: 'onChange',
      })
  
      const onSubmit = async (values: SignUpFormData) => {
        try {
           await dispatch(signUpUser({ values })).unwrap()
           setSuccessMessage(`Welcome, ${values.name}, you have successfully signed up!`)
           setOpenSnackbar(true)
           reset()
           setTimeout(() => {
              onClose()
           }, 2000)
           navigate('/favorites')
        }
        catch (e: unknown) {
          const message = getErrorMessage(e)
          setErrorMessage(message)
          setOpenSnackbar(true)
        }
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
                        <input id={pwdId} type={showPassword ? 'text' : 'password'} {...register('password')} placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)} } />
                        {password.length > 0 && !isPasswordValid && (
                        <div className={s.passwordHints}>
                            <PasswordHint condition={hasMinLength} text="At least 6 characters" />
                            <PasswordHint condition={hasMaxLength} text="No more than 30 characters" />
                            <PasswordHint condition={hasLowerCase} text="At least one lowercase letter" />
                            <PasswordHint condition={hasUpperCase} text="At least one uppercase letter" />
                            <PasswordHint condition={hasDigit} text="At least one digit" />
                            <PasswordHint condition={hasSpecialChar} text="At least one special character" />
                        </div>
                        )}
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
            
                {openSnackbar && (
                    <CustomAlert
                        severity={successMessage ? 'success' : 'error'}
                        openSnackbar={openSnackbar}
                        handleSnackbarClose={() => setOpenSnackbar(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        alertSx={{ height: 'auto' }}
                    >
                      {successMessage || errorMessage}
                    </CustomAlert>
                )}
            </div>
        )
    }

export default SignUpForm