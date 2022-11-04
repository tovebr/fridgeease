import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { uppercasedName } from '../components/Item/Item';
import './Recipes.scss';
import { recipe } from './recipeEx';
import { Recipe } from '../types';
import RecipeCard from '../components/recipeCard/RecipeCard';
import Loader from '../components/loader/Loader';
import axios from 'axios';

const Recipes = () => {
  const [searchFor, setSearchFor] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchResult, setSearchResult] = useState<any[]>([]);
  const { foods } = useAppSelector((state: RootState) => state.fridge);
  //searchwithFilters?recordsPerPage=10&pageNumber=1&phrase=quorn&sorting=0

  const handleSearchClick = (name: string) => {
    if (searchFor.includes(name)) {
      setSearchFor(searchFor.filter((item) => item !== name));
    } else {
      setSearchFor([...searchFor, name]);
    }
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

  useEffect(() => {
    setSearchFor([foods[0]?.name, foods[1]?.name, foods[2]?.name]);
  }, [foods]);

  useEffect(() => {
    setIsLoading(true);
    const recipesSearch = async () => {
      const searchWords =
        searchFor.join('+').at(-1) === '+'
          ? searchFor.join('+').slice(0, -1)
          : searchFor.join('+');
      try {
        const result = await axios.get('/recipes/searchwithFilters', {
          headers: {
            AuthenticationTicket: process.env.REACT_APP_ICA_AUTH_TICKET,
          },
          params: {
            phrase: searchWords,
            recordsPerPage: 10,
            pageNumber: 1,
            sorting: 0,
          },
        });
        setSearchResult([...result.data.Recipes]);
        setIsLoading(false);
        setError('');
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    recipesSearch();
  }, [searchFor]);

  return (
    <>
      {isLoading && <Loader />}
      <div className='container recipes'>
        <h1 className='page-heading'>Recept</h1>
        <ul className='search-filter'>{searchMenu}</ul>
        <div className='recipes-container'>
          {searchResult.length > 0 &&
            searchResult.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          {searchResult.length === 0 && foods.length === 0 && (
            <p>
              Inga recept att visa. Lägg till matvaror i ditt kylskåp för att
              kunna söka recept!
            </p>
          )}
          {searchResult.length === 0 && foods.length > 0 && !error && (
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
