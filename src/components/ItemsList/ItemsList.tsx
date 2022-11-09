import Item from '../Item/Item';
import { UsersFoodItem } from '../../types';
import './ItemsList.scss';

interface Props {
  foods: UsersFoodItem[];
  activeFilter: string;
  productSource: string;
}

const ItemsList = ({ foods, activeFilter, productSource }: Props) => {
  return (
    <div className='food-list container'>
      {foods.length > 0 && (
        <ul>
          {foods.map((prod, i) => (
            <Item key={i} product={prod} productSource={productSource} />
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
