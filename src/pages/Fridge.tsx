import React, { useEffect, useState } from 'react';
import {
  collection,
  getDoc,
  doc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { db } from '../firebase/config';
import { RootState } from '../app/store';
import Filter from '../components/filter/Filter';
import Search from '../components/search/Search';
import ItemsList from '../components/ItemsList/ItemsList';
import { FoodItem, UsersFridge } from '../types';
import { SET_FRIDGE } from '../redux/features/fridgeSlice';

const MyFridge = () => {
  /* const [usersFridge, setUsersFridge] = useState<UsersFridge>({
    foods: [],
    fridgeId: '',
  });
 
  const userId = useAppSelector((state: RootState) => state.auth.userId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const colRef = collection(db, 'usersFood');
    const q = query(colRef, where('userId', '==', userId));

    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log({ foods: doc.data().fridge, fridgeId: doc.id });
        setTempFridge({ foods: doc.data().fridge, fridgeId: doc.id });
      });
      console.log(tempFridge);
    });
  }, []); */

  return (
    <div>
      <Filter />
      <Search />
      <ItemsList />
    </div>
  );
};

export default MyFridge;
