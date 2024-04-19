
import  React, { useState }  from  'react'


import '../../../Css/folder.css'


const TextFieldFile = ({fileTitle}) => {
 
    
    
    const [text, setText] =  useState('')
    
    const  onChangeHandler  = (value) => {
         setText(value)
         fileTitle(value)
    }
    return (
    <div>
        
    </div>

     );
    }
  
  
  export default TextFieldFile