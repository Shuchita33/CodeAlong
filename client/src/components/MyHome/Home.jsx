import React, {useContext} from 'react';
import './styles.css';
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import logo from '../../assets/logoCode.png';

const Home = () => {
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

  return (
    <div class="home">
        <div class="header">
            <h3 class="heading">
                My <span> Folders</span>
            </h3>
            <div class="add-button"> <span>+</span> New Folder</div>
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
                            <BiEditAlt/>
                            <div className="f-add-button"
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
                                        <BiEditAlt/>
                                </div>
                            </div>     
                    ))} 
                    </div>             
                </div>
            ))
        }          
    </div>                        

  )
}

export default Home