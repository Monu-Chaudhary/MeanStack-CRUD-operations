const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB'),
    Employee = require('./models/Employee');

    // router.get('/employee',(req, res) => {
    //     {

    //     })
    // })

    const employeeRoutes = require('./routes/employee.route');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, {useNewUrlParser: true}).then(
        () => {console.log('Database is connected')},
        err => {console.log('cannot connect to database'+err)}
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    //
    app.options('*', cors());
    
    app.use('/employee', employeeRoutes);
    const port = process.env.PORT || 4000;

    const server = app.listen(port, function(){
        console.log('listening on port ' + port);
    });

