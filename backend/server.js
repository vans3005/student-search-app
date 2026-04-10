const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
app.use(cors()); // This allows the frontend to talk to the backend

// Test route to see if the server is alive
app.get('/', (req, res) => {
    res.send("The Kitchen is OPEN!");
});

app.get('/api/students/search', (req, res) => {
    try {
        const query = req.query.q ? req.query.q.toLowerCase() : "";

        // 1. Correctly find the file using the "Path Map"
        const filePath = path.join(process.cwd(), 'student_data.json'); 
        
        // 2. Read the file ONCE
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        // 3. Filter the results
        const results = data.filter(s => s.name.toLowerCase().includes(query));

        // 4. Send back the top 5
        res.json(results.slice(0, 5));
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Could not read student data file" });
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
