import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { uppercasedName } from '../components/Item/Item';
import './Recipes.scss';
import { recipe } from './recipeEx';
import { Recipe, Params } from '../types';
import RecipeCard from '../components/recipeCard/RecipeCard';
import Loader from '../components/loader/Loader';
import {
  SET_SEARCH,
  SET_CURRENT_SEARCH_INDEX,
} from '../redux/features/recipesSlice';
import axios from 'axios';

const Recipes = () => {
  const [searchFor, setSearchFor] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipeMode, setRecipeMode] = useState('search');
  const [params, setParams] = useState<Params>({
    phrase: '',
    recordsPerPage: '9',
    pageNumber: '1',
    sorting: '0',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [phrase, setPhrase] = useState(searchParams.get('phrase'));

  /* searchParams.forEach((value, key) =>
    console.log('key:', key, '///', 'value: ', value)
  );
 */
  const [recipes, setRecipes] = useState<any[]>([]);
  const { foods, savedRecipes } = useAppSelector(
    (state: RootState) => state.fridge
  );
  const { searches, currentSearchIndex } = useAppSelector(
    (state: RootState) => state.recipes
  );
  const dispatch = useAppDispatch();

  const searchWordsAsParam = (): string => {
    return searchFor.join('%2B').at(-1) === '%2B'
      ? searchFor.join('%2B').slice(0, -1)
      : searchFor.join('%2B');
  };

  const handleSearchClick = (name: string) => {
    if (searchFor.includes(name)) {
      setSearchFor(searchFor.filter((item) => item !== name));
    } else {
      setSearchFor([...searchFor, name]);
    }
    const searchWords = searchWordsAsParam();
    setSearchParams({ ...params, phrase: searchWords });
  };

  const searchMenu = foods.map((food, i) => {
    return (
      <li
        key={i}
        className={`search-filter-item ${
          searchFor.includes(food.name) ? 'active' : ''
        }`}
        onClick={() => handleSearchClick(food.name)}
      >
        {uppercasedName(food.name)}
      </li>
    );
  });

  const prevSearch = (): any => {
    //Check to see if the same search has been done before
    // loops through previous seaches saved in store to see if it has been done before
    let prevSearchIndex = -1;

    searches.forEach((item, i) => {
      let prev = true;
      //loops through current search-words and compares to previous searches
      searchFor.forEach((word) => {
        prev =
          prev === false
            ? false
            : item.searchTerms.includes(word) &&
              searchFor.length ===
                [...searches[i].searchTerms.split('%2B')].length;
      });
      if (prev) return (prevSearchIndex = i);
    });

    dispatch(SET_CURRENT_SEARCH_INDEX(prevSearchIndex));

    return prevSearchIndex;
  };

  const searchRecipes = async (mode: string) => {
    if (searchFor.length > 0 && mode === 'search') {
      const prevSearchIndex = prevSearch();
      setIsLoading(true);
      const searchWords = searchWordsAsParam();
      const tempParams: Params = { ...params, phrase: searchWords };
      setSearchParams({ ...tempParams });
      if (prevSearchIndex !== -1) {
        setRecipes([...searches[prevSearchIndex].result]);
        setIsLoading(false);
      } else {
        try {
          const result = await axios.get('/recipes/searchwithFilters', {
            headers: {
              AuthenticationTicket: process.env.REACT_APP_ICA_AUTH_TICKET,
            },
            params: tempParams,
          });
          console.log(result.data);
          setRecipes([...result.data.Recipes]);
          dispatch(
            SET_SEARCH({
              result: [...result.data.Recipes],
              searchTerms: searchWords,
            })
          );
          setIsLoading(false);
          setError('');
        } catch (error: any) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    } else {
      setRecipes(savedRecipes);
    }
  };

  const handleRecipeMode = (mode: string) => {
    setRecipeMode(mode);
    searchRecipes(mode);
  };

  useEffect(() => {
    if (phrase) {
      setSearchFor([...phrase.split('%2B')]);
    } else {
      setSearchFor([foods[0]?.name, foods[1]?.name, foods[2]?.name]);
    }
  }, []);

  useEffect(() => {
    const checkPrevSearches = async () => {
      await searchRecipes('search');
    };
    checkPrevSearches();
  }, [searchFor]);

  return (
    <>
      {isLoading && <Loader />}
      <div className='container recipes'>
        <div className='recipes-options'>
          <p
            id='search'
            className={`option ${recipeMode === 'search' ? 'active' : ''}`}
            onClick={() => handleRecipeMode('search')}
          >
            Sök recept
          </p>
          <p
            id='saved'
            className={`option ${recipeMode === 'saved' ? 'active' : ''}`}
            onClick={() => handleRecipeMode('saved')}
          >
            Sparade recept
          </p>
        </div>
        {recipeMode === 'search' && (
          <ul className='search-filter'>{searchMenu}</ul>
        )}
        <div className='recipes-container'>
          {recipes.length > 0 &&
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} mode={recipeMode} />
            ))}
          {recipes.length === 0 && foods.length === 0 && (
            <p>
              Inga recept att visa. Lägg till matvaror i ditt kylskåp för att
              kunna söka recept!
            </p>
          )}
          {recipes.length === 0 && foods.length > 0 && !error && (
            <p>
              Inga recept matchade valda ingredienser, ändra sökkriterierna och
              försök igen!
            </p>
          )}
          {error && (
            <div className='error-message'>
              <p>Något gick fel....</p>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Recipes;
