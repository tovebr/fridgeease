import { useState, useEffect } from 'react';
import { MdFoodBank } from 'react-icons/md';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { uppercasedName } from '../components/Item/Item';
import './Recipes.scss';

const recipe = {
  Id: 725249,
  ImageId: 240079,
  ImageUrl:
    'https://assets.icanet.se/t_ICAseAbsoluteUrl//imagevaultfiles/id_240079/cf_259/stekt_lax_med_potatis_och_romsas.jpg',
  Title: 'Stekt lax med potatis och romsås',
  PreambleHTML:
    'Ibland är klassikerna det man längtar efter mest. Hur låter mild kokt potatis och perfekt stekt lax ihop med gräddfil som fått smak av små salta caviarkorn? Till detta finhackad sallad för extra krisp. Enkelt, gott och snabbt, och du får mer tid över att umgås med familj, eller hinna i god tid till favoritprogrammet!',
  Difficulty: 'Medel',
  CookingTime: 'Under 30 minuter',
  CookingTimeAbbreviated: '< 30 min',
  CookingTimeMinutes: 30,
  CommentCount: 1,
  AverageRating: '3.9',
  IngredientCount: 8,
  OfferCount: 0,
  IsGoodClimateChoice: false,
  IsKeyHole: false,
  NumberOfUserRatings: '15',
  IngredientGroups: [
    {
      Portions: 4,
      Ingredients: [
        {
          Text: '900 g potatis',
          IngredientId: 11296,
          Quantity: 900.0,
          MinQuantity: 0.0,
          QuantityFraction: '900',
          Unit: 'g',
          Ingredient: 'potatis',
        },
        {
          Text: '1 1/2 dl gräddfil',
          IngredientId: 10565,
          Quantity: 1.5,
          MinQuantity: 0.0,
          QuantityFraction: '1 1/2',
          Unit: 'dl',
          Ingredient: 'gräddfil',
        },
        {
          Text: '75 g röd caviarmix',
          IngredientId: 697009,
          Quantity: 75.0,
          MinQuantity: 0.0,
          QuantityFraction: '75',
          Unit: 'g',
          Ingredient: 'röd caviarmix',
        },
        {
          Text: 'salt',
          IngredientId: 11462,
          Quantity: 0.0,
          MinQuantity: 0.0,
          QuantityFraction: '',
          Ingredient: 'salt',
        },
        {
          Text: 'peppar',
          IngredientId: 11224,
          Quantity: 0.0,
          MinQuantity: 0.0,
          QuantityFraction: '',
          Ingredient: 'peppar',
        },
        {
          Text: '4 port laxfilé (à 125 g)',
          IngredientId: 10945,
          Quantity: 4.0,
          MinQuantity: 0.0,
          QuantityFraction: '4',
          Ingredient: 'port laxfilé (à 125 g)',
        },
        {
          Text: '1/2 msk olja',
          IngredientId: 11161,
          Quantity: 0.5,
          MinQuantity: 0.0,
          QuantityFraction: '1/2',
          Unit: 'msk',
          Ingredient: 'olja',
        },
        {
          Text: '1 gurka',
          IngredientId: 10596,
          Quantity: 1.0,
          MinQuantity: 0.0,
          QuantityFraction: '1',
          Ingredient: 'gurka',
        },
      ],
    },
  ],
};

const Recipes = () => {
  const [searchFor, setSearchFor] = useState<string[]>([]);
  const { foods } = useAppSelector((state: RootState) => state.fridge);

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

  return (
    <div className='container recipes'>
      <h1 className='page-heading'>Recept</h1>
      <ul className='search-filter'>{searchMenu}</ul>
      <div className='recipes-container'>
        <div className='recipe'>
          <div className='img-container'>
            <img src={recipe.ImageUrl} alt={recipe.Title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
