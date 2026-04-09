# Student Search Application

This is a single-page application that allows users to search for students from a database. 
It features a search bar that only starts working after you type 3 letters to keep it fast and efficient.

## How to Setup and Run

### 1. Backend (The Server)
* Open your terminal and go to the backend folder: `cd backend` 
* Install the necessary tools: `npm install`
* Start the server: `node server.js` 
* The server will run on: `http://localhost:5000`

### 2. Frontend (The Website)
* Open a second terminal and go to the frontend folder: `cd frontend` 
* Install the necessary tools: `npm install`
* Start the website: `npm start` 
* The website will open at: `http://localhost:3000`

## Key Features
* **Lazy Loading**: Search only triggers after typing 3 characters.
* **RESTful API**: Built with Node.js to serve student data from a JSON file.
* **Case-Insensitive**: Searching for "jas" will find "Jaspreet".
* **Text Highlighting**: The matching part of the name is highlighted in the results.
* **Debouncing**: Optimized API calls to save server resources.