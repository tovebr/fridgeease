import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import './Nav.scss';

const Nav = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <div className='main-nav'>
      <ul>
        {isLoggedIn && (
          <>
            <li>
              <NavLink to='/'>Mitt Kylskåp</NavLink>
            </li>
            <li>
              <NavLink to='/recipes'>Recept</NavLink>
            </li>
            <li>
              <NavLink to='/shoppinglist'>Inköpslista</NavLink>
            </li>
            <li>
              <NavLink to='/profile'>Min Sida</NavLink>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
