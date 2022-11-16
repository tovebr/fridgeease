import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { MdOutlineModeEdit } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { db } from '../../firebase/config';
import { UsersFoodItem, FoodItem } from '../../types';
import './Modal.scss';
import { uppercasedName } from '../Item/Item';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useNavigate } from 'react-router-dom';

interface Props {
  closeModal: React.MouseEventHandler | any;
  product: UsersFoodItem;
  productSource: string;
}

const EditForm = ({ closeModal, product, productSource }: Props) => {
  const navigate = useNavigate();
  const { fridgeId, foods, shoppingList } = useAppSelector(
    (state: RootState) => state.fridge
  );
  const { userId } = useAppSelector((state: RootState) => state.auth);
  const [updatedProduct, setUpdatedProduct] = useState<{
    name: string;
    expirationDate: Date | undefined;
    amount: { qty: number; unit: string };
    category: string;
  }>({
    name: product.name,
    expirationDate: product.expirationDate
      ? new Date(product.expirationDate)
      : undefined,
    amount: product.amount,
    category: product.category,
  });

  const categoryOptions = [
    'mejeri',
    'grönsaker',
    'vegetariskt',
    'animaliskt',
    'övrigt',
  ];

  const unitOptions = ['g', 'kg', 'st', 'tsk', 'kryddmått', 'msk', 'dl', 'l'];

  const selectOptions = (options: Array<string>, upperCase: boolean) => {
    return options.map((opt, i) => {
      return (
        <option key={i} value={opt}>
          {upperCase ? uppercasedName(opt) : opt}
        </option>
      );
    });
  };

  const updateItem = (
    foodArray: UsersFoodItem[] | FoodItem[]
  ): UsersFoodItem[] | FoodItem[] => {
    const itemIndex = foodArray.findIndex(
      (item: any) => item.id === product.id
    );

    let tempFoods: UsersFoodItem[] | FoodItem[] = [];

    if (productSource === 'shoppingList') {
      tempFoods = foodArray.map((food: any) => {
        return {
          name: food.name,
          id: food.id,
          expirationDays: food.expirationDays,
          category: food.category,
          amount: food.amount,
        };
      });
      tempFoods[itemIndex] = {
        ...tempFoods[itemIndex],
        name: updatedProduct.name,
        category: updatedProduct.category,
        amount: updatedProduct.amount,
      };
    } else {
      tempFoods = foodArray.map((food: any) => {
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
    }
    return tempFoods;
  };

  const updateDB = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    let tempFoods: UsersFoodItem[] | FoodItem[];
    if (productSource === 'foods') {
      tempFoods = updateItem(foods);
    } else {
      tempFoods = updateItem(shoppingList);
    }

    const docRef = doc(db, 'usersFood', fridgeId);
    try {
      await updateDoc(docRef, {
        [productSource === 'foods' ? 'fridge' : productSource]: tempFoods,
      });
    } catch (error: any) {
      console.log(error.message);
    }
    closeModal();
    /* navigate(-1); */
  };

  return (
    <form className='edit' onSubmit={(e) => updateDB(e)}>
      <div className='product'>
        <input
          className='product-name'
          type='text'
          value={updatedProduct.name}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              name: e.target.value,
            })
          }
        />{' '}
        {(product.daysLeft || product.daysLeft === 0) &&
          product.daysLeft < 7 && (
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
          {updatedProduct.expirationDate && (
            <>
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
              />{' '}
            </>
          )}
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
        <button type='submit' onClick={(e) => updateDB(e)}>
          Spara
        </button>
      </div>
    </form>
  );
};

const Modal = ({ closeModal, product, productSource }: Props) => {
  return ReactDOM.createPortal(
    <>
      <div className='wrapper' onClick={closeModal}></div>
      <EditForm
        closeModal={closeModal}
        product={product}
        productSource={productSource}
      />
    </>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;
