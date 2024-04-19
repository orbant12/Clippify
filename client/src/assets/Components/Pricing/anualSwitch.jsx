import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import '../../../Css/pricing.css'




const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export default function AnualSwitch({stateAnnualSwitch}) {
const [isYearlyOn, setIsYearlyOn] = useState(false);

const handleSwitchChange = () => {
  setIsYearlyOn(!isYearlyOn);
  stateAnnualSwitch(isYearlyOn)
};

return (
    <FormGroup>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography className='switch_m'>Monthly</Typography>
        <AntSwitch 
        defaultChecked={isYearlyOn}
        onChange={handleSwitchChange}
        inputProps={{ 'aria-label': 'ant design' }} />
        <Typography className='switch_y' >Yearly</Typography>
      </Stack>
    </FormGroup>
  );
}