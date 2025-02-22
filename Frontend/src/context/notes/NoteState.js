import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://agri-server-vfai.onrender.com/"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Add a Note
  const addnote = async (name, crop, Phone,Qty,Price) => {
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
     body: JSON.stringify({name, crop, Phone,Qty,Price})});

    const note = {
      name: name,
      crop: crop,
      Phone: Phone,
      Qty:Qty,
      Price:Price,
      date:'2024-05-24T19:13:42.440+00:00'
      }
    setNotes(notes.concat(note));
  };

  //Get notes method
  const getnote = async () => {
    const response = await fetch(`${host}api/notes/fetchallnotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json)
}


  //Delete a Note
  const deletenote = async (id) => {
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    let newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes);

  };

  //Edit a note
  const editnote = async (id, name, crop, Phone, Qty, Price) => {
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({name, crop, Phone,Qty, Price})});
     let newnotes = JSON.parse(JSON.stringify(notes))
  
    for(let index=0;index<newnotes.length;index++){
      const element = newnotes[index];
      if(element._id === id){
        newnotes[index].name = name;
        newnotes[index].crop = crop;
        newnotes[index].Phone = Phone;
        newnotes[index].Qty = Qty;
        newnotes[index].Price = Price;
        break;
      }
    }console.log(newnotes)
    setNotes(newnotes);
  };

  // Fetch all listings
  const fetchAllListings = async () => {
    const response = await fetch(`${host}api/notes/fetchalllistings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };



  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnote,fetchAllListings}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
