import { useState } from 'react';
import { updateDoc, doc, Timestamp } from 'firebase/firestore';
import Modal from '../modal/Modal';
import { db } from '../../firebase/config';
import { UsersFoodItem } from '../../types';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { MdOutlineModeEdit } from 'react-icons/md';
import { BsCheckLg } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import './Item.scss';
import useUppercasedFirstLetter from '../../customHooks/useUppercasedFirstLetter';

interface Props {
  product: UsersFoodItem;
  productSource: any;
}

const Item = ({ product, productSource }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { fridgeId, foods, shoppingList } = useAppSelector(
    (state: RootState) => state.fridge
  );
  const fridgeRef = doc(db, 'usersFood', fridgeId);

  const handleAddToFridge = async () => {
    const now = Timestamp.now().toDate();

    // deep copy of now
    const nowCopy = new Date(JSON.parse(JSON.stringify(now)));

    // calculate expirationdate based on todays date and days til expiration
    const expirationDate = new Date(
      nowCopy.setDate(nowCopy.getDate() + (product.expirationDays - 1))
    );

    const addFood: UsersFoodItem = {
      ...product,
      addedAt: now,
      expirationDate,
    };

    // add it to DB
    try {
      await updateDoc(fridgeRef, {
        fridge: [...foods, addFood],
        shoppingList: [
          ...shoppingList.filter((food) => food.id !== product.id),
        ],
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await updateDoc(fridgeRef, {
        [productSource === 'foods' ? 'fridge' : productSource]: [
          ...(productSource === 'foods' ? foods : shoppingList),
        ].filter((food: any) => food.id !== product.id),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <Modal
          closeModal={closeModal}
          product={product}
          productSource={productSource}
        />
      )}
      <li className='product' id={product.id}>
        <p className='product-heading'>
          {useUppercasedFirstLetter(product.name)}
        </p>{' '}
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
          {productSource === 'shoppingList' && (
            <BsCheckLg className='icon check' onClick={handleAddToFridge} />
          )}{' '}
          <MdOutlineModeEdit className='icon' onClick={openModal} />{' '}
          <IoMdClose className='icon' onClick={handleDelete} />
        </div>
      </li>
    </>
  );
};

export default Item;
