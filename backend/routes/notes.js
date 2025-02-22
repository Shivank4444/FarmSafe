const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Notes= require('../models/Notes');


// ROUTE:1 - Fetching notes using POST:/api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser ,async (req,res) =>{
    try {
        const notes = await Notes.find({user:req.user})
        res.json(notes);
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Error occured");
    }
})

// ROUTE:2 - Creatingg notes using POST:/api/notes/addnote

router.post('/addnote',fetchuser ,[
    body('name').isLength({min:2}),

],async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {name, crop, Phone,Qty,Price} = req.body
    const userId = req.user;
    try {
        const notes = await Notes.create({
            user:userId,
            name: name,
            crop: crop,
            Phone: Phone,
            Qty:Qty,
            Price:Price,

    })
    res.json(notes)

} catch (error) {
        res.status(500).send("Error occured");
    }

})

// ROUTE:3 - Deleting notes using POST:/api/notes/deletenote
router.delete('/deletenote/:id',fetchuser ,async (req,res) => {
    
    const userId = req.user;
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Note not exist")};
        if(note.user.toString() !== userId){return res.status(401).send("Not allowed")};
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({note})

} catch (error) {
        res.status(500).send("Error occured");
    }

})


// ROUTE:4 - Editing a note using POST:/api/notes/updatenote

router.put('/updatenote/:id',fetchuser ,async (req,res) => {
    const {name, crop, Phone,Qty, Price} = req.body
    const userId = req.user;
    try {
        //Create a new note object
        const newNote = {};
        if(name){newNote.name = name}
        if(crop){newNote.crop = crop}
        if(Phone){newNote.Phone = Phone}
        if(Qty){newNote.Qty = Qty}
        if(Price){newNote.Price = Price}

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Note not exist")};
        if(note.user.toString() !== userId){return res.status(401).send("Not allowed")};
        note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true});
        res.json({note});
    

} catch (error) {
        res.status(500).send("Error occured");
    }

})

// ROUTE:5 - Fetching all listings using GET:/api/listings/fetchalllistings
router.get('/fetchalllistings',  async (req, res) => {
    try {
        const listings = await Notes.find();
        res.json(listings);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occurred");
    }
});




module.exports = router;
