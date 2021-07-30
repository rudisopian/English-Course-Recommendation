const axios = require('axios');

/*===================================
**===== U S E R S  R E N D E R ======
*===================================*/
// HOMEPAGE
exports.home = (req, res) =>{
    res.render('home');
}
// Try
exports.smoothies = (req, res) =>{
    res.render('smoothies');
}
exports.indexRoutes = (req, res) => {
    req.session.isAuth = true,
    // Make a get request to /api/courses
    axios.get('http://localhost:5000/api/courses')
        .then(function(response){
            res.render('index', { courses : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}
exports.course = (req, res) => {
    // Make a get request to /api/courses
    axios.get('http://localhost:5000/api/courses')
        .then(function(response){
            res.render('index', { courses : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}
// ASSESSMENT
exports.assessment = (req, res) => {
    axios.get('http://localhost:5000/api/subcriterias')
        .then(function(response){
            var listeningSub = response.data.filter(function(obj) {
                return (obj.criteriaId.name === "Listening");
            });
            var readingSub = response.data.filter(function(obj) {
                return (obj.criteriaId.name === "Reading");
            });
            var spokenInteractionSub = response.data.filter(function(obj) {
                return (obj.criteriaId.name === "Spoken Interaction");
            });
            var spokenProductionSub = response.data.filter(function(obj) {
                return (obj.criteriaId.name === "Spoken Production");
            });
            var writingSub = response.data.filter(function(obj) {
                return (obj.criteriaId.name === "Writing");
            });
            res.render('assessment', { 
                subcriterias : response.data, 
                listeningSC : listeningSub, 
                readingSC: readingSub, 
                spokenInteractionSC: spokenInteractionSub, 
                spokenProductionSC: spokenProductionSub,
                writingSC: writingSub
            });
        })
        .catch(err =>{
            res.send(err);
        })
}

/*===================================
**===== A D M I N  R E N D E R ======
*===================================*/
// DASHBOARD
exports.dashboardRoutes = (req, res) =>{
    res.render('./admin/dashboard');
}
// CRITERIA
exports.criteriaRoutes = (req, res) => {
    // Make a get request to /api/criteria
    axios.get('http://localhost:5000/api/criterias')
        .then(function(response){
            res.render('./admin/criteria', { criterias : response.data });
        })
        .catch(err =>{
            res.send(err);
        })  
}
exports.add_criteria = (req, res) =>{
    res.render('./admin/add_criteria');
}
exports.update_criteria = (req, res) =>{
    axios.get('http://localhost:5000/api/criterias', { params : { id : req.query.id }})
        .then(function(criteriadata){
            res.render("./admin/update_criteria", { criteria : criteriadata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
// SUBCRITERIA
exports.subcriteriaRoutes = (req, res) => {
    // Make a get request to /api/subcriteria
    axios.get('http://localhost:5000/api/subcriterias')
        .then(function(response){
            res.render('./admin/subcriteria', { subcriterias : response.data });
        })
        .catch(err =>{
            res.send(err);
        })  
}
exports.add_subcriteria = (req, res) =>{
    axios.get('http://localhost:5000/api/criterias')
        .then(function(response){
            res.render('./admin/add_subcriteria', { criterias : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}
exports.update_subcriteria = (req, res) =>{
    axios.get('http://localhost:5000/api/subcriterias', { params : { id : req.query.id }})
        .then(function(subcriteriadata){
            res.render("./admin/update_subcriteria", { subcriteria : subcriteriadata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
// COURSES
exports.courseRoutes = (req, res) => {
    // Make a get request to /api/courses
    axios.get('http://localhost:5000/api/courses')
        .then(function(response){
            res.render('./admin/course', { courses : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}
exports.add_course = (req, res) =>{
    axios.get('http://localhost:5000/api/subcriterias')
        .then(function(response){
            var listeningSub = response.data.filter(function(obj) {
                return (obj.criteriaId.name === "Listening");
            });
            var readingSub = response.data.filter(function(obj) {
                return (obj.criteriaId.name === "Reading");
            });
            var spokenInteractionSub = response.data.filter(function(obj) {
                return (obj.criteriaId.name === "Spoken Interaction");
            });
            var spokenProductionSub = response.data.filter(function(obj) {
                return (obj.criteriaId.name === "Spoken Production");
            });
            var writingSub = response.data.filter(function(obj) {
                return (obj.criteriaId.name === "Writing");
            });
            res.render('./admin/add_course', { 
                subcriterias : response.data, 
                listeningSC : listeningSub, 
                readingSC: readingSub, 
                spokenInteractionSC: spokenInteractionSub, 
                spokenProductionSC: spokenProductionSub,
                writingSC: writingSub
            });
        })
        .catch(err =>{
            res.send(err);
        })
    //res.render('./admin/add_course');
}
exports.update_course = (req, res) =>{
    axios.get('http://localhost:5000/api/courses', { params : { id : req.query.id }})
        .then(function(coursedata){
            res.render("./admin/update_course", { course : coursedata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
// Users
exports.userRoutes = (req, res) => {
    // Make a get request to /api/user
    axios.get('http://localhost:5000/api/users')
        .then(function(response){
            res.render('./admin/user', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })  
}
exports.add_user = (req, res) =>{
    res.render('./admin/add_user');
}
exports.update_user = (req, res) =>{
    axios.get('http://localhost:5000/api/users', { params : { id : req.query.id }})
        .then(function(criteriadata){
            res.render("./admin/update_user", { user : criteriadata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}