import * as Yup from 'yup';

export const schema = () => {
    return Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email must be valid')
            .matches(/^[a-zA-Z0-9._%+-]+@(gmail\.com|meta\.ua|ukr\.net)$/i, 'Enter a valid email'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(10, 'Password can not exceed 10 characters')
            .required('Password is required'),
    })
}