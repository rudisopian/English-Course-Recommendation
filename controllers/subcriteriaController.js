const Subcriteria = require('../models/subcriteriaModel');

// create and save new subcriteria
exports.create = async (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new subcriteria
    const subcriteria = new Subcriteria({
        name: req.body.name,
        weight: req.body.weight,
        criteriaId : req.body.criteriaId
    })
    // save subcriteria in the database
    subcriteria
        .save(subcriteria)
        .then(data => {
            //res.send(data)
            res.redirect('/admin/subcriterias');
            console.log(subcriteria)
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}
// retrieve and return all subcriterias/ retrive and return a single subcriteria
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Subcriteria.findById(id).populate('criteriaId')
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found subcriteria with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving subcriteria with id " + id})
            })

    }else{
        Subcriteria.find().populate('criteriaId')
            .then(subcriteria => {
                res.send(subcriteria)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving subcriteria information" })
            })
    }

    
}
// Update a new idetified subcriteria by subcriteria id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Subcriteria.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update subcriteria with ${id}. Maybe subcriteria not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update subcriteria information"})
        })
}
// Delete a subcriteria with specified subcriteria id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Subcriteria.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "subcriteria was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete subcriteria with id=" + id
            });
        });
}