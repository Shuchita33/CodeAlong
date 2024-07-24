import React, {useState} from 'react';
import './styles.css';
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import logo from '../../assets/logoCode.png';
import Modal from './Modal';
import {getData} from '../../api/api';

const Home = () => {
    const [openModal, setOpenModal] = useState({ state: false});
    const user=JSON.parse(localStorage.getItem('profile'));
    const userId=user?.result?._id;
    const [m,setM]=useState(1);

    const getList=async()=>{
        const list=await getData(userId);
        console.log(list);
    }
    const ws=[
        {
            title:"My ws",
            cards:[
                {
                    title:'code1',
                    language:'cpp'
                },
                {
                    title:'code1',
                    language:'python'
                },
                {
                    title:'code1',
                    language:'JS'
                },
            ]
        },
        {
            title:"My ws",
            cards:[
                {
                    title:'code1',
                    language:'cpp'
                },
                {
                    title:'code1',
                    language:'python'
                },
                {
                    title:'code1',
                    language:'JS'
                },
            ]
        },
        {
            title:"My ws",
            cards:[
                {
                    title:'code1',
                    language:'cpp'
                },
                {
                    title:'code1',
                    language:'python'
                },
                {
                    title:'code1',
                    language:'JS'
                },
            ]
        }
        
    ]
    getList();
  return (
    <div className='box'>
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
            ws.map((ele)=>(
                <div className='folder-card'>
                    <div className="f-header">
                        <h3 className="f-heading">
                            <FcOpenedFolder/>{ele.title}
                        </h3>
                        <div className="folder-icons">
                            <IoTrashOutline/>
                            <BiEditAlt onClick={() => {setM(4); setOpenModal({ state: true})}}/> 
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
                                    <BiEditAlt onClick={() => {setM(5); setOpenModal({ state: true})}}/>                                
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
                />
              )}     
    </div>                        
    </div>
  )
}

export default Home