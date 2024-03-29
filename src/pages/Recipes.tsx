import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import useUppercaseFirstLetter from '../customHooks/useUppercasedFirstLetter';
import './Recipes.scss';
import { Params } from '../types';
import RecipeCard from '../components/recipeCard/RecipeCard';
import Loader from '../components/loader/Loader';
import {
  SET_SEARCH,
  SET_CURRENT_SEARCH_INDEX,
} from '../redux/features/recipesSlice';
import axios from 'axios';
import ResultPages from '../components/resultPages/ResultPages';
import logo from '../assets/fridgeease-logo-freestanding.png';
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
  const [pageNumber, setPageNumber] = useState(searchParams.get('pageNumber'));
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const uppercasedName = useUppercaseFirstLetter;

  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const [recipes, setRecipes] = useState<any[]>([]);
  const { foods, savedRecipes } = useAppSelector(
    (state: RootState) => state.fridge
  );
  const { searches, currentSearchIndex } = useAppSelector(
    (state: RootState) => state.recipes
  );
  const dispatch = useAppDispatch();

  const searchWordsAsParam = (): string => {
    return searchFor.join(' ').at(-1) === ' '
      ? searchFor.join(' ').slice(0, -1)
      : searchFor.join(' ');
  };

  const handleSearchClick = (name: string) => {
    if (searchFor.includes(name)) {
      setSearchFor(searchFor.filter((item) => item !== name));
    } else {
      setSearchFor([...searchFor, name]);
    }
    searchRecipes('search', 1);
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

  const prevSearch = (page: number): number => {
    let prevSearchIndex = -1;

    searches.forEach((item, i) => {
      const searchForIngredients = searchFor.join(' ');

      if (item.searchTerms === searchForIngredients && item.page === page)
        prevSearchIndex = i;
    });

    dispatch(SET_CURRENT_SEARCH_INDEX(prevSearchIndex));

    return prevSearchIndex;
  };

  const searchRecipes = async (mode: string, page = 0) => {
    if (searchFor.length > 0 && mode === 'search') {
      setIsLoading(true);
      const searchWords = searchWordsAsParam();
      const tempParams: Params = {
        ...params,
        phrase: searchWords,
        pageNumber:
          pageNumber && page === 0 ? pageNumber : String(page === 0 ? 1 : page),
      };
      const prevSearchIndex = prevSearch(Number(tempParams.pageNumber));

      setSearchParams({ ...tempParams });
      setCurrentPage(Number(tempParams.pageNumber));

      if (prevSearchIndex !== -1) {
        setRecipes([...searches[prevSearchIndex].result]);
        setNumberOfPages(searches[prevSearchIndex].numberOfPages);
        setIsLoading(false);
      } else {
        try {
          const result = await axios.get('/recipes/searchwithFilters', {
            headers: {
              AuthenticationTicket: process.env.REACT_APP_ICA_AUTH_TICKET,
            },
            params: tempParams,
          });
          setNumberOfPages(result.data.NumberOfPages);

          setRecipes([...result.data.Recipes]);
          dispatch(
            SET_SEARCH({
              result: [...result.data.Recipes],
              page: Number(tempParams.pageNumber),
              numberOfPages: result.data.NumberOfPages,
              searchTerms: searchWords,
            })
          );
          setIsLoading(false);
          setError('');
        } catch (error: any) {
          setError(error.message);
          setIsLoading(false);
          setCurrentPage(1);
          setRecipes([]);
        }
      }
    } else {
      setRecipes(savedRecipes);
      setNumberOfPages(Math.ceil(savedRecipes.length / recipesPerPage));
    }
  };

  const handleRecipeMode = (mode: string) => {
    setRecipeMode(mode);
    searchRecipes(mode);
  };

  const handlePageClick = (type: string) => {
    let page = currentPage;
    if (type === 'next' && numberOfPages > currentPage) {
      page = currentPage + 1;
    } else if (type === 'prev' && currentPage > 1) {
      page = currentPage - 1;
    }
    setCurrentPage(page);
    searchRecipes('search', page);
  };

  useEffect(() => {
    if (phrase) {
      setSearchFor([...phrase.split(' ')]);
    } else {
      let searchTerms: string[] = [];
      foods.forEach((food, i) => {
        if (i <= 2) searchTerms.push(food.name);
      });
      setSearchFor(searchTerms);
    }
  }, []);

  useEffect(() => {
    const search = async () => {
      await searchRecipes(
        'search',
        phrase === searchFor.join(' ') ? Number(pageNumber) : 1
      );
    };

    if (searchFor.length > 0) {
      search();
    }
  }, [searchFor, pageNumber]);

  return (
    <>
      {isLoading && <Loader />}
      <div className='container recipes'>
        <img className='logo' src={logo} alt='logo' />
        <h1 className='page-heading'>Recept</h1>
        <div className='recipes-options'>
          <p
            className={`option ${recipeMode === 'search' ? 'active' : ''}`}
            onClick={() => handleRecipeMode('search')}
          >
            Sök recept
          </p>

          <p
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
          {recipes.length === 0 &&
            foods.length === 0 &&
            recipeMode === 'search' && (
              <p>
                Inga recept att visa. Lägg till matvaror i ditt kylskåp för att
                kunna söka recept!
              </p>
            )}
          {recipes.length === 0 && recipeMode === 'saved' && (
            <p>Du har inga sparade recept</p>
          )}
          {recipes.length === 0 &&
            foods.length > 0 &&
            !error &&
            recipeMode === 'search' && (
              <p>
                Inga recept matchade valda ingredienser, ändra sökkriterierna
                och försök igen!
              </p>
            )}
          {error && (
            <div className='error-message'>
              <p>Något gick fel....</p>
              <p>{error}</p>
            </div>
          )}
        </div>

        {numberOfPages > 1 && recipeMode === 'search' && (
          <ResultPages
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
          />
        )}
      </div>
    </>
  );
};

export default Recipes;
