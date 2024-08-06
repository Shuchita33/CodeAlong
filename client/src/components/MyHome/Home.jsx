import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './styles.css';
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import logo from '../../assets/logoCode.png';
import Modal from './Modal';
import {getData,deleteWorkspace,deleteCardFromWorkspace} from '../../api/api';

const Home = () => {
    const navigate=useNavigate();
    const [openModal, setOpenModal] = useState({ state: false});
    const user=JSON.parse(localStorage.getItem('profile'));
    const userId=user?.result?._id;
    const [m,setM]=useState(1);
    const [allWs,setWs]=useState([]);
    const [currentWsId, setCurrentWsId] = useState(null);
    const [currentCardId, setCurrentCardId] = useState(null);

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

    const addCard = (wsId) => {
        setCurrentWsId(wsId);
        setM(2);
        setOpenModal({ state: true });
    };

    const editCardName = (wsId, cardId) => {
        setCurrentWsId(wsId);
        setCurrentCardId(cardId);
        setM(4);
        setOpenModal({ state: true });
    };

    const deleteCard = async (wsId, cardId) => {
        console.log(wsId,cardId)
        const confirmDelete = window.confirm("Are you sure you want to delete this card?");
        if (!confirmDelete) return;
        await deleteCardFromWorkspace(userId, wsId, cardId);
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
                                onClick={() => addCard(ele._id)}
                            ><span>+</span> New Workspace </div>
                        </div>
                    </div>
                    <div className="ws-cards" >
                    { ele.cards.map((card)=>(                       
                            <div className="card" key={card._id} onClick={()=>navigate(`/playground/${ele._id}/${card._id}`)}>
                                <div className="card-container">
                                    <img className="logo" src={logo} alt="Logo" />
                                    <div className="card-content">
                                        <p>{card.title}</p>
                                        <p>{card.language}</p>
                                    </div>
                                </div>
                                <div className="folder-icons">
                                    <IoTrashOutline onClick={() => deleteCard(ele._id, card._id)}/>
                                    <BiEditAlt onClick={() => editCardName(ele._id, card._id)}/>                                
                                </div>
                            </div>     
                    ))} 
                    </div>             
                </div>
            ))
        }     
        {openModal.state && (
            //this is used to pass props from children to parent to update parent component upon updation caused by child component
                <Modal
                  openModal={m}
                  setOpenModal={setOpenModal}
                  wsId={currentWsId}
                  cardId={currentCardId}
                  getLists={getList}
                />
              )}     
    </div>                        
  )
}

export default Home