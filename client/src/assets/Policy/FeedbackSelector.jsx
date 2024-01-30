import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width:"100%",
    },
  },
};

const names = [
  'Missing Data',
  'Feature Request',
  'Bug Report',
  'Performance Issue',
  'Crash Report',
  'Leak Report',
  'Broken UI',
  'Payment Issue',
  'Subscription Issue',
  'Not Satisfied',
  'Refound Request',
  'Other',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName === name ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  };
}

export default function SingleSelectChip({ reportCategory }) {
const theme = useTheme();
const [personName, setPersonName] = React.useState('');

const handleChange = (event) => {
  const { value } = event.target;
  setPersonName(value);
  reportCategory(value);
};

return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Chip key={selected} label={selected} />
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
);
}
