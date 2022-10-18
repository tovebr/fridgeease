import './Filter.scss';

const Filter = () => {
  return (
    <div className='filter'>
      <ul className='filter-options '>
        <li className='filter-active'>Allt</li>
        <li>Mejeri</li>
        <li>Grönsaker</li>
        <li>Vegetariskt</li>
        <li>Kött</li>
      </ul>
    </div>
  );
};

export default Filter;
