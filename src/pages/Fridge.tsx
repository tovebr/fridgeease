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

const MyFridge = () => {
  const [usersFood, setUsersFood] = useState([]);
  const userId = useAppSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const colRef = collection(db, 'usersFood');
    const q = query(colRef, where('userId', '==', userId));

    onSnapshot(q, (snapshot) => {
      let usersFridge: any[] = [];
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
        usersFridge.push({ ...doc.data() });
      });
    });
  }, []);

  return (
    <div>
      <Filter />
      <Search />
      <ItemsList />
    </div>
  );
};

export default MyFridge;
