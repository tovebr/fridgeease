import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.scss';

const Unauthorized = () => {
  return (
    <div className='container unauthorized'>
      <p>
        Den här sidan är endast tillgänglig för inloggade användare, logga in
        eller skapa en användare <Link to='/'>här</Link>{' '}
      </p>
    </div>
  );
};

export default Unauthorized;
