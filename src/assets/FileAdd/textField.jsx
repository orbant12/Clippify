
import  React, { useState }  from  'react'
import { TextBox } from  'notion-components'
import  'notion-components/dist/index.css'

import '../../Css/folder.css'


const TextFieldFile = ({fileTitle}) => {
 
    
    
    const [text, setText] =  useState('')
    
    const  onChangeHandler  = (value) => {
         setText(value)
         fileTitle(value)
    }
    return (
         <TextBox
             onChangeHandler={onChangeHandler}
             placeholder='Untitled'
             initialValue={text}
             className="textbox"
         />
     );
    }
  
  
  export default TextFieldFile