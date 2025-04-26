import s from './SignInForm.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useId, useEffect } from 'react';
import { svg } from '../../constants/index.js';
import { schema } from '../../validation/logInSchema.js';
import { signInUser } from '../../redux/auth/operations.js';
import CustomAlert from '../CustomAlert/CustomAlert.jsx';
import useFirebaseError from '../../utils/firebaseErrorsHook.js';
import { passwordValidation } from '../../validation/passwordValidation.js';
import PasswordHint from '../PasswordHint/PasswordHint.jsx';

const SignInForm = ({ onClose }) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const emailId = useId()
    const pwdId = useId()

    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => setShowPassword(!showPassword)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [password, setPassword] = useState('')
  
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
  } = useForm({
    resolver: yupResolver(schema()),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (values) => {
    try {
      await dispatch(signInUser({ values })).unwrap()
      reset()
      setSuccessMessage('You have successfully logged in!')
      setOpenSnackbar(true)
      setTimeout(() => {
          onClose()
      }, 2000)
    }
    catch (e) {
      const message = getErrorMessage(e)
      setErrorMessage(message)
      setOpenSnackbar(true)
    }
  }

    return (
        <div className={s.container}>
            <div className={s.title_wrap}>
                <p className={s.title}>Log In</p>
                <p className={s.subtitle}>Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.</p>
            </div>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
                    <button type='submit' className={s.log_btn}>Log In</button>
            </form>
        
        {openSnackbar && (
          <CustomAlert
              severity={successMessage ? 'success' : 'error'}
              openSnackbar={openSnackbar}
              handleSnackbarClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              alertSx={{  height: 'auto' }}
          >
              {successMessage || errorMessage}
          </CustomAlert>
        )}
        </div>
    )
}

export default SignInForm