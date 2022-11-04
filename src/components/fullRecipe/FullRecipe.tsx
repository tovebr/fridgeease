import React from 'react';
import './FullRecipe.scss';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import '../recipeCard/RecipeCard.scss';

const FullRecipe = ({ recipe }: any) => {
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
    </div>
  );
};

export default FullRecipe;
