import './App.css'
import { Routes, Route } from 'react-router-dom'
import { lazy, useEffect } from 'react';
import SharedLayout from './SharedLayout.tsx';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase.ts';
import { logoutUser, setUser } from '../redux/auth/slice.ts';
import PrivateRoute from './PrivateRoute.tsx';
import { getFavouritesPsychologists } from '../redux/auth/operations.ts';
import { AppDispatch } from '../redux/store.ts';
import { resetFilters } from '../redux/filters/slice.ts';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage/FavoritesPage'));
const PsychologistsPage = lazy(() => import('../pages/PsychologistsPage/PsychologistsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

function App() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async (user) => {

      if (user) {
        dispatch(resetFilters())
        dispatch(setUser({
          name: user.displayName,
          email: user.email,
          id: user.uid,
          token: await user.getIdToken()
        }))
        dispatch(getFavouritesPsychologists(user.uid))
      }
      else {
        dispatch(logoutUser())
      }
    })

    return () => unsubscribed()
  }, [dispatch])


  return (
    <SharedLayout>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/psychologists' element={<PsychologistsPage />} />
            <Route path='/favorites' element={<PrivateRoute component={FavoritesPage} redirectTo='/' />} />
            <Route path='/psychologists/favorites' element={<PrivateRoute component={FavoritesPage} redirectTo='/' redirectToAuth='/favorites'/>} />
            <Route path='*' element={<NotFoundPage/> } />
        </Routes>
    </SharedLayout>
  )
}

export default App
