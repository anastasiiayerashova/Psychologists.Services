import s from './SignInForm.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useId } from 'react';
import { svg } from '../../../constants/index.ts';
import { schema } from '../../../validation/logInSchema.ts';
import { signInUser } from '../../../redux/auth/operations.ts';
import useFirebaseError from '../../../hooks/firebaseErrorsHook.ts';
import { passwordValidation } from '../../../validation/passwordValidation.ts';
import PasswordHint from '../../PasswordHint/PasswordHint.tsx';
import { SignInFormProps } from '../../../types/PropsTypes.ts';
import { AppDispatch, RootState } from '../../../redux/store.ts';
import { SignInFormData } from '../../../types/types.ts';
import { selectLoading } from '../../../redux/auth/slice.ts';
import Loader from '../../Loader/Loader.tsx';
import { useModal } from '../../../utils/ModalContext.ts';


const SignInForm = ({ onClose }: SignInFormProps) => {
    
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const emailId = useId()
    const pwdId = useId()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const togglePasswordVisibility = () => setShowPassword(!showPassword)
    const [password, setPassword] = useState<string>('')
    const loading = useSelector<RootState, boolean>(selectLoading)
    const {showAlert} = useModal()
  
    const { getErrorMessage } = useFirebaseError()
    const {isPasswordValid, hasMinLength, hasMaxLength, hasLowerCase, hasUpperCase, hasDigit, hasSpecialChar} = passwordValidation(password)

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema()),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (values: SignInFormData) => {
    try {
      await dispatch(signInUser({ values })).unwrap()
      showAlert('success', `Welcome, ${values.email}, you have successfully logged in!`)
      reset()
      setTimeout(() => {
          onClose()
      }, 2000)
      navigate('/favorites')
    }
    catch (e: unknown) {
      const message = getErrorMessage(e)
      showAlert('error', message)
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
          {loading ? (
            <Loader />
          ) : (
            <button type='submit' className={s.log_btn}>Log In</button>
          )}
            </form>
        </div>
    )
}

export default SignInForm