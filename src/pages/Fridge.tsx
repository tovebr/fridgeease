import { useState, useEffect } from 'react';
import Filter from '../components/filter/Filter';
import Search from '../components/search/Search';
import ItemsList from '../components/ItemsList/ItemsList';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { UsersFoodItem } from '../types';

const MyFridge = () => {
  const { foods } = useAppSelector((state: RootState) => state.fridge);

  const [filteredFood, setFilteredFood] = useState<UsersFoodItem[]>([]);
  const [filter, setFilter] = useState('allt');

  useEffect(() => {
    const tempFoods = foods.filter((food) => food.category === filter);
    setFilteredFood(tempFoods);
  }, [filter, foods]);

  return (
    <div className='main-content'>
      <h1 className='page-heading'>Mitt Kylskåp</h1>
      <Filter activeFilter={filter} handleNewFilter={setFilter} />
      <Search handleNewFilter={setFilter} />
      <ItemsList
        activeFilter={filter}
        foods={filter === 'allt' ? foods : filteredFood}
        productSource='foods'
      />
    </div>
  );
};

export default MyFridge;
