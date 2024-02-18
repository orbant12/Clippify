
const express = require('express');
const app = express();
const port = 3000;
const credentials = require('./key.json');
const firebaseAdmin = require("firebase-admin");
const cors = require('cors');
const ytdl = require('ytdl-core');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
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
});

//UPDATE FILE COUNT IN FOLDER -- 1 Folder

app.post('/folder/update-count/:id', async (req, res) => {
    try {
        const folderId = req.params.id;
        const userID = req.body.userId;
        const fileCount = req.body.fileCount;
        const response = await db.collection('users').doc(userID).collection('File-Storage').doc(folderId).update({ file_count: fileCount });
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

//UPDATE FOLDER NAME -- 1 Folder

app.post('/folder/update-title/:id', async (req, res) => {
    try {
        const folderId = req.params.id;
        const userID = req.body.userId;
        const folderName = req.body.folderTitle;
        const response = await db.collection('users').doc(userID).collection('File-Storage').doc(folderId).update({ title: folderName });
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

//DELETE FOLDER -- 1 Folder

app.post('/folder/delete/:id', async (req, res) => {
    try {
        const folderId = req.params.id;
        const userID = req.body.userId;
        const response = await db.collection('users').doc(userID).collection('File-Storage').doc(folderId).delete();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

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


//<****************************FILE*******************************>


// UPDATE FILE RELATED COUNTER -- 1 File
app.post('/file/update-count/:id', async (req, res) => {
    try {
        const fileId = req.params.id;
        const userID = req.body.userId;
        const fileCount = req.body.relatedCount;
        const response = await db.collection('users').doc(userID).collection('File-Storage').doc(fileId).update({ related_count: fileCount });
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

// FETCH SPECIFIC FILE DETAILS -- 1 File
app.post('/file/:id', async (req, res) => {
    try {
        const userId = req.body.userId;
        const folderID = req.body.folderId;
        const fileID = req.params.id;
        const fileData = await db.collection('users').doc(userId).collection('File-Storage').doc(folderID).collection('Files').doc(fileID).get();
        const filePassData = fileData.data();
        res.json(filePassData);
    } catch (error) {
        res.json(error);
    }
});

// QUERY CHILDREN FILES -- Many Files
app.post('/file/children/:id', async (req, res) => {
    try {
        const fileId = req.params.id;
        const folderId = req.body.folderId;
        const userId = req.body.userId;
        const pageLimit = req.body.pageLimit;
        const lastDocumentId = req.body.lastDocumentId; // Add this line to get the last document ID from the request body

        let query = db.collection('users').doc(userId).collection('File-Storage').doc(folderId).collection('Files').doc(fileId).collection('Children')
            .orderBy('id', 'asc')
            .limit(pageLimit);

        if (lastDocumentId) {
            query = query.startAfter(lastDocumentId); // Use startAfter to start from the document after the last document in the previous page
        }

        const querySnapshot = await query.get();

        const queryData = [];
        querySnapshot.forEach(doc => {
            queryData.push(doc.data());
        });

        // Get the last document from the current page
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        res.json({
            data: queryData,
            lastDocumentId: lastVisible ? lastVisible.id : null // Send the ID of the last document in the current page for pagination
        });
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

// UPDATE RECENT FILE -- 1 File
app.post('/recent/update/:id', async (req, res) => {
    try {
        const userID = req.params.id;
        const recentFileRef = req.body.recent;
        const response = await db.collection('users').doc(userID).update({ recent: recentFileRef });
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});


//<************************YOUTUBE MP4 DOWNLOADER*******************************>

app.post('/youtube-mp4', async (req, res) => {
    try {
        const videoUrl = req.body.videoUrl;
        console.log(videoUrl);
        await download(videoUrl, res);
    } catch (error) {
        console.error('Error fetching or converting the video:', error);
        res.status(500).send('Error fetching or converting the video');
    }
});

async function download(videoLink, res) {
    try {
        let n = Math.floor(Math.random() * 10000);
        let url = videoLink;
        let videID = ytdl.getURLVideoID(url);

        const video = ytdl(url);

        // Get Info
        ytdl.getInfo(videID).then(info => {
            console.log('title:', info.videoDetails.title);
            console.log('rating:', info.player_response.videoDetails.averageRating);
            console.log('uploaded by:', info.videoDetails.author.name);
        });

        res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
        res.setHeader('Content-Type', 'video/mp4');

        video.pipe(res); // Pipe the video stream directly to the response object
    } catch (error) {
        console.error('Error downloading the video:', error);
        throw error;
    }
}