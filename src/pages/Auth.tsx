import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/fridgeease-logo-freestanding.png';
import './Auth.scss';
import Loader from '../components/loader/Loader';

const Auth = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [resetMode, setResetMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginMode = () => {
    setLoginMode(!loginMode);
    setMessage('');
    setEmail('');
    setError('');
    setPassword('');
    setCPassword('');
    console.log(message);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (loginMode && !resetMode) {
      logInUser();
    } else if (!loginMode && !resetMode) {
      registerUser();
    } else if (resetMode) {
      resetPassword();
    }
  };

  const registerUser = async () => {
    let userId = '';
    if (password === cPassword) {
      let errorText = '';
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const { user } = userCredentials;
          userId = user.uid;
          setIsLoading(false);
          handleLoginMode();
        })
        .then(() => {
          const colRef = collection(db, 'usersFood');
          addDoc(colRef, {
            userId,
            fridge: [],
            savedRecipes: [],
            shoppingList: [],
          });
        })
        .catch((error) => {
          console.log(error.message);
          //setError(error.message);

          switch (error.message) {
            case 'Firebase: Error (auth/invalid-email).':
              errorText = 'Ogiltig Email, försök igen';
              break;
            case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
              errorText = 'Lösenordet måste vara minst 6 tecken';
              break;
            case 'Firebase: Error (auth/email-already-in-use).':
              errorText = 'Mailadressen är redan registrerad, logga in';
              break;
            default:
              errorText = 'Något gick fel, försök igen';
          }

          setIsLoading(false);
          setError(errorText);
        });
    } else {
      setError('Lösenorden är inte identiska');
    }
  };

  const logInUser = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials;
        setIsLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
        let errorText = '';
        switch (error.message) {
          case 'Firebase: Error (auth/wrong-password).':
            errorText = 'Fel lösenord, försök igen';
            break;
          case 'Firebase: Error (auth/user-not-found).':
            errorText = 'Fel email, försök igen';
            break;
          default:
            errorText = 'Något gick fel, försök igen';
        }

        setError(errorText);
        setIsLoading(false);
      });
  };

  const signInWithGoogle = () => {
    let userId = '';
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        userId = user.uid;
        setIsLoading(false);
        navigate('/');
      })
      .then(() => {
        const colRef = collection(db, 'usersFood');
        addDoc(colRef, { userId, fridge: [] });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
        setIsLoading(false);
      });
  };

  const showResetPasswordForm = () => {
    setError('');
    setResetMode(true);
    setPassword('');
  };
  const resetPassword = () => {
    if (email.length > 5) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setMessage(
            'Vi har skickat ett mail med instruktioner för attåterställa ditt lösenord (kolla i skräpmappen om du inte ser det i inkorgen)'
          );
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
        });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className='auth-page'>
        <img src={logo} alt='logo' />
        <form
          className={`auth ${resetMode && 'small-form'} ${
            !loginMode && !resetMode && 'big-form'
          }`}
          onSubmit={(e) => handleSubmit(e)}
        >
          {error && <p className='error-message'>{error}</p>}
          <div className='auth-email'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {!resetMode && (
            <div className='auth-password'>
              <label htmlFor='password'>Lösenord</label>
              <input
                type='password'
                id='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {loginMode && (
                <span className='reset-btn' onClick={showResetPasswordForm}>
                  Glömt lösenordet?
                </span>
              )}
            </div>
          )}
          {!loginMode && !resetMode && (
            <div className='auth-password'>
              <label htmlFor='repeat-password'>Upprepa Lösenord</label>
              <input
                type='password'
                id='repeat-password'
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
          )}

          {loginMode && !resetMode && <button type='submit'>Logga In</button>}
          {!loginMode && !resetMode && (
            <button type='submit'>Registrera</button>
          )}
          {resetMode && (
            <button type='submit' onClick={resetPassword}>
              Återställ lösenord
            </button>
          )}
          {message && resetMode && <p className='message'>{message}</p>}
          <div className='auth-options'>
            <span className='line'></span>
            <p className='auth-google'>
              Eller fortsätt med{' '}
              <FcGoogle className='google-icon' onClick={signInWithGoogle} />
            </p>
            {loginMode && !resetMode && (
              <p>
                Är du ny användare?{' '}
                <span className='purple' onClick={handleLoginMode}>
                  Bli medlem
                </span>
              </p>
            )}
            {!loginMode && (
              <p>
                Redan registrerad?{' '}
                <span className='purple' onClick={handleLoginMode}>
                  Logga in
                </span>
              </p>
            )}
            {resetMode && (
              <p>
                Redan registrerad?{' '}
                <span
                  className='purple'
                  onClick={() => {
                    setLoginMode(true);
                    setResetMode(!resetMode);
                  }}
                >
                  Logga in
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
