import React, { useRef, useState, useEffect } from 'react'
import { BiFullscreen, BiImport,BiExport } from "react-icons/bi";
import {Editor} from '@monaco-editor/react';
import './styles.css';

const RealtimeEditor = () => {
   const [code,setCode]=useState('');
   const [theme, setTheme] = useState('vs-dark');
   const [lang,setLang]=useState('');
   const [isFullScreen, setIsFullScreen]=useState(false);

   const codeRef=useRef();
   const editorOptions={
    fontSize:16,
   }
   useEffect(()=>{
    setCode(fileExtension['cpp'].defaultCode);
    setLang('cpp');
    codeRef.current=code;
   },[codeRef.current])

   const fileExtension={
    cpp:{
        name:'cpp',
        defaultCode: 
        "#include <iostream>\n"
        + "using namespace std;\n\n"
        + "int main() {\n"
        + '\tcout << "Hello World!";\n'
        + "\treturn 0;\n"
        + "}",
    },
    python:{
        name:'py',
        defaultCode: `print("Hello World!")`,
    },
    java:{
        name:'java',
        defaultCode: `public class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
}`,
    }, 
    javascript:{
        name:'js',
        defaultCode: `console.log("Hello World!");`,
    }
   }

   const onCodeChange=()=>{
    codeRef.current=code;
   }
   const onLangChange=(e)=>{
        const newLang = e.target.value;
        setLang(newLang);
        if (code === '' || code === fileExtension[lang]?.defaultCode) {
        setCode(fileExtension[newLang]?.defaultCode);
        }
   }
   const onThemeChange=(e)=>{
        const newTheme=e.target.value;
        setTheme(newTheme);
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
        link.download=`code.${fileExtension[lang].name}`;
        link.click();
  }

  const fullScreen=()=>{
        setIsFullScreen(!isFullScreen);
  }
  const styles={
    fullScreen:{
        position:'absolute',
        top:0, left:0, right:0, bottom:0,
        zIndex: 10,
        width:'100vw'
    },
    minimise:{
        width:'80vw'
    }
  }

  return (
    <div className='editor' style={isFullScreen ? styles.fullScreen : styles.minimise}>
        <div className='editor-header'>
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
            <div className='left'>
            <button  onClick={fullScreen}><BiFullscreen/> {isFullScreen?"Minimise":"FullScreen"}</button>
            <button  onClick={exportCode}><BiExport/> Export </button>
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
    </div>
  )
}

export default RealtimeEditor;
