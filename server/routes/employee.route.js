const express = require('express');
const app = express();
const employeeRoutes = express.Router();


//require employee model in our routes model
let Employee = require('../models/Employee');

//defined store route
employeeRoutes.route('/add').post(function (req, res) {
    let employee = new Employee(req.body);
    //console.log('abc');
    employee.save()
        .then(employee => {
            res.status(200).json({ 'employee': 'employee is added successfully' });
            res.redirect('/employee');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

//defined get data(index or listing) route
employeeRoutes.route('/').get(function (req, res, next) {
    if (req.query.page == undefined) {
        req.query.page = 1;
    }
    if (req.query.size == undefined) {
        req.query.size = 10;
    }

    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    var query = {};

    // console.log('req.query => ' + JSON.stringify(req.query));

    if (page < 0 || page === 0) {

        response = { "error": true, "message": "invalid page number, should start witl 1" };
        return res.json(response);
    }
    query.skip = size * (page - 1);
    query.limit = size;
    //find some documents

    // app.set('views', __dirname+ 'src/app/read');
    // app.set('view engine', 'html');


    Employee.find({}).skip(query.skip).limit(query.limit).exec((err, EmployeeObjects)=>{
        Employee.count().exec(function(err, count){
            if(err) return next(err)
            res.json({
                EmployeeObjects: EmployeeObjects
        });
        })
    })
});

//define edit route
employeeRoutes.route('/edit/:id').get(function (req, res) {
    // console.log('editRoute');
    let id = req.params.id;
    Employee.findById(id, function (err, employee) {
        res.json(employee);
    });
});

//define update route
employeeRoutes.route('/update/:id').post(function (req, res) {
    // console.log('employeeUpdateRoute');
    Employee.findById(req.params.id, function (err, employee) {
        if (!employee)
            return next(new Error('Could not load document'));
        else {
            // console.log("updating");
            employee.name = req.body.name;
            employee.address = req.body.address;
            employee.phone = req.body.phone;

            employee.save().then(employee => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send('enable to update db');
                });
        }
    });
});

//define delete| remove | destroy route
employeeRoutes.route('/delete/:id').get(function (req, res) {
    Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});


module.exports = employeeRoutes;