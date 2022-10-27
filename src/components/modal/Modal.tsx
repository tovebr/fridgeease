import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

interface Props {
  closeModal: React.MouseEventHandler<HTMLDivElement>;
}

const editForm = () => {
  return <form id='edit'></form>;
};

const Modal = ({ closeModal }: Props) => {
  return ReactDOM.createPortal(
    <div className='wrapper' onClick={closeModal}></div>,
    document.getElementById('modal') as HTMLElement
  );
};

export default Modal;
