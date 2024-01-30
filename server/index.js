
const express = require('express');
const app = express();
const port = 3000;
const credentials = require('./key.json');
const admin = require("firebase-admin");
const cors = require('cors');



admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "https://orcaapp-dfa9b-default-rtdb.europe-west1.firebasedatabase.app"
  });
  
const db = admin.firestore();

const auth = admin.auth();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(cors());

// REGISTER USER POST REQUEST
app.post('/create', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.FullName;
        const UserName = req.body.userName;
        const user = await auth.createUser({
            email,
            password,
            emailVerified: false,
            disabled: false
        })

        const response = await db.collection('users').doc(user.uid).set({
            fullname: name,
            email,
            id: user.uid,
            profilePictureURL:"",
            recent:"",
            storage_take:0,
            subscription:false,
            user_since: new Date(),
            username:UserName,
        });
        res.json({user});
    
    } catch (error) {
        res.json(error);
    } 
});

// LOGIN USER POST REQUEST
app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        //USER LOGIN WITH EMAIL AND PASSWORD
        const user = await auth.signInWithEmailAndPassword(email, password);
        res.json(user);
    } catch (error) {
        console.error("Firebase Authentication Error:", error.code, error.message);
        res.status(401).json({ error: error.message });
    }
});

// GET USER BY ID
app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await auth.getUser(id);
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

// GET USER DOCUMENTS

app.get('/user/:id/documents', async (req, res) => {
    try {
        const id = req.body.id;
        const user = await db.collection('users').doc(id).get();
        const documents = user.data();
        res.json(documents);
    } catch (error) {
        res.json(error);
    }
});

// USER SIGN OUT
app.get('/logout', async (req, res) => {
    try {
        const user = await auth.signOut();
        res.json(user);
    } catch (error) {
        res.json(error);
    }
});

