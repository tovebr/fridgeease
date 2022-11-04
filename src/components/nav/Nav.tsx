import { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import './Nav.scss';

const Nav = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [activeTab, setActiveTab] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    setActiveTab(pathname === '/' ? 'fridge' : pathname.substring(1));
  }, [pathname]);

  return (
    <div className='main-nav'>
      <ul>
        {isLoggedIn && (
          <>
            <NavLink to='/'>
              <li
                className={`${'fridge' === activeTab ? 'active-link' : ''}`}
                onClick={() => setActiveTab('fridge')}
              >
                Mitt Kylskåp
              </li>
            </NavLink>
            <NavLink to='/recipes'>
              <li
                className={`${'recipes' === activeTab ? 'active-link' : ''}`}
                onClick={() => setActiveTab('recipes')}
              >
                Recept
              </li>
            </NavLink>
            <NavLink to='/shoppinglist'>
              <li
                className={`${
                  'shoppinglist' === activeTab ? 'active-link' : ''
                }`}
                onClick={() => setActiveTab('shoppinglist')}
              >
                Inköpslista
              </li>
            </NavLink>
            <NavLink to='/profile'>
              <li
                className={`${'profile' === activeTab ? 'active-link' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Min Sida
              </li>
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
