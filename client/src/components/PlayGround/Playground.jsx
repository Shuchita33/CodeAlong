import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import { BiArrowFromBottom, BiArrowToBottom } from "react-icons/bi";
import CodeEditor from './CodeEditor';
import {getData} from '../../api/api';

const Playground = () => {
  const user=JSON.parse(localStorage.getItem('profile'));
  const userId=user?.result?._id;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const [defLang, setdefLang]=useState('');

  const params=useParams();
  const {folderId,fileId}=params;
  //console.log(folder,file);
  
  const getDefaultCode=async()=>{
    const {data}=await getData(userId);
    console.log(data)
    data.forEach((folder)=>{
      if(folder._id==folderId){
        folder.cards.forEach((file)=>{
          if(file._id==fileId){
            setdefLang(file.language);
          }
        })
      }
    })
  }
  useEffect(()=>{
    getDefaultCode();
    console.log(defLang)
  },[userId,defLang])

  const importInput = (e) => {
    const file = e.target.files[0];
    const type = file.type.includes("text");
    if (type) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function (value) {
        const importedCode = value.target.result;
        setInput(importedCode);
      }
    } else {
      alert("Please choose a program file");
    }
  }

  const exportOutput = () => {
    const outVal = output.trim();
    if (!outVal) {
      alert("No Output available.");
      return;
    }
    const outBlob = new Blob([outVal], { type: "text/plain" });
    const url = URL.createObjectURL(outBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `output.txt`;
    link.click();
  }

  return (
    <div className='playground-container'>
      <div className='content-container'>
        <div className='editor-container'>
          <CodeEditor fileId={fileId} folderId={folderId} defLang={defLang}/>
        </div>
        <div className='inputt-container'>
          <div className='inputt-header'>
            <b>Input :</b>
            <label htmlFor='input' className='input-icon'>
              <BiArrowToBottom />
              <span>Import input</span>
            </label>
            <input type='file' id='input' style={{ display: 'none' }} onChange={importInput} />
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
        </div>
        <div className='output-container'>
          <div className='output-header'>
            <b>Output :</b>
            <div className='output-icon' onClick={exportOutput}>
              <BiArrowFromBottom />
              <span>Export output</span>
            </div>
          </div>
          <textarea readOnly value={output} onChange={(e) => setOutput(e.target.value)}></textarea>
        </div>
      </div>
    </div>
  )
}

export default Playground;
