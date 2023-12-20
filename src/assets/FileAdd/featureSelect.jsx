import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme, isSelected}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: 400,
  borderRadius: 20,
  border: isSelected ? '2px solid #9effb1' : 'none',
  cursor: 'pointer', 
}));






export default function ZeroWidthStack() {

const [featureAdded, setFeatureAdded] = useState(0);

const [isAiPicked, setIsAiPicked] = useState(false);
const [isNotesPicked, setIsNotesPicked] = useState(false);


const addNotesFeature = async () =>{
  if(isNotesPicked == true){
    setIsNotesPicked(false)
    setFeatureAdded(featureAdded - 1)
  }else{
    setIsNotesPicked(true)
    setFeatureAdded(featureAdded + 1)
  }
}

const addAiFeature = async () =>{
  if(isAiPicked == true){
    setIsAiPicked(false)
    setFeatureAdded(featureAdded - 1)
  }else{
    setIsAiPicked(true)
    setFeatureAdded(featureAdded + 1)
  }
  
}



const feature_1 = 'Notes'
const feature_2 = 'Ai Support'
const feature_number = `${featureAdded} added`



  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <Item
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
        onClick={addNotesFeature}
        isSelected={isNotesPicked === true}
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar>N</Avatar>
          <Typography noWrap>{feature_1}</Typography>
        </Stack>
      </Item>
      <Item
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
        isSelected={isAiPicked === true}
        onClick={addAiFeature}
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack>
            <Avatar>Ai</Avatar>
          </Stack>
          <Stack sx={{ minWidth: 0 }}>
            <Typography noWrap>{feature_2}</Typography>
          </Stack>
        </Stack>
      </Item>
      <Item
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
        
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack>
            
          </Stack>
          <Stack sx={{ minWidth: 0 }}>
            <Typography noWrap>{feature_number}</Typography>
          </Stack>
        </Stack>
      </Item> 
    </Box>
  );
}