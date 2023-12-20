import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import '../../Css/folder.css';
import AddIcon from '@mui/icons-material/Add';

import {
  getFirestore,
  doc,
  collection,
  getDoc,
  setDoc,
  query,
  where,
  addDoc
} from 'firebase/firestore';
import { useAuth } from '../../context/UserAuthContext';
import { db } from '../../firebase';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



  
export default function MultipleSelectCheckmarks({selectedTag}) {

  const [tags ,setTags] = React.useState([]);
  const [tagName ,setTagName] = React.useState("");


  const { currentuser } = useAuth();

  React.useEffect(() => {
    
    const fetchData = async () => {
  try{
    if (!currentuser) {
      // No user is logged in, clear the folders
      setTags(["None"]);
      return;
    }
  
    const currentUserId = currentuser.uid;
  
    // Reference to the "File-Storage" subcollection for the current user
    const userDocRef = doc(db, "users", currentUserId);
    const colRef = doc(userDocRef, "Tags",currentUserId);
  
    // Fetch all documents (folders) in the subcollection
    const docSnapshot = await getDoc(colRef);
    console.log(docSnapshot)
    if (docSnapshot.exists()) {
      // Document exists, retrieve its data
      const elementData = docSnapshot.data().tags;
      console.log(elementData)
      setTags(elementData);
      
    } else {
      console.log("Document does not exist.");
      setTags(null); // Set to null or handle accordingly
    }
  }catch (error){
    console.log(error)
  }
  
  }
  fetchData();
  }, []);


  //ADDING TAGS 
  function addFolder() {
    if (currentuser) {
      const currentUserId = currentuser.uid;
      const userDocRef = doc(db, "users", currentUserId);
      const colRef = doc(userDocRef, "Tags", currentUserId);
      const newTag = {
        tagName
      };
  
      // Make sure tags is always an array, even if it's initially null or undefined
      const updatedTags = Array.isArray(tags) ? [...tags, newTag.tagName] : [newTag.tagName];
  
      // Update the Firestore document with the updatedTags array
      setDoc(colRef, {
        tags: updatedTags
      })
        .then(() => {
          // Folder added successfully, you can update your local state if needed
          setTags(updatedTags); // Update the local state with updatedTags
        })
        .catch((error) => {
          console.error("Error adding folder:", error);
        });
    }
    setTagName("");
  }



  


    const [personName, setPersonName] = React.useState([]);
    
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
      
      
    };
    selectedTag(String(personName))
  
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {Array.isArray(tags) ? (
            tags.map((name) => (
            <MenuItem
              id="tagbar-items"
              className="tagbar-drobdown-items"
              key={name}
              value={name}
            >
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))
          ):( <MenuItem disabled>No tags available</MenuItem>
          )}
          <div className="tagbar-add">
            <AddIcon
             className='add-icon-tag'
             onClick={addFolder}
             />
            <TextField
              id="outlined-basic"
              label="Add New"
              variant="outlined"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              
             
            />
          </div>
        </Select>
      </FormControl>
    </div>
  );
}
