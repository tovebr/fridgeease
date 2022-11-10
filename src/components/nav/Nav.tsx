import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BiFridge } from 'react-icons/bi';
import { CiForkAndKnife } from 'react-icons/ci';
import { BsCart2 } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useAppSelector } from '../../app/hooks';
import './Nav.scss';

const Nav = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const [activeTab, setActiveTab] = useState('');
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

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
                <BiFridge />
                Mitt Kylskåp
              </li>
            </NavLink>
            <NavLink to='/recipes'>
              <li
                className={`${'recipes' === activeTab ? 'active-link' : ''}`}
                onClick={() => setActiveTab('recipes')}
              >
                <CiForkAndKnife />
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
                <BsCart2 />
                Inköpslista
              </li>
            </NavLink>

            <li
              className={`${'profile' === activeTab ? 'active-link' : ''}`}
              onClick={logoutUser}
            >
              <FiUser />
              Logga ut
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
