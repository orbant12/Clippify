import React, {useState} from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AddLinkIcon from '@mui/icons-material/AddLink';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import '../../../Css/folder.css'
//import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

  
  const Item = styled(Paper)(({ theme, isSelected }) => ({

    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: isSelected ? '4px solid #9effb1' : 'none', // Apply a blue border when isSelected is true
    cursor: 'pointer',
  }));
  
  export default function DividerStack({setSelectedPopUp}) {
    const [selectedItem, setSelectedItem] = useState(null);


    const handleItemClick = (index) => {
      setSelectedItem(index);
      if (index == 0) setSelectedPopUp("link");
      else if (index == 1) setSelectedPopUp("upload");
    };
    return (
      <div className='selection-row'> 
        <Stack
          direction="row"
         // divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          className='card-stack'
        >
          <Item 
            className="card-item"
            onClick={() => handleItemClick(0)}
            isSelected={selectedItem === 0}
          ><div className='item-box-link'>
            <h2>Link</h2>
            <AddLinkIcon />
            </div>
            <div className='item-desc'>
            <h5>You can insert your desired video URL and create clips out of you video</h5></div></Item>
            <h3 className='or-txt'>Or</h3>
          <Item 
            className={`card-item`}
            onClick={() => handleItemClick(1)}
            isSelected={selectedItem === 1}
          ><div className='item-box-link'>
          <h2>Upload</h2>
          <DriveFolderUploadIcon />
          </div><div className='item-desc'>
            <h5>You can pick & upload your video and create clips </h5></div></Item>
          
        </Stack>
      </div>
    );
  }