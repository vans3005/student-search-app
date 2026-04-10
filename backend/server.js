const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors()); // This allows the frontend to talk to the backend

// Test route to see if the server is alive

app.get('/api/students/search', (req, res) => {
    try {
        const query = req.query.q ? req.query.q.toLowerCase() : "";

        // 1. Use __dirname to find the file in the same folder as this script
        const filePath = path.join(__dirname, 'student_data.json'); 
        
        // 2. Read the file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        // 3. Filter
        const results = data.filter(s => s.name.toLowerCase().includes(query));

        res.json(results.slice(0, 5));
    } catch (error) {
        console.error("Detailed Error:", error); // This helps you see the real error in Vercel Logs
        res.status(500).json({ error: "Could not read student data file", message: error.message });
    }
});

// Keep this for local testing, but wrap it so Vercel ignores it
if (process.env.NODE_ENV !== 'production') {
    app.listen(5000, () => {
        console.log("Server running locally on port 5000");
    });
}


// THIS IS THE MOST IMPORTANT LINE FOR VERCEL
module.exports = app;
