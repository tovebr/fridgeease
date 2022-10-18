import { NavLink } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
  return (
    <div className='main-nav'>
      <ul>
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
        <li>
          <NavLink to='/login'>Login</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
