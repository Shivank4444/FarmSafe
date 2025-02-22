import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export default function AddNote(props) {
    const context = useContext(noteContext);
    
    const { addnote } = context;
    const [note, setNote] = useState({name:"", crop:"", Phone:"",Qty:"",Price:""})
    const handleClick = (e) => {
        e.preventDefault();
        addnote(note.name, note.crop, note.Phone,note.Qty,note.Price);
        setNote({name:"", crop:"", Phone:"",Qty:"",Price:""})
        props.showAlert("Noted added successfully","success")
    }
    
    const onchange = (e)=> {
        setNote({...note, [e.target.name]: e.target.value})

    }

    return (
    <>
    <h1 className = "my-3">Add Listing</h1>
  <div className='conatiner my-3'>
    <form>
  <div className="mb-3">
    <label for="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" value={note.name}  name="name" onChange={onchange} minLength={2} required/>
  </div>
  <div className="mb-3">
    <label for="crop" className="form-label">Crop</label>
    <input type="text" className="form-control" id="crop" value={note.crop} name="crop" onChange={onchange} required/>
  </div>
  <div className="mb-3">
    <label for="Phone" className="form-label">Phone</label>
    <input type="number" className="form-control" id="Phone" value={note.Phone} name="Phone" onChange={onchange} minLength={5} required/ >
  </div>
  <div className="mb-3">
    <label for="Qty" className="form-label">Qty</label>
    <input type="number" className="form-control" id="Qty" value={note.Qty} name="Qty" onChange={onchange} required/ >
  </div>
  <div className="mb-3">
    <label for="Price" className="form-label">Price</label>
    <input type="number" className="form-control" id="Price" value={note.Price} name="Price" onChange={onchange}  required/ >
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
</div>
</>
  )
}
