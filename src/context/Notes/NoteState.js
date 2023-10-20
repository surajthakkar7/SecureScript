import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://securescriptbackend.onrender.com";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all Notes
  const getNotes = async () => {
    const authToken = localStorage.getItem("token");
    //  console.log("Auth Token:", authToken);

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    const json = await response.json();
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const deletedNote = await response.json();
        console.log(deletedNote);
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
      } else {
        // Handle error if the delete request fails
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("An error occurred while deleting the note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ id, title, description }),
      });
      if (response.ok) {
        const updatedNote = await response.json();
        console.log("Updated Note:", updatedNote);

        const updatedNotes = notes.map((note) =>
          note._id === id ? updatedNote : note
        );

        setNotes(updatedNotes);
      } else {
        // Handle error if the update request fails
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("An error occurred while updating the note:", error);
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
