import { useState } from 'react';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './FullRecipe.scss';
import { AiOutlineClockCircle, AiOutlineCheck } from 'react-icons/ai';
import { BsPlusLg, BsCheckLg } from 'react-icons/bs';
import { FoodItem, UsersFoodItem } from '../../types';
import { db } from '../../firebase/config';
import { FiUsers } from 'react-icons/fi';
import '../recipeCard/RecipeCard.scss';
import { RootState } from '../../app/store';

const FullRecipe = ({ recipe }: any) => {
  const { foods, fridgeId, shoppingList } = useAppSelector(
    (state: RootState) => state.fridge
  );

  const handleAddToShoppingList = async (item: any) => {
    const newItem = {
      name: item.Text,
      id: uuid(),
      expirationDays: 12,
      category: 'övrigt',
      amount: {
        qty: item.QuantityFraction,
        unit: item.Unit ? item.Unit : 'st',
      },
    };
    const docRef = doc(db, 'usersFood', fridgeId);
    const now = Timestamp.now().toDate();
    const nowCopy = new Date(JSON.parse(JSON.stringify(now)));
    const expirationDate = new Date(
      nowCopy.setDate(nowCopy.getDate() + (newItem.expirationDays - 1))
    );

    const addFood: FoodItem = {
      ...newItem,
    };
    /* const addFood: UsersFoodItem = {
      ...newItem,
      addedAt: now,
      expirationDate,
    }; */

    await updateDoc(docRef, { shoppingList: [...shoppingList, addFood] });
  };

  return (
    <div className='full-recipe-container'>
      <div className='img-container'>
        <img src={recipe.ImageUrl} alt={recipe.Title} />
      </div>
      <div className='description'>
        <h2>{recipe.Title}</h2>
        <p className='desc-text'>{recipe.PreambleHTML}</p>
        <div className='recipe-summary'>
          <div className='rating'>
            <p>Betyg</p>
            <p>{recipe.AverageRating}</p>
          </div>
          <div className='difficulty'>
            <p>Svårighetsgrad</p>
            <div className='difficulty-lines'>
              <span className={`line pink`}></span>
              <span
                className={`line ${
                  recipe.Difficulty === 'Medel' || recipe.Difficulty === 'Svårt'
                    ? 'pink'
                    : ''
                } `}
              ></span>
              <span
                className={`line ${
                  recipe.Difficulty === 'Svårt' ? 'pink' : ''
                } `}
              ></span>
            </div>
          </div>

          <div className='portions'>
            <FiUsers />
            <p>{recipe.IngredientGroups[0].Portions} portioner</p>
          </div>
          <div className='time'>
            <AiOutlineClockCircle />
            <p>{recipe.CookingTime}</p>
          </div>
        </div>
      </div>
      <div className='ingredients'>
        {recipe.IngredientGroups.length > 0 &&
          recipe.IngredientGroups.map((group: any, i: number) => {
            const items = group.Ingredients.map((item: any, j: number) => {
              return (
                <li key={j}>
                  {foods.some((food) => item.Ingredient.includes(food.name)) ? (
                    <BsCheckLg className='check' />
                  ) : (
                    <BsPlusLg
                      onClick={() => handleAddToShoppingList(item)}
                      className={`plus ${
                        shoppingList.some(
                          (food) =>
                            food.name.includes(item.Ingredient) ||
                            item.Ingredient === food.name
                        )
                          ? 'faded'
                          : ''
                      }`}
                    />
                  )}
                  {item.Text}
                </li>
              );
            });
            return (
              <ul className='ingredients-group' key={i}>
                {group.GroupName && (
                  <p className='group-heading'>{group.GroupName}</p>
                )}
                {items}
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default FullRecipe;
