import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import './errorModal.css' 

// import Modal from './Modal';
// import Button from './Button';

const ErrorModal = props => {
 
  return (
    <div>
      <Modal
       classNames={{ modal: 'customModal',}}
       open={props.error ? true : false} onClose={props.onClear} 
       center
      >
        <h3>An Error Occurred!</h3>
        <p style={{color: "black", fontSize: "14px"}}>{props.error}</p>
      </Modal>
    </div>
  );
}

export default ErrorModal;
