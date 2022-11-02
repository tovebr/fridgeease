import { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import Modal from '../modal/Modal';
import { db } from '../../firebase/config';
import { FoodItem, UsersFoodItem } from '../../types';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { MdOutlineModeEdit } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import './Item.scss';

interface Props {
  product: UsersFoodItem;
}

export const uppercasedName = (word: string) => {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
};

const Item = ({ product }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const { fridgeId, foods } = useAppSelector(
    (state: RootState) => state.fridge
  );

  const handleDelete = async () => {
    const fridgeRef = doc(db, 'usersFood', fridgeId);
    await updateDoc(fridgeRef, {
      fridge: foods.filter((food) => food.id !== product.id),
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && <Modal closeModal={closeModal} product={product} />}
      <li className='product' id={product.id}>
        <p className='product-heading'>{uppercasedName(product.name)}</p>{' '}
        {product.daysLeft !== undefined && product.daysLeft < 7 && (
          <span
            className={`expiration ${
              product.daysLeft > 3 ? 'light-warning' : 'warning'
            }`}
          >
            {product.daysLeft} dagar kvar
          </span>
        )}
        <div className='actions'>
          {' '}
          <MdOutlineModeEdit className='icon' onClick={openModal} />{' '}
          <IoMdClose className='icon' onClick={handleDelete} />
        </div>
      </li>
    </>
  );
};

export default Item;
