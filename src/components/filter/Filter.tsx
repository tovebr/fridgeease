import './Filter.scss';
import useUppercasedFirstLetter from '../../customHooks/useUppercasedFirstLetter';

interface Props {
  activeFilter: string;
  handleNewFilter: Function;
  /* React.SetStateAction<string> | React.Dispatch<React.SetStateAction<string>> */
}

const Filter = ({ activeFilter, handleNewFilter }: Props) => {
  const uppercasedName = useUppercasedFirstLetter;
  const categoryOptions = [
    'allt',
    'mejeri',
    'grönsaker',
    'vegetariskt',
    'animaliskt',
    'övrigt',
  ];

  return (
    <div className='filter'>
      <ul className='filter-options '>
        {categoryOptions.map((category: string, i) => {
          return (
            <li
              key={i}
              className={`${category === activeFilter ? `filter-active` : ''}`}
              onClick={() => handleNewFilter(category)}
            >
              {uppercasedName(category)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
