import ItemsList from '../components/ItemsList/ItemsList';
import './ShoppingList.scss';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import logo from '../assets/fridgeease-logo-freestanding.png';

const ShoppingList = () => {
  const { shoppingList } = useAppSelector((state: RootState) => state.fridge);

  return (
    <div className='container shoppinglist'>
      <img className='logo' src={logo} alt='logo' />
      <h1 className='page-heading'>Inköpslista</h1>
      <span className='green-line'></span>
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
