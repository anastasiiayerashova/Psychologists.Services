import './App.css'
import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react';
import SharedLayout from './SharedLayout.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase.js';
import { logoutUser, setUser } from '../redux/auth/slice.js';
import PrivateRoute from './PrivateRoute.jsx';
import { getFavouritesPsychologists } from '../redux/auth/operations.js';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage/FavoritesPage'));
const PsychologistsPage = lazy(() => import('../pages/PsychologistsPage/PsychologistsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async (user) => {

      if (user) {
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
