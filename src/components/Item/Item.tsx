import React from 'react';
import { FoodItem } from '../../types';
import { MdOutlineModeEdit } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import './Item.scss';

interface Props {
  product: FoodItem;
}

const Item = ({ product }: Props) => {
  const uppercasedName = (word: string) => {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  };

  return (
    <li className='product'>
      <p>{uppercasedName(product.name)}</p>{' '}
      {product.expirationDays < 7 && (
        <span
          className={`expiration ${
            product.expirationDays > 3 ? 'light-warning' : 'warning'
          }`}
        >
          {product.expirationDays} dagar kvar
        </span>
      )}
      <div className='actions'>
        {' '}
        <MdOutlineModeEdit /> <IoMdClose />
      </div>
    </li>
  );
};

export default Item;
