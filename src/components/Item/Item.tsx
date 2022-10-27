import { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import Modal from '../modal/Modal';
import { db } from '../../firebase/config';
import { FoodItem } from '../../types';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { MdOutlineModeEdit } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import './Item.scss';

interface Props {
  product: FoodItem;
}

const Item = ({ product }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const { fridgeId, foods } = useAppSelector(
    (state: RootState) => state.fridge
  );

  const uppercasedName = (word: string) => {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  };

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
      {showModal && <Modal closeModal={closeModal} />}
      <li className='product' id={product.id}>
        <p className='product-heading'>{uppercasedName(product.name)}</p>{' '}
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
          <MdOutlineModeEdit className='icon' onClick={openModal} />{' '}
          <IoMdClose className='icon' onClick={handleDelete} />
        </div>
      </li>
    </>
  );
};

export default Item;
