const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');

// ROUTE 1: Get all the notes using: GET "api/notes/fetchallnotes"
router.get('/fetchallnotes',fetchuser, async (req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error ");
    }
})

// ROUTE 2: Add the notes using: POST "api/notes/addnote" Login required
router.post('/addnote',fetchuser,[
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'description should be atlest 5 characters').isLength({ min: 5 }) ], async (req, res)=>{
    try {
        
    
    const {title, description, tag} = req.body;    
     //  Errors and bad request are written
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     const note = new Notes({
         title, description, tag, user : req.user.id 
     })
     const savedNote = await note.save()
     res.json(savedNote);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error ");
    }
})

// ROUTE 3:Update the existing note using: PUT "api/notes/updatenote" Login required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;

    try {

    // Create a newNote Object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error ");
    }
    
 })    


// ROUTE 3:delete the existing note using: DELETE "api/notes/updatenote" Login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {
    
    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been Deleted", note: note});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error ");
    }
    
 })    
        
module.exports = router;


