import React, { useRef, useState, useEffect } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { FcOk } from 'react-icons/fc';
import {getData,addData,updateWorkspaceName} from '../../api/api';


const Model = ({ openModal, setOpenModal, wsId, getLists }) => {
  const user=JSON.parse(localStorage.getItem('profile'));
  const userId=user?.result?._id;
  const [msg, setMsg] = useState('');
  const [enteredVal, setEnteredVal] = useState('');
  const [folders,setFolders]=useState([]);

  const inputRef = useRef(null);

  const handleChange = (e) => {
    setEnteredVal(e.target.value);
  };

  useEffect(()=>{   
    const getList=async()=>{
      const list=await getData(userId);
      //console.log(list.data);
      setFolders(list.data);
    }
    getList();
  },[])

  const addFolder = async(folderName) => { 
    //console.log(folderName);
    const newState= {
      title: folderName,
      cards: []
    }
    //console.log(newState);
    const res=await addData(userId,newState);
    getLists();   
  }
  const updateFolder=async(userId, wsId, enteredVal)=>{
    //console.log(userId,wsId,enteredVal);
    await updateWorkspaceName(userId, wsId, enteredVal);
    getLists();
  }

  const handleSubmit = () => {
    const m = openModal;
    switch (m) {
      case 1:
        // console.log('Enter Foldername',enteredVal);
        addFolder(enteredVal);
        break;
      case 2:
        console.log('Enter Workspace name',enteredVal);
        break;
      case 3:
        updateFolder(userId, wsId, enteredVal);
        break;
      case 4:
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
        setMsg('Edit Foldername');
        break;
      case 4:
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
            ref={inputRef}
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
