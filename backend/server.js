const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

// Test route to see if the server is alive
app.get('/', (req, res) => {
    res.send("The Kitchen is OPEN!");
});

app.get('/api/students/search', (req, res) => {
    try {
        const query = req.query.q ? req.query.q.toLowerCase() : "";
        const data = JSON.parse(fs.readFileSync('student_data.json', 'utf8'));
        const results = data.filter(s => s.name.toLowerCase().includes(query));
        res.json(results.slice(0, 5));
    } catch (error) {
        res.status(500).json({ error: "Could not read student data file" });
    }
});

app.listen(5000, () => {
    console.log("-----------------------------------------");
    console.log("SUCCESS: Server is running on port 5000");
    console.log("Try visiting: http://localhost:5000");
    console.log("-----------------------------------------");
});
module.exports = app;