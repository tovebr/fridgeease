import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  orderBy,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from '../redux/features/authSlice';
import { SET_FRIDGE, EMPTY_FRIDGE } from '../redux/features/fridgeSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Fridge from '../pages/Fridge';
import Profile from '../pages/Profile';
import Recipes from '../pages/Recipes';
import ShoppingList from '../pages/ShoppingList';
import Header from './header/Header';
import Footer from './footer/Footer';
import Auth from '../pages/Auth';
import Recipe from '../pages/Recipe';
import { RootState } from '../app/store';
import { FoodItem, UsersFoodItem } from '../types';
/* import * as dotenv from 'dotenv';

dotenv.config(); */

function App() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.auth.userId);

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

  useEffect(() => {
    let unsub: Function = () => {};

    if (userId) {
      const colRef = collection(db, 'usersFood');
      const q = query(colRef, where('userId', '==', userId));
      unsub = onSnapshot(q, (snapshot) => {
        let tempFridge: UsersFoodItem[] = [];
        snapshot.docs.forEach((doc) => {
          tempFridge = doc
            .data()
            .fridge.sort(
              (a: UsersFoodItem, b: UsersFoodItem) =>
                a.expirationDays - b.expirationDays
            );

          dispatch(SET_FRIDGE({ foods: tempFridge, fridgeId: doc.id }));
        });
      });
    } else if (!userId) {
      dispatch(EMPTY_FRIDGE());
      unsub();
    }
  }, [userId]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Fridge />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/recipes/:id' element={<Recipe />} />
        <Route path='/shoppinglist' element={<ShoppingList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
