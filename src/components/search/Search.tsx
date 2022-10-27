import { useState, useEffect } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { FoodItem, UsersFoodItem } from '../../types';
import { db } from '../../firebase/config';
import './Search.scss';
import useDebounce from '../../customHooks/useDebounce';
import Loader from '../loader/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';

const Search = () => {
  const [searchResult, setSearchResult] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = useAppSelector((state: RootState) => state.auth.userId);
  const { fridgeId, foods } = useAppSelector(
    (state: RootState) => state.fridge
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleAddFood = async (food: FoodItem) => {
    const docRef = doc(db, 'usersFood', fridgeId);
    console.log(new Date());
    const addFood: UsersFoodItem = { ...food, addedAt: new Date() };
    await updateDoc(docRef, { fridge: [...foods, addFood] });
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

      setSearchResult([...tempResults]);
      setIsLoading(false);
    };
    if (debouncedSearchTerm) {
      fetchData();
    } else {
      setSearchResult([]);
    }
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
