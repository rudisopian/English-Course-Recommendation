const { Router } = require('express');
const { requireAuth, isAdmin } = require('../middleware/authMiddleware');
const services = require('../services/render')
const Auth = require('../controllers/Auth');
const criteriaController = require('../controllers/criteriaController')
const subcriteriaController = require('../controllers/subcriteriaController')
const courseController = require('../controllers/courseController');
const userController = require('../controllers/userController')
const calculateController = require('../controllers/calculation')
const calculateAdmin = require('../controllers/calculationAdmin')

const route = Router();

/*===================================
*======      RENDER PAGE      =======
*===================================*/


route.get('/', services.home)
route.get('/smoothies', requireAuth, services.smoothies)
// ASSESSMENT
route.get('/assessment', requireAuth, services.assessment)
route.get('/course', services.course)

// AUTH
route.get('/signup', Auth.signup_get);
route.post('/signup', Auth.signup_post);
route.get('/login', Auth.login_get);
route.post('/login', Auth.login_post);
route.get('/logout', Auth.logout_get);

// Dashboard
route.get('/admin', requireAuth, services.dashboardRoutes);
// CRITERIA
route.get('/admin/criterias', requireAuth, services.criteriaRoutes)
route.get('/admin/criterias/add-criteria', requireAuth, services.add_criteria)
route.get('/admin/criterias/update-criteria', requireAuth, services.update_criteria)
// SUBCRITERIA
route.get('/admin/subcriterias', requireAuth, services.subcriteriaRoutes)
route.get('/admin/subcriterias/add-subcriteria', requireAuth, services.add_subcriteria)
route.get('/admin/subcriterias/update-subcriteria', requireAuth, services.update_subcriteria)
// COURSE
route.get('/admin/courses', requireAuth, services.courseRoutes)
route.get('/admin/courses/add-course', requireAuth, services.add_course)
route.get('/admin/courses/update-course', requireAuth, services.update_course)
// USER
route.get('/admin/users', requireAuth, services.userRoutes)
route.get('/admin/users/add-user', requireAuth, services.add_user)
route.get('/admin/users/update-user', requireAuth, services.update_user)
// Calculate Admin
route.get('/admin/calculates', requireAuth, services.calculateRoutes)


/*===================================
*======     A     P     I     =======
*===================================*/

// CRITERIA
route.post('/api/criterias', criteriaController.create);
route.get('/api/criterias', criteriaController.find);
route.put('/api/criterias/:id', criteriaController.update);
route.delete('/api/criterias/:id', criteriaController.delete);
// SUBCRITERIA
route.post('/api/subcriterias', subcriteriaController.create);
route.get('/api/subcriterias', subcriteriaController.find);
route.put('/api/subcriterias/:id', subcriteriaController.update);
route.delete('/api/subcriterias/:id', subcriteriaController.delete);
// COURSE
route.post('/api/courses', courseController.create);
route.get('/api/courses', courseController.find);
route.put('/api/courses/:id', courseController.update);
route.delete('/api/courses/:id', courseController.delete);
// USER
route.post('/api/users', userController.create);
route.get('/api/users', userController.find);
route.put('/api/users/:id', userController.update);
route.delete('/api/users/:id', userController.delete);

route.post('/api/calculate', calculateController.calculateUser)
route.get('/api/calculateAdmin', calculateAdmin.calculateAdmin)

module.exports = route;