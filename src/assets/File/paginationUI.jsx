//DESC: This is the component for the pagination

import * as React from 'react';
import Pagination from "@mui/material/Pagination/index.d.ts";
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


export default function PaginationUi({currentPage, totalPages,fetchNextPage,fetchPreviousPage}) {


const handlePageChange = (event, page) => {
  if (page > currentPage) {
    // Call the fetchNextPage function to load the next page
    fetchNextPage();
  } else if (page < currentPage) {
    // Call the fetchPreviousPage function to load the previous page
    fetchPreviousPage();
  }
};
  
const theme = createTheme({
  palette: {
    primary:{
      main: '#9effb1',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    } ,
    secondary: purple,
  },
});

return (
<ThemeProvider theme={theme}>
    <Stack spacing={2} sx={{mt:5}} alignItems="center">
      <Pagination
        color='primary'
        count={totalPages}
        page={currentPage}
        variant="outlined" 
        shape="rounded" 
        onChange={handlePageChange}
      />
    </Stack>
</ThemeProvider>
);
}