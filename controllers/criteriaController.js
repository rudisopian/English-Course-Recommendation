var Criteria = require('../models/criteriaModel');

// create and save new criteria
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new criteria
    const criteria = new Criteria({
        name : req.body.name,
        weight : req.body.weight
    })

    // save criteria in the database
    criteria
        .save(criteria)
        .then(data => {
            //res.send(data)
            res.redirect('/admin/criterias');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}
// retrieve and return all criteria/ retrive and return a single criteria
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Criteria.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found criteria with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving criteria with id " + id})
            })

    }else{
        Criteria.find()
            .then(criteria => {
                res.send(criteria)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}
// Update a new idetified criteria by criteria id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Criteria.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update criteria with ${id}. Maybe criteria not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })

}
// Delete a user with specified criteria id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Criteria.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Criteria was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete criteria with id=" + id
            });
        });
}