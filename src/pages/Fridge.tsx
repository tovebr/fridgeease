import React from 'react';
import Filter from '../components/filter/Filter';
import Search from '../components/search/Search';
import ItemsList from '../components/ItemsList/ItemsList';

const MyFridge = () => {
  return (
    <div>
      <Filter />
      <Search />
      <ItemsList />
    </div>
  );
};

export default MyFridge;
