var Course = require('../models/courseModel');

// create and save new course
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new course
    const course = new Course({
        name : req.body.name,
        description : req.body.description,
        listeningId: req.body.listeningId,
        readingId: req.body.readingId,
        spokenInteractionId: req.body.spokenInteractionId,
        spokenProductionId: req.body.spokenProductionId,
        writingId: req.body.writingId,
    })

    // save course in the database
    course
        .save(course)
        .then(data => {
            //res.send(data)
            res.redirect('/admin/courses');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}
// retrieve and return all courses/ retrive and return a single course
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Course.findById(id).populate('listeningId readingId spokenInteractionId spokenProductionId writingId')
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found course with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving course with id " + id})
            })

    }else{
        Course.find().populate('listeningId readingId spokenInteractionId spokenProductionId writingId')
            .then(course => {
                res.send(course)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving course information" })
            })
    }

    
}
// Update a new idetified course by course id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Course.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update course with ${id}. Maybe course not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update course information"})
        })
}
// Delete a course with specified course id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Course.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Course was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Course with id=" + id
            });
        });
}