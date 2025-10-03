import React, { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes
  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error(err));
  }, []);

  // Add new note
  const addNote = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);  // update state
    setTitle("");
    setContent("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial" }}>
      <h1>Notely Notes</h1>

      {/* Add Note Form */}
      <form onSubmit={addNote} style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <textarea 
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 15px" }}>Add Note</button>
      </form>

      {/* Display Notes */}
      {notes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        notes.map(note => (
          <div key={note._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
