//DESC: not in use

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function LabelNavigation() {

const [value, setValue] = React.useState('recents');

const handleChange = (event, newValue) => {
  setValue(newValue);
};

return (
<BottomNavigation sx={{ width: 500}} value={value} onChange={handleChange}>
  <BottomNavigationAction
    label="Notes"
    value="recents"
    icon={<DescriptionIcon />}
  />
  <BottomNavigationAction
    label="Favorites"
    value="favorites"
    icon={<FavoriteIcon />}
  />
  <BottomNavigationAction
    label="Nearby"
    value="nearby"
    icon={<LocationOnIcon />}
  />
  <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
</BottomNavigation>
);
}