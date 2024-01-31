import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "draft-js/dist/Draft.css";
import "./App.css";
import Title from "./Title";



const customStyleMap = {
  HIGHLIGHT: {
    backgroundColor: "yellow",
  },
  RED_TEXT: {
    color: "red",
  },
};

const App = () => {
  
  const [editorState, setEditorState] = useState(() => {

    // Load content from local storage on component mount
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      return EditorState.createWithContent(contentState);
    } else {
      // If no saved content, create an empty editor state
      return EditorState.createEmpty();
    }
  });
  
 


  useEffect(() => {
    // Save content to local storage whenever editor state changes
    const contentState = editorState.getCurrentContent();
    const serializedContent = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem("editorContent", serializedContent);
  }, [editorState]);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleBeforeInput = (chars) => {
    if (chars === "#") {
      setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
      return "handled";
    } else if (chars === "$") {
      setEditorState(RichUtils.toggleBlockType(editorState, "header-two"));
      return "handled";
    } else if (chars === "&") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
      return "handled";
    } else if (chars === "_") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
      return "handled";
    } else if (chars === "+") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "RED_TEXT"));
      return "handled";
    } else if (chars === "*") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
      return "handled";
    } else if (chars === "!") {
      setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
      return "handled";
    } else if (chars === "@") {
      setEditorState(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
      return "handled";
    }
    return "not-handled";
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const serializedContent = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem("editorContent", serializedContent);
    toast("Content saved successfully!");
  };
 


  return (
    <div className="App ">
    <ToastContainer position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
     />
     
      <header className="App-header bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ">
        <Title handleSave={handleSave}/>
        <div className="edit w-[75%] my-2 bg-sky-900 text-white font-mono">
        
        <Editor
            editorState={editorState}
            customStyleMap={customStyleMap}
            handleKeyCommand={handleKeyCommand}
            handleBeforeInput={handleBeforeInput}
            onChange={onChange}
          />
        </div>
      
      </header>
     
    </div>
  );
};

export default App;
