import React, { useState, useEffect } from 'react';

// Helper function for the Bonus: Text Highlighting [cite: 37]
const formatName = (fullName, query) => {
  if (!query) return fullName;
  const parts = fullName.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index} style={{ fontWeight: 'bold', backgroundColor: 'yellow' }}>{part}</mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // REQUIREMENT: Only trigger after 3 characters (Lazy Loading) [cite: 14, 15, 30]
    // BONUS: Debounce function (using a 400ms timer) [cite: 38, 47]
    const timer = setTimeout(() => {
      if (query.length >= 3) {
        fetch(`https://student-search-app-vert.vercel.app/api/students/search?q=${query}`)
          .then(res => res.json())
          .then(data => setSuggestions(data))
          .catch(err => console.error("API Error:", err));
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f4f7f6'
    }}>
      <h1 style={{ color: '#333' }}>Student Search</h1>
      
      {/* Search Bar Container [cite: 13, 26, 27] */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Search by name (min 3 chars)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            fontSize: '16px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            boxSizing: 'border-box'
          }}
        />

        {/* Dropdown Suggestions [cite: 14, 16] */}
        {suggestions.length > 0 && (
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: '5px 0 0 0',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fff',
            width: '100%',
            position: 'absolute',
            zIndex: 10,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            {suggestions.map((student) => (
              <li 
                key={student.rollNumber} 
                onClick={() => {
                  setSelectedStudent(student);
                  setSuggestions([]);
                  setQuery('');
                }}
                style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
              >
                {formatName(student.name, query)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Full Details Display [cite: 17, 26] */}
      {selectedStudent && (
        <div style={{
          marginTop: '30px',
          padding: '25px',
          borderRadius: '12px',
          backgroundColor: '#fff',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h2 style={{ marginTop: 0, color: '#007bff' }}>Student Profile</h2>
          <p><strong>Name:</strong> {selectedStudent.name}</p>
          <p><strong>Class:</strong> {selectedStudent.class}</p>
          <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
        </div>
      )}
    </div>
  );
}

export default App;
