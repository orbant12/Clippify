# REST API with Node.js, Firebase Firestore, Firebase Storage, and YouTube Downloader

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This project is a REST API built with Node.js that integrates Firebase Firestore for database operations, Firebase Storage for file storage, and a YouTube downloader to handle video downloads. The API allows users to interact with Firestore, upload and retrieve files from Firebase Storage, and download YouTube videos.

## Features
- CRUD operations with Firebase Firestore
- File upload and retrieval with Firebase Storage
- Download videos from YouTube
- Secure authentication and authorization

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- Firebase CLI

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Initialize Firebase in your project and set up Firestore and Firebase Storage.

## Configuration
1. Create a `.env` file in the root of the project and add your Firebase configuration:
    ```env
    FIREBASE_API_KEY=your_api_key
    FIREBASE_AUTH_DOMAIN=your_auth_domain
    FIREBASE_PROJECT_ID=your_project_id
    FIREBASE_STORAGE_BUCKET=your_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    FIREBASE_APP_ID=your_app_id
    ```

2. Initialize Firebase in your project:
    ```js
    // firebase.js
    const firebase = require('firebase/app');
    require('firebase/firestore');
    require('firebase/storage');

    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
    };

    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const storage = firebase.storage();

    module.exports = { db, storage };
    ```

## Usage
1. Start the server:
    ```sh
    npm start
    ```

2. The API will be accessible at `http://localhost:3000`.

## API Endpoints
Here are some example endpoints you can use:

### Firestore
- **GET /firestore/collection**: Retrieve all documents in a collection
- **POST /firestore/collection**: Add a new document to a collection
- **GET /firestore/collection/:id**: Retrieve a document by ID
- **PUT /firestore/collection/:id**: Update a document by ID
- **DELETE /firestore/collection/:id**: Delete a document by ID

### Firebase Storage
- **POST /storage/upload**: Upload a file to Firebase Storage
- **GET /storage/file/:filename**: Retrieve a file from Firebase Storage

### YouTube Downloader
- **POST /youtube/download**: Download a YouTube video

## Project Structure
