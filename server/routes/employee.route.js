const express = require('express');
// const app = express();
const employeeRoutes = express.Router();
const mongoose = require('mongoose');


//require employee model in our routes model
let Employee = require('../models/Employee');
let Department = require('../models/Department');

//defined store route
employeeRoutes.route('/employee/add').post(function (req, res) {
    let employee = new Employee(req.body
        // {
        // name: req.body.name,
        // age: req.body.age,
        // gender: req.body.gender,
        // department: req.body.department
        // }
    );

    let name = req.body.name;
    let age = req.body.age;
    let gender = req.body.gender;
    let department = req.body.department;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('age', 'Age is required').notEmpty();
    req.checkBody('gender', 'Gender is required').notEmpty();
    req.checkBody('department', 'Department is required').notEmpty();

    var errors = req.validationErrors();
    // console.log("ERROR VALIDATION",errors);
    if (errors) {
        console.log("error", errors);
        req.session.errors = errors;
        req.session.success = false;
        // res.redirect('/employee');
        res.status(400).send("Validation Error!" + JSON.stringify(errors));
    }

    else {
        employee.save()
            .then(employee => {
                req.session.success = true;
                res.status(200).json('employee is added successfully');
                // res.status(200).send('Employee successfully added');
                // res.redirect('/employee');
            })
            .catch(err => {
                req.session.success = false;
                req.session.error = err;
                res.status(400).send("unable to save to database");
            });
    }

});

//defined get data(index or listing) route
employeeRoutes.route('/employee').get(function (req, res, next) {

    if (req.query.page == undefined) {
        req.query.page = 1;
    }

    if (req.query.size == undefined) {
        req.query.size = 12;
    }

    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);

    var sort = (req.query.sort);
    var fname = req.query.fname;
    var fgender = req.query.fgender;
    if (mongoose.Types.ObjectId.isValid(req.query.drpdnDepartment)){
        var fdepartment = new mongoose.Types.ObjectId(req.query.drpdnDepartment);
    }

    console.log('Department \t' + fdepartment + "\t" + typeof(fdepartment) + "\t" + mongoose.Types.ObjectId.isValid(req.query.drpdnDepartment) + " \n Req department \t"+ req.query.drpdnDepartment);
    var query = {};

    if (page < 0 || page === 0) {

        response = { "error": true, "message": "invalid page number, should start witl 1" };
        return res.json(response);
    }
    query.skip = size * (page - 1);
    query.limit = size;
    query.sort = sort;


    filter = {};
    filter.$and = [];
    if (req.query.fname && req.query.fname !== 'undefined') {
        filter.$and.push(
            {
                name: { '$regex': '(?i)' + fname + '.*' }
            }
        );
    }
    if (req.query.fgender && req.query.fgender !== 'undefined') {
        filter.$and.push(
            {
                gender: { $regex: fgender, $options: 'i' }
            }
        );
    }
    if (req.query.drpdnDepartment && req.query.drpdnDepartment !== 'undefined') {
        filter.$and.push(
            {
                // department: fdepartment
                // department: mongoose.Types.ObjectId("5c99c53b5239d6f1d8245f3b")
                $eq: ['$department', fdepartment]
            }
        );
    }

    console.log(filter);

    Employee.aggregate([
        { $match: {
            $expr: filter
        } },
        {
            $lookup: {
                from: 'department', localField: 'department', foreignField: '_id', as: 'department' },
        },
        { "$unwind": "$department" },
    ]).exec( (err, EmployeeObjects) => {
        console.log("EmployeeObjects", EmployeeObjects);

        let data = {
            count: 12,
            data: EmployeeObjects,
            page: page
        };
        res.json(data);
    });



    // query.filter = [];
    // if (req.query.fname && req.query.fname !== 'undefined') {
    //     query.filter = [{
    //         // name: { '$regex': '(?i)' + fname + '.*' }

    //         name: new RegExp("^" + fname, "i")
    //     }];
    // }
    // if (req.query.fgender && req.query.fgender !== 'undefined') {
    //     query.filter.push({ gender: new RegExp("^" + fgender, "i") })
    // }
    // if (req.query.drpdnDepartment && req.query.drpdnDepartment !== 'undefined') {
    //     query.filter.push({ department: fdepartment })
    // }
    // if (query.filter.length != 0) {
    //     query.find = { $and: query.filter }
    // }

    // console.log("HII",query.filter);
    // //find some documents
    // Employee.find(filter).populate('department').skip(query.skip).collation({ locale: 'en' }).sort(query.sort).limit(query.limit).exec((err, EmployeeObjects) => {
    //     Employee.count().exec(function (err, count) {
    //         if (err) return next(err)
    //         console.log("EmployeeObjects", EmployeeObjects);
    //         let data = {
    //             count: count,
    //             data: EmployeeObjects,
    //             page: page
    //         };
    //         res.json(data);
    //     })
    // })



});

//define edit route
employeeRoutes.route('/employee/edit/:id').get(function (req, res) {
    // console.log('editRoute');
    let ID = req.params.id;
    // Employee.findById(id, function (err, employee) {
    //     res.json(employee);
    // });
    Employee.findOne({ _id: ID }).populate('department').exec(function (err, employee) {
        // console.log("eMPLOYEE",employee);
        res.json(employee);
    });
});

//define update route
employeeRoutes.route('/employee/update/:id').post(function (req, res, next) {
    console.log(req.params, req.body);
    Employee.findById(req.params.id, function (err, employee) {

        let name = req.body.name;
        let age = req.body.age;
        let gender = req.body.gender;
        let department = req.body.department;

        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('age', 'Age is required').notEmpty();
        req.checkBody('gender', 'Gender is required').notEmpty();
        req.checkBody('department', 'Department is required').notEmpty();

        var errors = req.validationErrors();
        // console.log("ERROR VALIDATION",errors);
        if (errors) {
            console.log("error", errors);
            req.session.errors = errors;
            req.session.success = false;
            // res.redirect('/employee');
            res.status(400).send("Validation Error!");
        }
        else if (!employee)
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

employeeRoutes.route('/department').get(function (req, res) {
    Department.find(function (err, departments) {
        if (err) res.json(err);
        let data = {
            departments: departments
        }
        res.json(data);
    })
})

module.exports = employeeRoutes;