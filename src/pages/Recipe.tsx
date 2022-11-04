import { useParams } from 'react-router-dom';
import {
  AiOutlineArrowLeft,
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai';
import FullRecipe from '../components/fullRecipe/FullRecipe';
import { recipe } from './recipeEx';
import './Recipe.scss';

const Recipe = () => {
  const { id } = useParams();

  return (
    <div className='full-recipe container'>
      <div className='full-recipe-options'>
        <div className='left'>
          <AiOutlineArrowLeft />
          <p>Tillbaka</p>
        </div>
        <div className='right'>
          <p>Spara</p>
          <AiOutlineHeart />
        </div>
      </div>
      <FullRecipe recipe={recipe} />
    </div>
  );
};

export default Recipe;
