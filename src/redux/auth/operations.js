import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../config/firebase.js";

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async (cred, thunkAPI) => {
        try {
            const { name, email, password } = cred.values
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            console.log('userCredential:', userCredential)

            await updateProfile(userCredential.user, { displayName: name })
            
            const user = userCredential.user

            return {
                name: user.displayName,
                email: user.email,
                id: user.uid,
                token: await user.getIdToken()
            }
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const signInUser = createAsyncThunk(
    'auth/signInUser',
    async (cred, thunkAPI) => {
        try {
            const { email, password } = cred.values
            
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            return {
                name: user.displayName,
                email: user.email,
                id: user.uid,
                token: await user.getIdToken()
            }
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const signOutUser = createAsyncThunk(
    'auth/signOutUser',
    async (_, thunkAPI) => {
        try {
            await signOut(auth)
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)