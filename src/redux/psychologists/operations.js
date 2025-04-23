import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, ref } from "firebase/database";
import { db } from "../../config/firebase.js";
import { getDocs, query, collection, orderBy, startAfter, limit, where, getDoc, doc } from "firebase/firestore";

const psychologistsCollectionRef = collection(db, 'psychologists-services')

export const getPsychologists = createAsyncThunk(
    'psychologists/getAll',
    async ({ filters, lastVisibleDoc = null }, thunkAPI) => {
        
        const { limit: limitValue = 3, sortBy = 'name', direction = 'asc', priceGreater, priceLess } = filters
        
        try {

            let psychologistsQuery = query(
                psychologistsCollectionRef,
                orderBy(sortBy, direction),
                limit(limitValue)
            )

            if (priceGreater !== undefined) {
                psychologistsQuery = query(psychologistsQuery, where('price_per_hour', '>', priceGreater))
            }

            if (priceLess !== undefined) {
                psychologistsQuery = query(psychologistsQuery, where('price_per_hour', '<', priceLess))
            }

            if (lastVisibleDoc) {
                const lastVisibleDocRef = doc(db, 'psychologists-services', lastVisibleDoc)
                const lastVisibleDocSnapshot = await getDoc(lastVisibleDocRef)

                if (lastVisibleDocSnapshot.exists()) {
                    psychologistsQuery = query(psychologistsQuery, startAfter(lastVisibleDocSnapshot))
                }
            }

            const snapshot = await getDocs(psychologistsQuery)

            const psychologists = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))

            const newLastVisibleDoc = snapshot.docs[snapshot.docs.length - 1]?.id || null
            
            return {
                data: psychologists,
                lastVisibleDoc: newLastVisibleDoc
            }
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)