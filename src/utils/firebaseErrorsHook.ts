import { firebaseErrorMessages } from "./firebaseErrorMessages.ts";
import { FirebaseError } from "firebase/app";

type FirebaseErrorCodes = keyof typeof firebaseErrorMessages

const useFirebaseError = () => {
    const getErrorMessage = (error: unknown): string => {
        if (error instanceof FirebaseError) {
            const errorCode = error.code as FirebaseErrorCodes
            if (error && error.code && firebaseErrorMessages[errorCode]) {
                return firebaseErrorMessages[errorCode]
            }
            return 'Unexpected error, please try again later'
        }
        return 'An unknown error occurred'
    }
    return {getErrorMessage}
}

export default useFirebaseError