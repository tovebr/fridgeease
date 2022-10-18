import Item from '../Item/Item';
import { FoodItem } from '../../types';
import './ItemsList.scss';

const products = [
  {
    name: 'quorn',
    exp: 7,
    id: 1355,
    qty: {
      no: 1,
      unit: 'st',
    },
    category: 'vegetariskt',
  },
  {
    name: 'mjölk',
    exp: 4,
    id: 1655,
    qty: {
      no: 200,
      unit: 'g',
    },
    category: 'mejeri',
  },
  {
    name: 'gurka',
    id: 1295,
    exp: 1,
    qty: {
      no: 1,
      unit: 'st',
    },
    category: 'grönsaker',
  },
];

const ItemsList = () => {
  const listContent = () => {
    return products.map((product: FoodItem) => {
      return <Item key={product.id} product={product} />;
    });
  };

  const content = listContent();

  return (
    <div className='food-list container'>
      <ul>{content}</ul>
    </div>
  );
};

export default ItemsList;
