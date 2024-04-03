import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import '../../Css/folder.css'

export default function BasicSpeedDial({togglePopup}) {

  return (
    <Box id="add-btn-fodler" sx={{ width:200, height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial 
        onClick={togglePopup}
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
      </SpeedDial>
    </Box>
  );
}