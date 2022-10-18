import ReactDOM from 'react-dom';
import './Loader.scss';
import loaderImg from '../../assets/spinner.gif';

const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
      <div className='loader'>
        <img src={loaderImg} alt='loading' />
      </div>
    </div>,
    document.getElementById('loader') as HTMLElement
  );
};

export default Loader;
