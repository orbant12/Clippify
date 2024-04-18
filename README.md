# ✂️ Clippify Introduction Video 🎞️





https://github.com/orbant12/Clippify/assets/124793231/7433a6f0-e758-4867-8dbc-74fb009748c4





---

Welcome to Clippify, a comprehensive and multifaceted project that showcases my mastery of various technologies and skills relevant to the tech industry. This README is designed to provide a detailed insight into the key components and accomplishments of this project, specifically tailored for a tech job recruiter

### Table of Contents
1. [Technologies Used](#technologies-used)
2. [App Features](#key-achievements)
3. [Project Components](#project-components)
    - [1. FFMPEG Syntax and Media Manipulation](#ffmpeg-syntax-and-media-manipulation)
    - [2. Self-trained Neural Network for Video Transcript Extraction](#self-trained-neural-network-for-video-transcript-extraction)
    - [3. OpenAI API Implementation](#openai-api-implementation)
    - [4. Authentication and User Data Flow with Firebase](#authentication-and-user-data-flow-with-firebase)
    - [5. Live Database with Firebase Changes on Snapshot](#live-database-with-firebase-changes-on-snapshot)
    - [6. Lexical Editor for Rich Text Editor State Management](#lexical-editor-for-rich-text-editor-state-management)
    - [7. Stripe API Integration](#stripe-api-integration)
    - [8. Plain CSS styling from scratch](#css-styling)
    - [9. Own Policies and Terms of Use](#own-policies-and-terms-of-use)
4. [Getting Started](#getting-started)
5. [Usage and Demos](#usage-and-demos)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact Information](#contact-information)
   
---

## Technologies Used

### Frontend

- FFmpeg
- React
- Vite
- Stripe API
- OpenAI API
- Firebase Firestore
- Firebase Authentication
- Firebase Storage

### Backend

- Node
- Express
- Firebase Functions
- REST

### Machine Learning

- Tensorflow
- Python
- Numpy
- Pandas
- Firebase ML Integration
  
---

## Key Achievements

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

[Include a brief description of how FFMPEG was used in your project and the specific functionalities it provides.]
Code Here : https://github.com/orbant12/Node-Express-Clippify/blob/main/src/assets/videoTrim/videoApp.jsx
All Video Trimming Components : https://github.com/orbant12/Node-Express-Clippify/tree/main/src/assets/videoTrim

### 2. Self-trained Neural Network for Video Transcript Extraction

[Provide an overview of the neural network you built, its architecture, and how it is utilized for video transcript extraction.]
Jupiter Notebook: https://github.com/orbant12/Automatic_Speech_Recognition-CNN

### 3. OpenAI API Implementation

[Explain the integration of the OpenAI API and how it enhances the project's capabilities, particularly in the development of the ChatBot.]
Code Here: https://github.com/orbant12/Node-Express-Clippify/blob/main/functions/src/index.ts

### 4. Authentication and User Data Flow with Firebase

[Detail the implementation of user authentication and data flow using Firebase, emphasizing security measures and user management.]
Context: https://github.com/orbant12/Node-Express-Clippify/blob/main/src/context/UserAuthContext.jsx
Login: https://github.com/orbant12/Node-Express-Clippify/blob/main/src/pages/SignIn.jsx
Registration: https://github.com/orbant12/Node-Express-Clippify/blob/main/src/pages/Login.jsx

### 5. Live Database with Firebase Changes on Snapshot

[Describe the real-time database synchronization feature and its significance in providing users with up-to-date information.]

### 6. Lexical Editor for Rich Text Editor State Management

[Discuss the purpose and functionality of the lexical editor, emphasizing its role in managing rich text editor states.]
Code Here: https://github.com/orbant12/Node-Express-Clippify/blob/main/src/assets/File/txtEditor/txtEditor.jsx

### 7. Stripe API Integration

[Provide insights into the integration of the Stripe API, its setup, and how it facilitates payment processing and information storage.]
Code Here: https://github.com/orbant12/Node-Express-Clippify/tree/main/src/assets/Subscription

### 8. CSS Styling

[Provide insights into the integration of the Stripe API, its setup, and how it facilitates payment processing and information storage.]
Code Here : https://github.com/orbant12/Node-Express-Clippify/tree/main/src/Css
Theme Switch: https://github.com/orbant12/Node-Express-Clippify/blob/main/src/App.jsx

### 9. Own Policies and Terms of Use

[Explain the development and implementation of custom policies and terms of use, underlining the commitment to legal and ethical standards.]
Code Here: https://github.com/orbant12/Node-Express-Clippify/tree/main/src/pages/Policies

---

## Problems and Solutions

### 1. ASR Network only accept mp3 / wav files

To solve this problem, I needed to convert a copy of the mp4 to mp3 and upload it to the storage as two seperate files with the same ID (ID.mp4, ID.mp3). For this solution I have made the storage architecture so every user has his own file named with his UID with these inside - userID/FolderID/FileID/ where ID.mp4, ID.mp3, ID.transcript will take place.

### 2. CORS Isolation for SharedArrayBuffer 

After considering the limitations, I have decided to use CORS Isolation to be able to use FFmpeg for trimming, converting, timeline bar and thubnail extraction.

### 3. CORS Isolated Storage Access

Google Console

### 4. Rich Text Editor State Extraction for Cross Platform Accessability

Implemented secure user authentication and managed data flow using Firebase, ensuring a robust and scalable user management system.

---

## Usage and Demos

1. **You can access the software:**
- https://clippify.net
- https://github.com/orbant12/Node-Express-Clippify.git

2. **You will need:**
- Create a Clippify Account

---

## Contact Information

[Provide your contact information or ways in which interested parties can reach out to you for further inquiries or collaboration.]

--- 

Thank you for exploring [Your Project Name]! I hope this README provides a comprehensive understanding of the project and my capabilities as a tech professional. If you have any questions or need further clarification, feel free to reach out.

[Your Name]  
[Your Email]  
[Your LinkedIn or other relevant profiles]
