import { useState, useEffect } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FoodItem } from '../../types';
import { db } from '../../firebase/config';
import './Search.scss';
import useDebounce from '../../customHooks/useDebounce';

/* const result = [
  {
    name: 'smör',
    id: 1255,
    exp: 7,
    qty: {
      no: 1,
      unit: 'st',
    },
    category: 'mejeri',
  },
  {
    name: 'ost',
    id: 1259,
    exp: 3,
    qty: {
      no: 200,
      unit: 'g',
    },
    category: 'mejeri',
  },
  {
    name: 'filet',
    exp: 1,
    id: 1250,
    qty: {
      no: 1,
      unit: 'st',
    },
    category: 'kött',
  },
]; */

const Search = () => {
  const [searchResult, setSearchResult] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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
      console.log(tempResults);
      setSearchResult([...tempResults]);
    };
    if (debouncedSearchTerm) fetchData();
  }, [debouncedSearchTerm]);

  return (
    <form className='search container'>
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
              <BsPlusLg id={res.id} />
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default Search;
