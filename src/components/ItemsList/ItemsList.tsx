import Item from '../Item/Item';
import { FoodItem } from '../../types';
import './ItemsList.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

const ItemsList = () => {
  const { foods, fridgeId } = useAppSelector(
    (state: RootState) => state.fridge
  );

  return (
    <div className='food-list container'>
      {foods.length > 0 && (
        <ul>
          {foods.map((prod, i) => (
            <Item key={i} product={prod} />
          ))}
        </ul>
      )}
      {foods.length === 0 && (
        <p className='welcome-message'>
          Ditt kylskåp är tomt, lägg till matvaror för att se vad som behöver
          ätas upp snart och få inspiration till matlagning!
        </p>
      )}
    </div>
  );
};

export default ItemsList;
