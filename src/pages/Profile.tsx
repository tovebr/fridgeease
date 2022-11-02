import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import './Profile.scss';

const Profile = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='container profile'>
      <h1 className='page-heading'>Min sida</h1>
      <button onClick={logoutUser}>Logga ut</button>
    </div>
  );
};

export default Profile;
