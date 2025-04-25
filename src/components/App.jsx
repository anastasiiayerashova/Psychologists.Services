import './App.css'
import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react';
import SharedLayout from './SharedLayout.jsx';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage/FavoritesPage'));
const PsychologistsPage = lazy(() => import('../pages/PsychologistsPage/PsychologistsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

function App() {

  return (
    <SharedLayout>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/psychologists' element={<PsychologistsPage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
            <Route path='*' element={<NotFoundPage/> } />
        </Routes>
    </SharedLayout>
  )
}

export default App
