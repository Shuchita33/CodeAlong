import React, { useState, useEffect } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { FcOk } from 'react-icons/fc';

const Model = ({ openModal, setOpenModal }) => {
  const [msg, setMsg] = useState('');
  const [enteredVal, setEnteredVal] = useState('');

  const handleChange = (e) => {
    setEnteredVal(e.target.value);
  };

  const handleSubmit = () => {
    const m = openModal;
    switch (m) {
      case 1:
        console.log('Enter Foldername',enteredVal);
        break;
      case 2:
        console.log('Enter Workspace name',enteredVal);
        break;
      case 3:
        console.log('Enter Card name',enteredVal);
        break;
      case 4:
        console.log('Edit Foldername',enteredVal);
        break;
      case 5:
        console.log('Workspace name',enteredVal);
        break;
      default:
        console.log('');
        break;
    }
    setOpenModal({ state: false });
  };

  useEffect(() => {
    const m = openModal;
    //console.log(m);
    switch (m) {
      case 1:
        setMsg('Enter Foldername');
        break;
      case 2:
        setMsg('Enter Workspace name');
        break;
      case 3:
        setMsg('Enter Card name');
        break;
      case 4:
        setMsg('Edit Foldername');
        break;
      case 5:
        setMsg('Edit Workspace name');
        break;
      default:
        setMsg('');
        break;
    }
  }, [openModal]);

  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <div className='m-header'>
          <h3>{msg}</h3>
          <button className='close-button' onClick={() => setOpenModal({ state: false })}>
            <IoCloseSharp />
          </button>
        </div>
        <div className='input-container'>
          <input
            className='input'
            type="text"
            value={enteredVal}
            onChange={handleChange}
          />
          <FcOk style={{ height: '4vh', width: '4vh', cursor: 'pointer' }} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Model;
