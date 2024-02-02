
const express = require('express');
const app = express();
const port = 3000;
const credentials = require('./key.json');
const firebaseAdmin = require("firebase-admin");
const cors = require('cors');


//RUN CLIENT




app.use(cors());

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(credentials),
    databaseURL: "https://orcaapp-dfa9b-default-rtdb.europe-west1.firebasedatabase.app"
});


const db = admin.firestore();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


// FIREBASE FIRESTORE

// GET USER DOCUMENT
app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await db.collection('users').doc(id).get();
        const userData = user.data();
        res.json(userData);
    } catch (error) {
        res.json(error);
    }
});

//RECENT FILE GET -- NOT WORKING
app.post('/recent', async (req, res) => {
    try {
        const id = req.body.fileChildren;
       
        const recentFile = await id.get();
        const recentFileData = recentFile.data();
        res.json(recentFileData);
    } catch (error) {
        res.json(error);
    }
});

// GET USER SPECIFIC FOLDERS

app.get('/folder/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const folders = await db.collection('users').doc(id).collection('File-Storage').get();
        const folderData = folders.docs.map(doc => doc.data());
        res.json(folderData);
    } catch (error) {
        res.json(error);
    }
});

// POST USER SPECIFIC FOLDERS

app.post('/folder-create/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const folder = req.body.folderData;
        const response = await db.collection('users').doc(id).collection('File-Storage').add(folder);
        const responseID = await db.collection('users').doc(id).collection('File-Storage').doc(response.id).update({ id: response.id });
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

