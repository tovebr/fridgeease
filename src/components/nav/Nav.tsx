import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import './Nav.scss';

const Nav = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [activeTab, setActiveTab] = useState(
    `${isLoggedIn ? 'fridge' : 'login'}`
  );

  return (
    <div className='main-nav'>
      <ul>
        {isLoggedIn && (
          <>
            <li
              className={`${'fridge' === activeTab ? 'active-link' : ''}`}
              onClick={() => setActiveTab('fridge')}
            >
              <NavLink to='/'>Mitt Kylskåp</NavLink>
            </li>
            <li
              className={`${'recipes' === activeTab ? 'active-link' : ''}`}
              onClick={() => setActiveTab('recipes')}
            >
              <NavLink to='/recipes'>Recept</NavLink>
            </li>
            <li
              className={`${'shoppinglist' === activeTab ? 'active-link' : ''}`}
              onClick={() => setActiveTab('shoppinglist')}
            >
              <NavLink to='/shoppinglist'>Inköpslista</NavLink>
            </li>
            <li
              className={`${'profile' === activeTab ? 'active-link' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <NavLink to='/profile'>Min Sida</NavLink>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li
            className={`${'login' === activeTab ? 'active-link' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            <NavLink to='/login'>Login</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
