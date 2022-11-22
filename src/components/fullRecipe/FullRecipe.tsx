import { doc, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { useAppSelector } from '../../app/hooks';
import './FullRecipe.scss';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsPlusLg, BsCheckLg } from 'react-icons/bs';
import { db } from '../../firebase/config';
import { FiUsers } from 'react-icons/fi';
import '../recipeCard/RecipeCard.scss';
import { RootState } from '../../app/store';

const FullRecipe = ({ recipe }: any) => {
  const { foods, fridgeId, shoppingList } = useAppSelector(
    (state: RootState) => state.fridge
  );
  const parser = new DOMParser();

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

    try {
      await updateDoc(docRef, { shoppingList: [...shoppingList, newItem] });
    } catch (error: any) {
      console.log(error.message);
    }
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
      <div className='instructions'>
        {recipe.CookingSteps &&
          recipe.CookingSteps.map((step: any) => (
            <p>
              {
                parser.parseFromString(
                  '<!doctype html><body>' + step,
                  'text/html'
                ).body.textContent
              }
            </p>
          ))}
      </div>
    </div>
  );
};

export default FullRecipe;
