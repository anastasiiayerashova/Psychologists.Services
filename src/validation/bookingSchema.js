import * as Yup from 'yup';

export const schema = () => {
    return Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .matches(/^[а-яА-ЯёЁЇїІіЄєҐґa-zA-Z\s]+$/, 'Name should contain only letters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email must be valid')
            .matches(/^[a-zA-Z0-9._%+-]+@(gmail\.com|meta\.ua|ukr\.net)$/i, 'Enter a valid email'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^\+380\d{9}$/, 'Phone must be in format +380XXXXXXXXX'),
        comment: Yup.string()
            .required('Comment is required')
            .min(10, 'Comment should be at least 10 characters')
            .max(30, 'Comment should not exceed 30 characters'),
    })
}