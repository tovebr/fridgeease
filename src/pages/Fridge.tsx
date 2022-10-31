import React from 'react';
import Filter from '../components/filter/Filter';
import Search from '../components/search/Search';
import ItemsList from '../components/ItemsList/ItemsList';

const MyFridge = () => {
  return (
    <div className='main-content'>
      <Filter />
      <Search />
      <ItemsList />
    </div>
  );
};

export default MyFridge;
