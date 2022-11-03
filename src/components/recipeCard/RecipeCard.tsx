import { Link } from 'react-router-dom';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import './RecipeCard.scss';

const RecipeCard = ({ recipe }: any) => {
  console.log(recipe);
  return (
    <Link to={`/recipes/${recipe.Id}`}>
      <div id={recipe.Id} className='recipe'>
        <div className='img-container'>
          <img src={recipe.ImageUrl} alt={recipe.Title} />
        </div>
        <h6>{recipe.Title}</h6>
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
    </Link>
  );
};

export default RecipeCard;
