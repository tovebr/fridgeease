import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { doc, setDoc, query, where, collection } from 'firebase/firestore';
import { MdOutlineModeEdit } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { db } from '../../firebase/config';
import { UsersFoodItem } from '../../types';
import './Modal.scss';
import { uppercasedName } from '../Item/Item';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

interface Props {
  closeModal: React.MouseEventHandler | any;
  product: UsersFoodItem;
}

const EditForm = ({ closeModal, product }: Props) => {
  const { fridgeId, foods } = useAppSelector(
    (state: RootState) => state.fridge
  );
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    expirationDate: new Date(product.expirationDate),
    category: product.category,
    amount: product.amount,
  });

  const categoryOptions = [
    'mejeri',
    'grönsaker',
    'vegetariskt',
    'animaliskt',
    'övrigt',
  ];

  const unitOptions = ['g', 'st'];

  const selectOptions = (options: Array<string>, upperCase: boolean) => {
    return options.map((opt, i) => {
      return (
        <option key={i} value={opt}>
          {upperCase ? uppercasedName(opt) : opt}
        </option>
      );
    });
  };

  const updateItem = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const itemIndex = foods.findIndex((item) => item.id === product.id);

    const tempFoods = foods.map((food) => {
      return {
        name: food.name,
        id: food.id,
        addedAt: food.addedAt,
        expirationDate: food.expirationDate,
        expirationDays: food.expirationDays,
        category: food.category,
        amount: food.amount,
      };
    });

    tempFoods[itemIndex] = {
      ...tempFoods[itemIndex],
      name: updatedProduct.name,
      expirationDate: updatedProduct.expirationDate,
      category: updatedProduct.category,
      amount: updatedProduct.amount,
    };

    const docRef = doc(db, 'usersFood', fridgeId);

    await setDoc(docRef, {
      userId,
      fridge: tempFoods,
    });
    closeModal();
  };

  return (
    <form className='edit' onSubmit={(e) => updateItem(e)}>
      <div className='product'>
        <p className='product-heading'>{uppercasedName(product.name)}</p>{' '}
        {product.daysLeft && product.daysLeft < 7 && (
          <span
            className={`expiration ${
              product.daysLeft > 3 ? 'light-warning' : 'warning'
            }`}
          >
            {product.daysLeft} dagar kvar
          </span>
        )}
        <IoMdClose className='icon' onClick={closeModal} />
      </div>
      <div className='input-div'>
        <div className='input-div-group'>
          <label htmlFor='expiration-date'>Bäst före</label>
          <input
            type='date'
            id='expiration-date'
            name='expiration-date'
            defaultValue={
              updatedProduct.expirationDate.toISOString().split('T')[0]
            }
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                expirationDate: new Date(e.target.value),
              })
            }
          />
        </div>
        <div className='input-div-group'>
          <label htmlFor='category'>Kategori</label>

          <select
            id='category'
            value={updatedProduct.category}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, category: e.target.value })
            }
          >
            {selectOptions(categoryOptions, true)}
          </select>
        </div>
        <div className='input-div-group-amount '>
          <div className='input-div-group'>
            <label htmlFor='qty'>Mängd</label>
            <input
              type='number'
              id='qty'
              value={updatedProduct.amount.qty}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  amount: {
                    ...updatedProduct.amount,
                    qty: Number(e.target.value),
                  },
                })
              }
            />
          </div>
          <div className='input-div-group'>
            <label htmlFor=''>Enhet</label>
            <select
              id='unit'
              value={updatedProduct.amount.unit}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  amount: { ...updatedProduct.amount, unit: e.target.value },
                })
              }
            >
              {selectOptions(unitOptions, false)}
            </select>
          </div>
        </div>
        <button type='submit' onClick={(e) => updateItem(e)}>
          Spara
        </button>
      </div>
    </form>
  );
};

const Modal = ({ closeModal, product }: Props) => {
  return ReactDOM.createPortal(
    <>
      <div className='wrapper' onClick={closeModal}></div>
      <EditForm closeModal={closeModal} product={product} />
    </>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;
