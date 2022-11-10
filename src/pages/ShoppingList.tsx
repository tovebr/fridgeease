import { useEffect } from 'react';
import ItemsList from '../components/ItemsList/ItemsList';
import './ShoppingList.scss';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

const ShoppingList = () => {
  const { shoppingList } = useAppSelector((state: RootState) => state.fridge);

  return (
    <div className='container shoppinglist'>
      {shoppingList.length > 0 ? (
        <ItemsList
          foods={shoppingList}
          activeFilter='allt'
          productSource='shoppingList'
        />
      ) : (
        <p className='message'>Din inköpslista är tom</p>
      )}
    </div>
  );
};

export default ShoppingList;
