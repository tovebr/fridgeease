import './Search.scss';
import { BsPlusLg } from 'react-icons/bs';
import { FoodItem } from '../../types';

const result = [
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
];

const Search = () => {
  const options = () => {
    return result.map((res: FoodItem) => {
      return (
        <li className='search-resultoption'>
          <p>{res.name}</p> <BsPlusLg />
        </li>
      );
    });
  };

  return (
    <form className='search container'>
      <input
        className='search-input'
        type='text'
        placeholder='sök matvara...'
      />
      {/* <ul className='search-resultoptions'>{options()}</ul> */}
    </form>
  );
};

export default Search;
