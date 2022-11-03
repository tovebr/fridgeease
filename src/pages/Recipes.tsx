import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { uppercasedName } from '../components/Item/Item';
import './Recipes.scss';
import { recipe } from './recipeEx';
import { Recipe } from '../types';
import RecipeCard from '../components/recipeCard/RecipeCard';
import axios from 'axios';

const Recipes = () => {
  const [searchFor, setSearchFor] = useState<string[]>([]);
  const [hasIngredients, setHasIngredients] = useState<object[]>([]);
  const [needsIngredients, setNeedsIngredients] = useState<object[]>([]);
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
    // sök
    const recipesSearch = async () => {
      if (typeof process.env.REACT_APP_ICA_BASE_URL === 'string') {
        const searchWords =
          searchFor.join('+').at(-1) === '+'
            ? searchFor.join('+').slice(0, -1)
            : searchFor.join('+');

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
      }
    };

    recipesSearch();
  }, [searchFor]);
  console.log([searchResult]);

  return (
    <div className='container recipes'>
      <h1 className='page-heading'>Recept</h1>
      <ul className='search-filter'>{searchMenu}</ul>
      <div className='recipes-container'>
        {searchResult.length > 0 &&
          searchResult.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        {searchResult.length === 0 && (
          <p>
            Inga recept att visa. Lägg till matvaror i ditt kylskåp för att
            kunna söka recept!
          </p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
