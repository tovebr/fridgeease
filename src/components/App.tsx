import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from '../redux/features/authSlice';
import { useAppDispatch } from '../app/hooks';
import Fridge from '../pages/Fridge';
import Profile from '../pages/Profile';
import Recipes from '../pages/Recipes';
import ShoppingList from '../pages/ShoppingList';
import Header from './header/Header';
import Footer from './footer/Footer';
import Auth from '../pages/Auth';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(SET_ACTIVE_USER(uid));
      } else {
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Fridge />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/shoppinglist' element={<ShoppingList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
