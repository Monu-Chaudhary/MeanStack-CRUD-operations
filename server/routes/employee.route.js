const express = require('express');
// const app = express();
const employeeRoutes = express.Router();
const mongoose = require('mongoose');


//require employee model in our routes model
let Employee = require('../models/Employee');
let Department = require('../models/Department');

//defined store route
employeeRoutes.route('/employee/add').post(function (req, res) {
    let employee = new Employee(req.body);

    let name = req.body.name;
    let age = req.body.age;
    let gender = req.body.gender;
    let department = req.body.department;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('department', 'Department is required').notEmpty();
    req.checkBody('age', 'Age is required').notEmpty();
    req.checkBody('gender', 'Gender is required').notEmpty();

    var errors = req.validationErrors();
    var message = [];
    // console.log("ERROR VALIDATION",errors);
    if (errors) {
        console.log("error", errors);
        // req.session.errors = errors;
        // req.session.success = false;
        errors.forEach(error => {
            message.push(error);
            console.log('error', error.msg);
        });
        console.log(message);
        res.status(400).send({ success: false, msg: message });

    }

    else {
        employee.save()
            .then(employee => {
                req.session.success = true;
                res.status(200).json({ success: true, msg: 'Employee is added successfully' });
                // res.status(200).send('Employee successfully added');
                // res.redirect('/employee');
            })
            .catch(err => {
                req.session.success = false;
                req.session.error = err;
                res.status(400).send({ success: false, msg: "unable to save to database" });
            });
    }

});

//defined get data(index or listing) route
employeeRoutes.route('/employee').get(function (req, res, next) {

    if (req.query.page == undefined) {
        req.query.page = 1;
    }

    if (req.query.size == undefined) {
        req.query.size = 10;
    }

    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);

    // var sort = (req.query.sort);
    var fname = req.query.fname;
    var fgender = req.query.fgender;
    if (mongoose.Types.ObjectId.isValid(req.query.drpdnDepartment)) {
        var fdepartment = new mongoose.Types.ObjectId(req.query.drpdnDepartment);
    }

    // console.log('Department \t' + fdepartment + "\t" + typeof (fdepartment) + "\t" + mongoose.Types.ObjectId.isValid(req.query.drpdnDepartment) + " \n Req department \t" + req.query.drpdnDepartment);
    var query = {};

    if (page < 0 || page === 0) {

        response = { "error": true, "message": "invalid page number, should start witl 1" };
        return res.json(response);
    }
    query.skip = size * (page - 1);
    query.limit = size;
    // query.sort = sort;

    // console.log("SORT", req.query.sort);

    let sort;
    sort = {};
    $or = [];

    console.log("ORDER \t", req.query.order);
    if ((req.query.sort && req.query.sort == 'undefined') || !req.query.sort) {
        sort['unKnown'] = 1;
    }
    else {
        if (req.query.order == "asc") sort[req.query.sort] = 1;
        else sort[req.query.sort] = -1;
    }
    // console.log("SORT{}", sort);

    // console.log("name gender dept \t", fname, fgender, fdepartment);

    filter = {};
    filter.$and = [];
    if (req.query.fname && req.query.fname !== 'undefined') {
        filter.$and.push(
            {
                name: new RegExp("^" + fname, "i")
                // name: { $regex: '(?i^)' + fname + '.*' }
                // name: {$regex: fname, $options: 'i'}
            }
        );
    }
    if (req.query.fgender && req.query.fgender !== 'undefined') {
        filter.$and.push(
            {
                gender: new RegExp("^" + fgender, "i")
                // gender: { $regex: fgender, $options: 'i' }
            }
        );
    }
    if (req.query.drpdnDepartment && req.query.drpdnDepartment !== 'undefined') {
        filter.$and.push(
            {
                // department: fdepartment
                // department: mongoose.Types.ObjectId("5c99c53b5239d6f1d8245f3b")
                $expr: { $eq: ['$department', fdepartment] }
            }
        );
    }

    if (filter.$and.length <= 0) {
        // console.log("TRUE");
        filter.$and.push({
            name: new RegExp(".*")
        })
    }

    // console.log("Filter", filter.$and);

    Employee.aggregate(
        [
            { $match: filter },
            {
                $lookup: {
                    from: 'department', localField: 'department', foreignField: '_id', as: 'department'
                },
            },
            { "$unwind": "$department" },
            { $project: {name: 1, department: 1, age: 1, gender:1, insensitive: { "$toLower": "$name"}}},
            { $sort: sort },
            { $skip: query.skip },
            { $limit: query.limit }
        ]
        // ,
        // { collation: { locale: 'en' } }
    ).exec((err, EmployeeObjects) => {
        if (err) res.json({ success: false, msg: err });
        else {
            Employee.aggregate([
                {
                    $match: filter
                },
                {
                    $facet:
                        { Count: [{ $count: "count" }] }
                },
                { $project: { 'Count.count': 1 } }
            ]).exec((err, Count) => {
                console.log("EmployeeObjects", EmployeeObjects);
                console.log("COUNT", Count[0].Count[0].count);
                let data = {
                    count: Count[0].Count[0].count,
                    // count: 7,
                    data: EmployeeObjects,
                    page: page
                };
                res.json(data);
            })
        }
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
    // Employee.find(query.find).populate('department').skip(query.skip).collation({ locale: 'en' }).sort(query.sort).limit(query.limit).exec((err, EmployeeObjects) => {
    //     Employee.count().exec(function (err, count) {
    //         if (err) return next(err)
    //         console.log("EmployeeObjects", EmployeeObjects.length);
    //         let data = {
    //             count: EmployeeObjects.length,
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
        if (err) res.send(err);
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
            // console.log("error", errors);
            // console.log("JSON",JSON.parse(JSON.stringify(errors))[0].msg);
            req.session.errors = errors;
            req.session.success = false;
            // res.redirect('/employee');
            res.status(400).json({ success: false, msg: JSON.parse(JSON.stringify(errors))[0].msg });
        }
        else if (!employee)
            res.status(400).json({ success: false, msg: 'Could not load document' });

        else {
            // console.log("updating");
            employee.name = req.body.name;
            employee.department = req.body.department;
            employee.age = req.body.age;
            employee.gender = req.body.gender;

            employee.save().then(employee => {
                res.json({ success: true, msg: 'Update complete' });
            })
                .catch(err => {
                    res.status(400).json({ success: false, msg: 'unable to update db' });
                });
        }
    });
});

//define delete| remove | destroy route
employeeRoutes.route('/employee/delete/:id').get(function (req, res) {
    Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
        if (err) res.json({ success: false, msg: 'Cannot remove item' });
        console.log(employee);
        if (!employee) res.json({ success: false, msg: "Employee doesn't exist" });
        else res.json({ success: true, msg: 'Successfully removed' });
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