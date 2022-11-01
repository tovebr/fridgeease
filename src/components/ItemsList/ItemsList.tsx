import Item from '../Item/Item';
import { UsersFoodItem } from '../../types';
import './ItemsList.scss';

interface Props {
  foods: UsersFoodItem[];
  activeFilter: string;
}

const ItemsList = ({ foods, activeFilter }: Props) => {
  return (
    <div className='food-list container'>
      {foods.length > 0 && (
        <ul>
          {foods.map((prod, i) => (
            <Item key={i} product={prod} />
          ))}
        </ul>
      )}
      {foods.length === 0 && activeFilter === 'allt' && (
        <p className='welcome-message'>
          Ditt kylskåp är tomt, lägg till matvaror för att se vad som behöver
          ätas upp snart och få inspiration till matlagning!
        </p>
      )}
    </div>
  );
};

export default ItemsList;
