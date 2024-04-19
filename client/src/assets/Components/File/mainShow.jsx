//DESC: this is the component showed in related and file page selecting switching between video and pag

import * as React from 'react';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import DvrIcon from '@mui/icons-material/Dvr';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function ToggleButtons({secBarState}) {


const [alignment, setAlignment] = React.useState('videoAndPag');

const changeTypePag = () =>{
  const PagValue = "videoAndPag"
  setAlignment(PagValue)
  secBarState(false)
}
const changeTypeVideo = () =>{
  const VideoValue = "video-only"
  setAlignment(VideoValue)
  secBarState(true)
}

const theme = createTheme({
  palette: {
    primary:{
      main: '#9effb1',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    } ,
  },
});

return (
<ThemeProvider theme={theme}>
  <ToggleButtonGroup
    value={alignment}
  >
    <ToggleButton value="video-only" color='primary' aria-label="left aligned" onClick={changeTypeVideo}>
      <VideoSettingsIcon />
    </ToggleButton>

    <ToggleButton value="videoAndPag" color='primary' aria-label="centered" onClick={changeTypePag}>
      <DvrIcon />
    </ToggleButton>
  </ToggleButtonGroup>
</ThemeProvider>
)};