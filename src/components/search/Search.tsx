import React, { useState, useEffect } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { FoodItem, UsersFoodItem } from '../../types';
import { db } from '../../firebase/config';
import './Search.scss';
import useDebounce from '../../customHooks/useDebounce';
import Loader from '../loader/Loader';
import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';

interface Props {
  handleNewFilter: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ handleNewFilter }: Props) => {
  const [searchResult, setSearchResult] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = useAppSelector((state: RootState) => state.auth.userId);
  const { fridgeId, foods } = useAppSelector(
    (state: RootState) => state.fridge
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleAddFood = async (food: FoodItem) => {
    handleNewFilter('allt');
    const docRef = doc(db, 'usersFood', fridgeId);
    const now = Timestamp.now().toDate();
    const nowCopy = new Date(JSON.parse(JSON.stringify(now)));
    const expirationDate = new Date(
      nowCopy.setDate(nowCopy.getDate() + (food.expirationDays - 1))
    );

    const addFood: UsersFoodItem = {
      ...food,
      addedAt: now,
      expirationDate,
    };

    const tempFoods = foods.map((food) => {
      return {
        name: food.name,
        id: food.id,
        addedAt: food.addedAt,
        expirationDate: food.expirationDate,
        expirationDays: food.expirationDays,
        category: food.category,
        amount: food.amount,
      };
    });

    await updateDoc(docRef, { fridge: [...tempFoods, addFood] });
    setSearchTerm('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const colRef = collection(db, 'foods');
      const q = query(colRef, where('name', '==', debouncedSearchTerm));

      const querySnapshot = await getDocs(q);
      const tempResults: FoodItem[] = [];
      querySnapshot.forEach((doc) => {
        tempResults.push({
          name: doc.data().name,
          id: doc.id,
          expirationDays: doc.data().expirationDays,
          category: doc.data().category,
          amount: doc.data().amount,
        });
      });

      if (tempResults.length > 0) {
        setSearchResult([...tempResults]);
      } else {
        setSearchResult([
          {
            name: debouncedSearchTerm,
            id: uuid(),
            expirationDays: 12,
            category: 'övrigt',
            amount: {
              qty: 1,
              unit: 'st',
            },
          },
        ]);
      }

      setIsLoading(false);
    };

    if (debouncedSearchTerm) {
      fetchData();
    }

    if (!debouncedSearchTerm) setSearchResult([]);
  }, [debouncedSearchTerm]);

  return (
    <>
      {isLoading && <Loader />}
      <div className='container' id='search'>
        <form className='search' onSubmit={(e) => e.preventDefault()}>
          <input
            className='search-input'
            type='text'
            placeholder='sök matvara...'
            onChange={(e) => handleOnChange(e)}
            value={searchTerm}
          />
          {searchResult.length > 0 && (
            <ul className='search-resultoptions'>
              {searchResult.map((res) => (
                <li key={res.id} className='search-resultoption'>
                  <p>{res.name}</p>
                  <BsPlusLg
                    id={res.id}
                    className='icon'
                    onClick={() => handleAddFood(res)}
                  />
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </>
  );
};

export default Search;
