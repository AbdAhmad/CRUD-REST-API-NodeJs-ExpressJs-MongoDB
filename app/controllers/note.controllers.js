const Note = require('../models/note.model.js');

exports.create = (req, res) => {
    // Validate request
    if(!req.body.content){
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    // Create a note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });

    // Save note in the database
    note.save()
        .then(data => {
            res.send(data);
        }).catch(err =>{
            res.status(500).send({
                message: err.message || "Some error occurred while creating the note."
            });
        });
};

exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the note."
        });
    });
};

exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if(!note){
                return res.status(404).send({
                    message: "Note not found with Id" + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404).send({
                    message: "Note not found with Id" + req.params.noteId
                })
            }
            return res.status(500).send({
                message: "Note not found with Id" + req.params.noteId
            });
        });
};

exports.update = (req, res) => {
    if(!req.body.content){
        return res.status(400).send({
            message: "Note content cannot be empty"
        });
    }

    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note){
            return res.status(404).send({
                message: "Note not found with Id " + req.params.noteId 
            })
        }
        res.send(note)
    })
    .catch(err => {
        if(err.kind === "ObjectId"){
            return res.status(404).send({
                message: "Note not found with Id" + req.params.noteId
            })
        }
        return res.status(500).send({
            message: "Note updating note with Id" + req.params.noteId
        });
    });

};

exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if(!note){
                return res.status(404).send({
                    message: "Note not found"
                })
            }
            res.send({
                message: "Note deleted successfully"
            })
        })
        .catch(err => {
            if(!err.kind === "ObjectId" || err.name === "Not Found"){
                return res.status(404).send({
                    message: "Note not found with this id " + noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + noteId
            });
        });
};