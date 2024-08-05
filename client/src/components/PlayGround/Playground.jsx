import React from 'react';
import './styles.css';
import { BiArrowFromBottom, BiArrowToBottom } from "react-icons/bi";
import logo from '../../assets/logoCode.png';
import CodeEditor from './CodeEditor';

const Playground = () => {
  
  return (
    <div className='playground-container'>
      <div className='content-container'>
        <div className='editor-container'>
          <CodeEditor/>
        </div>
        <div className='inputt-container'>
          <div className='inputt-header'>
            <b>Input :</b>
            <label htmlFor='input' className='input-icon'>
              <BiArrowToBottom/>
              <span>Import input</span>
              <input type='file' style={{display:'none'}} ></input> 
            </label>          
          </div>
        </div>
        <div className='output-container'>
            <div className='output-header'>
              <b>Output :</b>
              <label htmlFor='input' className='output-icon'>
              <BiArrowFromBottom/>
              <span>Export output</span>
              </label>       
              <button style={{display:'none'}}>Export Output</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Playground
