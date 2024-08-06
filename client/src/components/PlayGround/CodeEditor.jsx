import React, { useRef, useState, useEffect } from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { BiFullscreen, BiImport,BiExport } from "react-icons/bi";
import { VscRunAll } from "react-icons/vsc";
import {Editor} from '@monaco-editor/react';

const CodeEditor = ({fileId,folderId,defLang}) => {
   const[code,setCode]=useState('');
   const [theme, setTheme] = useState('vs-dark');
   const[lang,setLang]=useState(defLang);

   useEffect(() => {
    setLang(defLang);
  }, [defLang]);
  
   const codeRef=useRef();
   const editorOptions={
    fontSize:16,
   }
   const fileExtension={
    cpp:'cpp', python:'py', java:'java', javascript:'js'
   }
   
   const onCodeChange=(newCode)=>{
    //console.log(newCode);
    codeRef.current=newCode;
   }
   const onLangChange=(e)=>{
        const newLang=e.target.value;
        setLang(newLang);
   }
   const onThemeChange=(e)=>{
        const newTheme=e.target.value;
        setTheme(newTheme);
   }
   const importCode=(e)=>{
    const file=e.target.files[0];
    console.log(file)
    const type=file.type.includes("text");
    if(type){
        const fileReader= new FileReader();
        fileReader.readAsText(file);
        fileReader.onload=function(value){
            const importedCode=value.target.result;
            setCode(importedCode);
            codeRef.current=importedCode;
        }
    }
    else{
        alert("Please choose program file")
    }
  }
  const exportCode=()=>{
        const codeVal=codeRef.current?.trim();
        if(!codeVal){
            alert("Please enter some code before exporting.");
            return;
        }
        //create a blob/instant file in memory
        const codeBlob=new Blob([codeVal],{type:"text/plain"});

        //create downloadable link with blob data
        const url=URL.createObjectURL(codeBlob);

        //create clickable link to download
        const link=document.createElement("a");
        link.href=url;
        link.download=`code.${fileExtension[lang]}`;
        link.click();
  }
  return (
    <div className='editor'>
        <div className='editor-header'>
            <div className='left'>
                <b>Title</b>
                <span className='icons'><FaPencilAlt/> </span>
                <button>Save Code</button>
            </div>
            <div className='right'>
                <select onChange={onLangChange} value={lang}>
                    <option value="cpp">cpp</option>
                    <option value="javascript">javascript</option>
                    <option value="java">java</option>
                    <option value="python">python</option>
                </select>
                <select onChange={onThemeChange} value={theme}>
                    <option value="vs-dark">vs-dark</option>
                    <option value="vs-light">vs-light</option>
                </select>
            </div>
        </div>
       
            <Editor 
                theme={theme}
                height={'100%'}
                language={lang}
                options={editorOptions}
                onChange={onCodeChange}
                value={code}
            />
       
        <div className='editor-footer'>
            <button><BiFullscreen/> FullScreen</button>
            <label htmlFor='import'><BiImport/> Import Code</label>
            <input type='file' id='import' style={{display:'none'}} onChange={importCode}/>
            <button onClick={exportCode}><BiExport/> Export </button>
            <button><VscRunAll/> Run </button>
        </div>
    </div>
  )
}

export default CodeEditor
