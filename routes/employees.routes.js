const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.controllers');


router.get('/employees', EmployeeController.getAll);

router.get('/employees/random', EmployeeController.getRandom);

router.get('/employees/:id', EmployeeController.getById );

router.post('/employees', EmployeeController.postOne);

router.put('/employees/:id', EmployeeController.changeOne);

router.delete('/employees/:id', EmployeeController.deleteOne);


module.exports = router;
