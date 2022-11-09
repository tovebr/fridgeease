import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import {
  AiOutlineArrowLeft,
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai';
import { db } from '../firebase/config';
import FullRecipe from '../components/fullRecipe/FullRecipe';
import { useAppSelector } from '../app/hooks';
import './Recipe.scss';
import { RootState } from '../app/store';

const Recipe = () => {
  const { searches, currentSearchIndex } = useAppSelector(
    (state: RootState) => state.recipes
  );
  const { savedRecipes, fridgeId } = useAppSelector(
    (state: RootState) => state.fridge
  );
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>();
  const [saved, setSaved] = useState<boolean>();
  const navigate = useNavigate();

  const handleSaveClick = async () => {
    setSaved(true);
    const docRef = doc(db, 'usersFood', fridgeId);
    try {
      await updateDoc(docRef, { savedRecipes: [...savedRecipes, recipe] });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleRemoveSavedClick = async () => {
    setSaved(false);
    const docRef = doc(db, 'usersFood', fridgeId);
    try {
      await updateDoc(docRef, {
        savedRecipes: savedRecipes.filter((rec) => rec.Id !== Number(id)),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const isSaved = savedRecipes.find((rec) => rec.Id === Number(id))
      ? true
      : false;
    setSaved(isSaved);
    if (isSaved) {
      setRecipe(savedRecipes.find((rec) => rec.Id === Number(id)));
    } else {
      setRecipe(
        searches[
          currentSearchIndex === -1 ? searches.length - 1 : currentSearchIndex
        ].result.find((rec: any) => rec.Id === Number(id))
      );
    }
  }, []);

  return (
    <div className='full-recipe container'>
      <div className='full-recipe-options'>
        <div className='left' onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft />
          <p>Tillbaka</p>
        </div>
        <div
          className='right'
          onClick={saved ? handleRemoveSavedClick : handleSaveClick}
        >
          <p>{`${saved ? 'Sparad' : 'Spara'}`}</p>
          {saved ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
      </div>
      {recipe && <FullRecipe recipe={recipe} />}
    </div>
  );
};

export default Recipe;
