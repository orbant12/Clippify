import React, { useState, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CLEAR_HISTORY_COMMAND } from "lexical";



export default function StateUpdater({initialHtml}) {
 
  
    const [editor] = useLexicalComposerContext();
    const [isLoaded, setIsLoaded] = useState(false); 
  useEffect(() => {
    if (!isLoaded) {
    const onButtonClick = async() => {
    
      const editorState = editor.parseEditorState(
        initialHtml
      );
      editor.setEditorState(editorState);
      editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
      setIsLoaded(true); 
    };
    onButtonClick()
  }
  }, [initialHtml]);
  

};
  
 


