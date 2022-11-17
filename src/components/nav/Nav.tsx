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
            <NavLink className='list-item' to='/'>
              <li
                className={`${'fridge' === activeTab ? 'active-link' : ''}`}
                onClick={() => setActiveTab('fridge')}
              >
                <BiFridge className='fridge-icon' />
                <p className='nav-link-text'>Mitt Kylskåp</p>
              </li>
            </NavLink>
            <NavLink className='list-item' to='/recipes'>
              <li
                className={`${'recipes' === activeTab ? 'active-link' : ''}`}
                onClick={() => setActiveTab('recipes')}
              >
                <CiForkAndKnife className='cutlery-icon' />
                <p className='nav-link-text'>Recept</p>
              </li>
            </NavLink>
            <NavLink className='list-item' to='/shoppinglist'>
              <li
                className={`${
                  'shoppinglist' === activeTab ? 'active-link' : ''
                }`}
                onClick={() => setActiveTab('shoppinglist')}
              >
                <BsCart2 className='cart-icon' />
                <p className='nav-link-text'>Inköpslista</p>
              </li>
            </NavLink>

            <li
              className={`list-item ${
                'profile' === activeTab ? 'active-link' : ''
              }`}
              onClick={logoutUser}
            >
              <FiUser className='user-icon' />
              <p className='nav-link-text'>Logga ut</p>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
