import React from "react";

function NoteCard({ note }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
}

export default NoteCard;
