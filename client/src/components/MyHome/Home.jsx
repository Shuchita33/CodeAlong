import React, {useEffect,useRef, useState} from 'react';
import './styles.css';
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import logo from '../../assets/logoCode.png';
import Modal from './Modal';
import {getData,deleteWorkspace} from '../../api/api';

const Home = () => {
    const [openModal, setOpenModal] = useState({ state: false});
    const user=JSON.parse(localStorage.getItem('profile'));
    const userId=user?.result?._id;
    const [m,setM]=useState(1);
    const [allWs,setWs]=useState([]);
    const [currentWsId, setCurrentWsId] = useState(null);

    const getList=async()=>{
        const list=await getData(userId);
        //console.log(list.data);
        setWs(list.data);
    }
    useEffect(()=>{
        getList();
    },[])
    
    const deleteWs=async(wsId)=>{
        const confirmDelete = window.confirm("Are you sure you want to delete this folder?");
        if (!confirmDelete) return;
        await deleteWorkspace(userId,wsId);
        console.log(userId,wsId);
        alert('Deleted Folder');
        getList();
    }
    const editWsname = (wsId) => {
        setCurrentWsId(wsId);
        setM(3);
        setOpenModal({ state: true });
        getList();
      };
  return (
    <div className="home">
        <div className="header">
                <h3 className="heading">
                    My <span> Folders</span>
                </h3>
                <div className="add-button" 
                    onClick={() => {setM(1); setOpenModal({ state: true})}}
                > <span>+</span> New Folder</div>        
        </div>
        {
            allWs.map((ele)=>(
                <div className='folder-card' key={ele._id}>
                    <div className="f-header">
                        <h3 className="f-heading">
                            <FcOpenedFolder/>{ele.title}
                        </h3>
                        <div className="folder-icons">
                            <IoTrashOutline onClick={()=>deleteWs(ele._id)}/>
                            <BiEditAlt onClick={() => editWsname(ele._id)}/> 
                            <div className="f-add-button"
                                onClick={() => {setM(2); setOpenModal({ state: true})}}
                            ><span>+</span> New Workspace </div>
                        </div>
                    </div>
                    <div className="ws-cards">
                    { ele.cards.map((card)=>(                       
                            <div className="card">
                                <div className="card-container">
                                    <img className="logo" src={logo} alt="Logo" />
                                    <div className="card-content">
                                        <p>{card.title}</p>
                                        <p>{card.language}</p>
                                    </div>
                                </div>
                                <div className="folder-icons">
                                    <IoTrashOutline/>
                                    <BiEditAlt onClick={() => {setM(4); setOpenModal({ state: true})}}/>                                
                                </div>
                            </div>     
                    ))} 
                    </div>             
                </div>
            ))
        }     
        {openModal.state && (
                <Modal
                  openModal={m}
                  setOpenModal={setOpenModal}
                  wsId={currentWsId}
                  getLists={getList}
                />
              )}     
    </div>                        
  )
}

export default Home