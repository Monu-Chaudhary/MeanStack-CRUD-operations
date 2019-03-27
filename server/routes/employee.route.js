const express = require('express');
// const app = express();
const employeeRoutes = express.Router();


//require employee model in our routes model
let Employee = require('../models/Employee');
let Department = require('../models/Department');

//defined store route
employeeRoutes.route('/employee/add').post(function (req, res) {
    let employee = new Employee({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        department: req.body.department
    });

    employee.save()
        .then(employee => {
            res.status(200).json({ 'employee': 'employee is added successfully' });
            // res.redirect('/employee');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//defined get data(index or listing) route
employeeRoutes.route('/employee').get(function (req, res, next) {

    // console.log("HERE");
    
    if (req.query.page == undefined) {
        req.query.page = 1;
    }
    if (req.query.size == undefined) {
        req.query.size = 12;
    }
    // if(req.query.sort == undefined){
    //     req.query.sort = '';
    // }
    if(req.query.fname == undefined){
        req.query.fname = '[a-z]*';
    }
    if(req.query.fgender == undefined || req.query.fgender == ''){
        req.query.fgender = '[a-z]*';
    }
    if(req.query.drpdnDepartment == undefined || req.query.drpdnDepartment == ''){
        req.query.drpdnDepartment = '[1-9 a-z]*';
    }
    

    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    var sort = (req.query.sort);
    var fname = req.query.fname;
    var fgender = req.query.fgender;
    var fdepartment = req.query.drpdnDepartment;
    var query = {};

    // console.log("sort::", sort);

    if (page < 0 || page === 0) {

        response = { "error": true, "message": "invalid page number, should start witl 1" };
        return res.json(response);
    }
    query.skip = size * (page - 1);
    query.limit = size;
    query.sort = sort;
    // query.fnamer = fname;
    // query.fgender = fgender;

    console.log("department",fdepartment, "fname: ", fgender);
    
    //find some documents
    Employee.find({name: new RegExp("^"+ fname, "i"), gender: new RegExp("^"+ fgender, "i"), department: (fdepartment)}).populate('department').skip(query.skip).collation({locale:'en'}).sort(query.sort).limit(query.limit).exec((err, EmployeeObjects)=>{
        Employee.count().exec(function(err, count){
            if(err) return next(err)
            let data = {
                count : count,
                data: EmployeeObjects, 
                page: page
            };
            res.json(data);
        })
    })
});

//define edit route
employeeRoutes.route('/employee/edit/:id').get(function (req, res) {
    // console.log('editRoute');
    let ID = req.params.id;
    // Employee.findById(id, function (err, employee) {
    //     res.json(employee);
    // });
    Employee.findOne({ _id: ID }).populate('department').exec(function (err, employee) {
        console.log("eMPLOYEE",employee);
        res.json(employee);
  });
});

//define update route
employeeRoutes.route('/employee/update/:id').post(function (req, res, next) {
    console.log(req.params,req.body);
    Employee.findById(req.params.id, function (err, employee) {
        if (!employee)
            return next(new Error('Could not load document'));
            
        else {
            // console.log("updating");
            employee.name = req.body.name;
            employee.department = req.body.department;
            employee.age = req.body.age;
            employee.gender = req.body.gender;

            employee.save().then(employee => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send('unable to update db');
                });
        }
    });
});

//define delete| remove | destroy route
employeeRoutes.route('/employee/delete/:id').get(function (req, res) {
    Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

employeeRoutes.route('/department').get(function(req, res){
    Department.find(function(err, departments){
        if(err) res.json(err);
        let data = {
            departments: departments
        }
        res.json(data);
    })
})

module.exports = employeeRoutes;