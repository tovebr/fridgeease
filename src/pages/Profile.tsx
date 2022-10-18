import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const Profile = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out');
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className='container'>
      <h3>Min sida</h3>
      <button onClick={logoutUser}>Logga ut</button>
    </div>
  );
};

export default Profile;
