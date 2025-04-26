import { firebaseErrorMessages } from "./firebaseErrorMessages.js";
import { FirebaseError } from "firebase/app";

const useFirebaseError = () => {
    const getErrorMessage = (error) => {
        if (error instanceof FirebaseError) {
            if (error && error.code && firebaseErrorMessages[error.code]) {
                return firebaseErrorMessages[error.code]
            }
            return 'Unexpected error, please try again later'
        }
        return 'An unknown error occurred'
    }
    return {getErrorMessage}
}

export default useFirebaseError