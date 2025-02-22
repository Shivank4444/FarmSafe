import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getnote, editnote } = context;
  useEffect(() => {
  if(localStorage.getItem('token')){
      getnote();
    }else{
      navigate("/login");
    }//eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({id:"",name:"", crop:"", Phone:"",Qty:"",Price:""});
  const handleClick = (e) => {
    refClose.current.click();
    editnote(note.id,note.name, note.crop, note.Phone,note.Qty,note.Price);
    props.showAlert("Note Updated Successfully","Success")

}

const onchange = (e)=> {
    setNote({...note, [e.target.name]: e.target.value})

}

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, name:currentNote.name, crop:currentNote.crop, Phone:currentNote.Phone,Qty:currentNote.Qty,Price:currentNote.Price});
  };


  return (
    <>
      <button
        type="button"
        style={{ display: "none" }}
        ref={ref}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="name" className="form-label" style={{color:"black"}}>
                    Name
                  </label>
                  <input
                  style={{color:"black"}}
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={onchange}
                    minLength={5}
                    required
                    value={note.name}
                  />
                </div>
                <div className="mb-3">
                  <label  style={{color:"black"}} for="crop" className="form-label" >
                    crop
                  </label>
                  <input
                  style={{color:"black"}}
                    type="text"
                    className="form-control"
                    id="crop"
                    name="crop"
                    onChange={onchange}
                    minLength={5}
                    required
                    value={note.crop}
                  />
                </div>
                <div className="mb-3">
                  <label for="Phone" className="form-label" style={{color:"black"}}>
                    Phone
                  </label>
                  <input
                    style={{color:"black"}}
                    type="text"
                    className="form-control"
                    id="Phone"
                    name="Phone"
                    onChange={onchange}
                    required
                    value={note.Phone}
                  />
                </div>
                <div className="mb-3">
                  <label for="Qty" className="form-label" style={{color:"black"}}>
                    Qty
                  </label>
                  <input
                    style={{color:"black"}}
                    type="text"
                    className="form-control"
                    id="Qty"
                    name="Qty"
                    onChange={onchange}
                    required
                    value={note.Qty}
                  />
                </div>
                <div className="mb-3">
                  <label for="Price" className="form-label" style={{color:"black"}}>
                    Price
                  </label>
                  <input
                    style={{color:"black"}}
                    type="text"
                    className="form-control"
                    id="Price"
                    name="Price"
                    onChange={onchange}
                    required
                    value={note.Price}
                  />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddNote showAlert={props.showAlert} />
      <div className="row my-3">
        <h1 className="my-3">Your Listings</h1>
        <div className="container mx-1">
        <h4>{notes.length===0 && "No listing to display"}</h4>
        </div>
        
        {Array.isArray(notes) && notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
