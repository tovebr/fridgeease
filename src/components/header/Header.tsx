import { NavLink } from 'react-router-dom';
import Nav from '../nav/Nav';
import logo from '../../assets/fridgeease-logo-freestanding.png';
import './Header.scss';

const Header = () => {
  return (
    <nav>
      <div className='container'>
        <NavLink to='/'>
          <img className='nav-logo' src={logo} alt='logo' />
        </NavLink>
        <Nav />
      </div>
    </nav>
  );
};

export default Header;
