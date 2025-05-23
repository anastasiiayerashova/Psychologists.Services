import * as Yup from 'yup';

export const schema = () => {
    return Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .matches(/^[а-яА-ЯёЁЇїІіЄєҐґa-zA-Z\s]+$/, 'Name should contain only letters')
            .min(2, 'Name should be at least 2 characters')
            .max(30, 'Name should not exceed 30 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email must be valid')
            .matches(/^[a-zA-Z0-9._%+-]+@(gmail\.com|meta\.ua|ukr\.net)$/i, 'Enter a valid email'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(30, 'Password can not exceed 30 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/\d/, 'Password must contain at least one digit')
            .matches(/[^\w\s]/, 'Password must contain at least one special character')
            .required('Password is required'),
    })
}