import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const {deletenote} = context;
    const {note, updateNote} = props;
  return (
    
    <div className='col-md-3'>
    <div className="card my-3" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{note.name}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{note.date.split("T")[0]}</h6>
    <p className="card-text">{note.crop}</p>
    <p className="card-text">Contact - {note.Phone}</p>
    <p className="card-text">Qty - {note.Qty}</p>
    <span className="card-text">Price - {note.Price}</span>
    <i className="fa-solid fa-pen-to-square mx-2"  style={{cursor:"pointer"}} onClick={()=>{updateNote(note)}}></i>
    <i className="fa-solid fa-trash" style={{cursor:"pointer"}} onClick={()=>{deletenote(note._id)
      props.showAlert("Noted deleted successfully", "success")
    }}></i>
  </div>
  </div>
</div>

  )
}
