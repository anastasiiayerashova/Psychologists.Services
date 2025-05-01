export const passwordValidation = (password: string) => {

        const hasMinLength = password.length >= 6
        const hasMaxLength = password.length <= 30
        const hasLowerCase = /[a-z]/.test(password)
        const hasUpperCase = /[A-Z]/.test(password)
        const hasDigit = /\d/.test(password)
        const hasSpecialChar = /[^\w\s]/.test(password)
    
        const isPasswordValid =
           hasMinLength &&
           hasMaxLength &&
           hasLowerCase &&
           hasUpperCase &&
           hasDigit &&
           hasSpecialChar
    
         return {
           isPasswordValid,
           hasMinLength,
           hasMaxLength,
           hasLowerCase,
           hasUpperCase,
           hasDigit,
           hasSpecialChar
    }
}