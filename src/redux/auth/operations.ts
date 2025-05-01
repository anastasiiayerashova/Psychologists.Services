import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc, updateDoc, arrayUnion, arrayRemove, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../../config/firebase.ts";
import { AddFavouritePsychologistCredentials, RemoveFavouritePsychologistCredentials, SignInUserCredentials, SignInUserResponse, SignUpUserCredentials, SignUpUserResponse } from "../../types/authOperationsTypes.ts";
import { IPsychologist } from "../../types/IPsychologist.ts";

export const signUpUser = createAsyncThunk<SignUpUserResponse, SignUpUserCredentials>(
    'auth/signUpUser',
    async (cred, thunkAPI) => {
        try {
            const { name, email, password } = cred.values
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(userCredential.user, { displayName: name })
            
            const user = userCredential.user

            await setDoc(doc(db, 'users', user.uid), {
                favourites: []
            })

            return {
                name: user.displayName,
                email: user.email,
                id: user.uid,
                token: await user.getIdToken()
            }
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const signInUser = createAsyncThunk<SignInUserResponse, SignInUserCredentials>(
    'auth/signInUser',
    async (cred, thunkAPI) => {
        try {
            const { email, password } = cred.values
            
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            const userRef = doc(db, 'users', user.uid)
            const userSnap = await getDoc(userRef)
            const userData = userSnap.exists() ? userSnap.data() : {}

            if (userData.theme) {
                localStorage.setItem('theme', userData.theme)
                document.documentElement.classList.remove('green-theme', 'blue-theme', 'orangered-theme')
                document.documentElement.classList.add(`${userData.theme}-theme`)
            }

            return {
                name: user.displayName,
                email: user.email,
                id: user.uid,
                token: await user.getIdToken()
            }
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
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
            const errorMessage = e instanceof Error ? e.message : 'Unknown error'
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)

export const addFavouritePsychologist = createAsyncThunk<IPsychologist, AddFavouritePsychologistCredentials, {rejectValue: string}>(
    'auth/addFavouritePsychologist',
    async ({ userId, psychologistId }, thunkAPI) => {
        try {
            const userRef = doc(db, 'users', userId)
            const psychologistRef = doc(db, 'psychologists-services', psychologistId)
            const psychologistSnap = await getDoc(psychologistRef)

            if (!psychologistSnap.exists()) {
                throw new Error('Psychologist is not found')
            }

            const psychologistFullData = psychologistSnap.data()
            const psychologist = {
                id: psychologistId,
                ...psychologistFullData
            } as IPsychologist

            await updateDoc(userRef, {
                favourites: arrayUnion(psychologist)
            })

            return psychologist
        }
        catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Unknown error'
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)

export const removeFavouritePsychologist = createAsyncThunk<string, RemoveFavouritePsychologistCredentials, {rejectValue: string}>(
    'auth/removeFavouritePsychologist',
    async ({ userId, psychologistId }, thunkAPI) => {
        try {
            const userRef = doc(db, 'users', userId)
            await updateDoc(userRef, {
                favourites: arrayRemove({id: psychologistId})
            })

            return psychologistId
        }
        catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Unknown error'
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)

export const getFavouritesPsychologists = createAsyncThunk<IPsychologist[], string, {rejectValue: string}>(
    'auth/getFavouritesPsychologists',
    async (userId, thunkAPI) => {
        try {
            const userRef = doc(db, 'users', userId)
            const userSnap = await getDoc(userRef)

            if (!userSnap.exists()) return []

            const favouriteIds = userSnap.data().favourites.map((psychologist: IPsychologist) => psychologist.id) || []

            if (favouriteIds.length === 0) return []

            const psychologistsQuery = query(
                collection(db, 'psychologists-services'),
                where('__name__', 'in', favouriteIds)
            )

            const snapshot = await getDocs(psychologistsQuery)

            return snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })) as IPsychologist[]
        }
        catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Unknown error'
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)