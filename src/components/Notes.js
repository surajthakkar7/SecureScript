/* global bootstrap */

import noteContext from "../context/Notes/noteContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  // console.log("Notes:", notes);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
  });
  useEffect(() => {
    const myModal = new bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    ref.current.addEventListener("click", () => myModal.show());
  }, []);
  const updateNote = (currentNote) => {
    console.log(currentNote);

    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription);
    // refClose.current.click();
    const modalElement = document.getElementById("exampleModal");
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.hide(); // This should close the modal
    props.showAlert("Note Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Update Note Modal Button
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {" "}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={1}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                ref={refClose}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes
            ? notes.length === 0
              ? "No Notes to Display"
              : notes.map((note) => (
                  <Noteitem
                    key={note._id}
                    updateNote={updateNote}
                    showAlert={props.showAlert}
                    note={note}
                  />
                ))
            : "Loading..."}
        </div>
      </div>
    </>
  );
};

export default Notes;
