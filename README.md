# ✂️ Clippify Introduction Video 🎞️





https://github.com/orbant12/Clippify/assets/124793231/7433a6f0-e758-4867-8dbc-74fb009748c4





---

Welcome to Clippify, a comprehensive and multifaceted project that showcases my mastery of various technologies and skills relevant to the tech industry. This README is designed to provide a detailed insight into the key components and accomplishments of this project, specifically tailored for a tech job recruiter

## NUMBER ONE IN GOOGLE SEARCH
![Screenshot 2024-08-20 at 12 36 29](https://github.com/user-attachments/assets/b95a26fc-5963-4529-9151-739636b081fa)

---

### Table of Contents
1. [Technologies Used](#technologies-used)
2. [App Features](#app-features)
3. [Project Components](#project-components)
4. [Problems & Solutions](#problems--solutions)
5. [Usage & Installation](#usage--installation)
   
---

## Technologies Used

### 💻 Frontend • Dir: [client](https://github.com/orbant12/Clippify/tree/master/client)

- FFmpeg
- React 
- JS
- HTML
- CSS & Tailwind
- Vite
- Cross Origin Isolation Middleware
- Lexical Editor 
- Stripe 
- OpenAI 

### 👨🏻‍💻 Backend • Dir: [server](https://github.com/orbant12/Clippify/tree/master/server)

- Node
- Express
- EST
- Firebase Firestore
- Firebase Authentication
- Firebase Storage
- Stripe API
- OpenAI API

### 👾 Machine Learning • Dir: [RNN_model](https://github.com/orbant12/Clippify/tree/master/RNN_model)

- Tensorflow
- Python
- Numpy
- Pandas
- Firebase ML Integration
  
---

## App Features

1. **Mastery of FFMPEG Syntax:** Proficient in manipulating media files (mp3, mp4, blob, blob64, URL, data URL) using FFMPEG, showcasing a deep understanding of multimedia processing.

2. **Self-trained Neural Network for Video Transcript Extraction:** Built a Convolutional Neural Network using TensorFlow, Numpy, Pandas for video transcript extraction, demonstrating expertise in machine learning and natural language processing.

3. **OpenAI API Implementation:** Successfully integrated the OpenAI API to create a ChatBot, showcasing proficiency in leveraging external APIs for advanced functionality.

4. **Authentication and User Data Flow with Firebase:** Implemented secure user authentication and managed data flow using Firebase, ensuring a robust and scalable user management system.

5. **Live Database with Firebase Changes on Snapshot:** Developed a dynamic system that reflects real-time changes in the Firebase database, demonstrating skills in live data synchronization.

6. **Lexical Editor for Rich Text Editor State Management:** Created a lexical editor for managing rich text editor states, showcasing expertise in front-end development and state management.

7. **Stripe API Integration:** Implemented Stripe API for payment processing, including setup, proper JSON data fetching, and secure storage of payment information for features like invoices, prices, and subscription states.

8. **Plain CSS Styling: ** Each Page has its own .css file, layout, and position made with flexbox, components styling written inside the page where the component is placed, there are two types of color themes. (#dark, #light) 

10. **Own Policies and Terms of Use:** Drafted and implemented custom policies and terms of use, highlighting a commitment to legal and ethical considerations in software development.

---

## Project Components

### 1. FFMPEG Syntax and Media Manipulation

 - Code Here : https://github.com/orbant12/Node-Express-Clippify/blob/main/src/assets/videoTrim/videoApp.jsx
 - All Video Trimming Components : https://github.com/orbant12/Node-Express-Clippify/tree/main/src/assets/videoTrim

### 2. Self-trained Neural Network for Video Transcript Extraction

 - Jupiter Notebook: https://github.com/orbant12/Automatic_Speech_Recognition-CNN

### 3. OpenAI API Implementation

 - Code Here: https://github.com/orbant12/Node-Express-Clippify/blob/main/functions/src/index.ts

### 4. Authentication and User Data Flow with Firebase

 - Context: https://github.com/orbant12/Node-Express-Clippify/blob/main/src/context/UserAuthContext.jsx
 - Login: https://github.com/orbant12/Node-Express-Clippify/blob/main/src/pages/SignIn.jsx
 - Registration: https://github.com/orbant12/Node-Express-Clippify/blob/main/src/pages/Login.jsx

### 5. Live Database with Firebase Changes on Snapshot



### 6. Lexical Editor for Rich Text Editor State Management

 - Code Here: https://github.com/orbant12/Node-Express-Clippify/blob/main/src/assets/File/txtEditor/txtEditor.jsx

### 7. Stripe API Integration

 - Code Here: https://github.com/orbant12/Node-Express-Clippify/tree/main/src/assets/Subscription

### 8. CSS Styling

 - Code Here : https://github.com/orbant12/Node-Express-Clippify/tree/main/src/Css
 - Theme Switch: https://github.com/orbant12/Node-Express-Clippify/blob/main/src/App.jsx

### 9. Own Policies and Terms of Use

 - Code Here: https://github.com/orbant12/Node-Express-Clippify/tree/main/src/pages/Policies

---

## Problems and Solutions

### 1. ASR Network only accept mp3 / wav files

To solve this problem, I needed to convert a copy of the mp4 to mp3 and upload it to the storage as two seperate files with the same ID (ID.mp4, ID.mp3). For this solution I have made the storage architecture so every user has his own file named with his UID with these inside - userID/FolderID/FileID/ where ID.mp4, ID.mp3, ID.transcript will take place.

### 2. CORS Isolation for SharedArrayBuffer 

After considering the limitations, I have decided to use CORS Isolation to be able to use FFmpeg for trimming, converting, timeline bar and thubnail extraction.

### 3. CORS Isolated Storage Access

Needed to manually edit Google Console's header's

### 4. Rich Text Editor State Extraction for Cross Platform Accessability

Lexical Editor has nummerous extraction methods that is why I choose this technology. Lexical allowed me to extract the content into JSON

### 5. Youtube URL Downloader - MUST move from serverless to REST

I used 


---

## Usage & Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/orbant12/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Or visit from your browser at: https://clippify.net

**You will need:**
 - Create a Clippify Account

  


