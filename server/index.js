
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


//<****************************USER*******************************>

// GET USER DETAILS -- 1 User
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


//<****************************FOLDER*******************************>

// GET ALL USER SPECIFIC FOLDERS -- Many Folders
app.get('/user/folder/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const folders = await db.collection('users').doc(id).collection('File-Storage').get();
        const folderData = folders.docs.map(doc => doc.data());
        res.json(folderData);
    } catch (error) {
        res.json(error);
    }
});

// CREATE USER SPECIFIC FOLDERS -- 1 Folder
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

// GET ALL FILES IN A SPECIFIC FOLDER -- Many Files
app.post('/folder/file', async (req, res) => {
    try {
        const id = req.body.userId;
        const folder = req.body.folderId;
        const files = await db.collection('users').doc(id).collection('File-Storage').doc(folder).collection('Files').get();
        const filesData = files.docs.map(doc => doc.data());
        res.json(filesData);
    } catch (error) {
        res.json(error);
    }
}
);

// FETCH SPECIFIC FOLDER DETAILS -- 1 Folder
app.post('/folder/:id', async (req, res) => {
    try {
        const id = req.body.userId;
        const folder = req.body.folderId;
        const folderData = await db.collection('users').doc(id).collection('File-Storage').doc(folder).get();
        const folderPassData = folderData.data();
        res.json(folderPassData);
    } catch (error) {
        res.json(error);
    }
}
);

//<****************************FILE*******************************>

// CREATE USER SPECIFIC FILE IN FOLDER -- 1 File Create
app.post('/folder/file-create/:id', async (req, res) => {
    try {
        const folderId = req.params.id;
        const newFile = req.body.fileToUpload;
        const userID = req.body.userId;
        const userStorageTake = req.body.currentStorageTake;
        const videoSize = req.body.videoSize;
        const newFileId = newFile.id;
        const response = await db.collection('users').doc(userID).collection('File-Storage').doc(folderId).collection('Files').doc(newFileId).set(newFile);
        const updateStorageTake = await db.collection('users').update({ storage_take: userStorageTake + videoSize });
        res.json({"Video Uploaded": response, "Storage Updated": updateStorageTake});
    } catch (error) {
        res.json(error);
    }
});


//<************************RECENT FILE*******************************>

//FETCH RECENT FILE -- NOT WORKING
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

