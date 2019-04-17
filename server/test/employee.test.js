// process.env.NODE_ENV = 'test';
console.log("ENVironemnt", process.env.NODE_ENV);



const chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    supertest = require("supertest"),
    mongoose = require('mongoose');

let Employee = require('../models/Employee');
let Attendance = require('../models/attendance');

let app = require('../server');

// var server = supertest.agent("http://localhost:4000");

var server = supertest.agent(app);

describe('EMPLOYEE TESTER', () => {
    var employee = {
        name: "Monu",
        age: 22,
        department: "5c99c53b5239d6f1d8245f3b",
        gender: "Female"
    }

    beforeEach((done)=>{
        Employee.remove({},(err)=>{
            done();
        });
    });
    
    it('add new employee', (done) => {
        server
            .post('/employee/add')
            .send(employee)
            .end((err, res) => {
                res.body.should.be.a('object');
                expect(res.body).to.have.property('success').eq(true);
                expect(res.body).to.have.property('data').to.not.be.empty;
                done();
            });
    });

    it('employee list', (done) => {
        server
            .get('/employee')
            .end((err, res) => {
                if (err) throw err;
                res.body.should.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('page');
                expect(res.body).to.have.property('count');
                // console.log(res.body.data[0]._id);
                res.status.should.be.eq(200);
                done();
            });
    });

    it('update employee', (done)=>{
        let employee = new Employee({name: 'Yogesh', age: 21, department: '5c99c53b5239d6f1d8245f3b', gender: 'Male'});
        employee.save((err, employee)=>{
            server
            .post('/employee/update/'+ employee._id)
            .send({name: 'Yogesh', age: 20, department:'5c99c53b5239d6f1d8245f3b', gender: 'Male'})
            .end((err, res)=>{
                // res.status(200).json({ success: true, msg: 'Update complete', data: employee });
                res.body.should.be.a('object');
                // console.log(res.error);
                expect(res.body).to.have.property('success').eq(true);
                expect(res.body).to.have.property('msg').to.equal('Update complete');
                expect(res.body).to.have.property('data');
                console.log(employee._id);
                // console.log("resss",res.body.data._id);
                expect(res.body.data._id).to.eq(employee._id.toString());
                expect(res.body.data.age).to.eq(20);
                res.status.should.be.eq(200);
                done();
            });
        }); 
    });

    it('delete employee', (done)=>{
        let employee = new Employee({name: 'Yogesh', age: 21, department: '5c99c53b5239d6f1d8245f3b', gender: 'Male'});
        employee.save((err, employee)=>{
            server
            .get('/employee/delete/'+ employee._id)
            .end((err, res)=>{
                //res={ success: true, msg: 'Successfully removed', data: employee  }
                // console.log(res.error);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('success').eq(true);
                expect(res.body).to.have.property('msg').to.equal('Successfully removed');
                expect(res.body).to.have.property('data');
                res.status.should.be.eq(200);
                done();
            });
        });
    });

});

describe('TESTING DEPARTMENT', ()=>{
     // var department = {
    //     name: 'Management'
    // }

    it('list department', (done)=>{
        server
        .get('/department')
        .end((err, res)=>{
            // console.log(res.status);
            res.status.should.be.eq(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('success').eq(true);
                expect(res.body).to.have.property('data');
                done();
        });
    });
    
});

describe('TEST EMPLOYEE ATTENDANCE', ()=>{

    beforeEach((done)=>{
        Attendance.remove({}, (err)=>{
            done();
        })
    })

    it("add attendance",(done)=>{
        let employee = new Employee({name: 'Yogesh', age: 21, department: '5c99c53b5239d6f1d8245f3b', gender: 'Male'});
        employee.save((err, employee)=>{
            server
            .post("/employee/attendance/"+ employee._id)
            .send({date: new Date(), id: employee._id})
            .end((err, res)=>{
                // console.log(res);
//                res.status(200).json({ success: true, msg: 'Attendance is added successfully', data: attendance });
                res.status.should.be.eq(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('success').eq(true);
                expect(res.body).to.has.property('msg').eq('Attendance is added successfully');
                expect(res.body).to.have.property('data').to.not.be.empty; 
                expect(res.body.data.id).to.eq(employee._id.toString());
                done();
            });
        });
    });

    it('list attendance', (done)=>{
        server
        .get('/employee/attendance')
        .end((err, res)=>{
        // res.status(200).json({succes: true, attendanceList: attendanceList});
        res.status.should.be.eq(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('success').eq(true);
        expect(res.body).to.have.property('data'); 
        done();
        });
    });

    it('update attendance', (done)=>{
        let attendance = new Attendance({date: new Date(), id: "5c99c53b5239d6f1d8245f3c"});
        attendance.save((err, attendance)=>{
            server
            .post('/employee/attendance/update/'+ attendance._id)
            .send({date: new Date(), id: "5c99c53b5239d6f1d8245f4c"})
            .end((err, res)=>{
                // res.status(200).json({ success: true, msg: "data updated", data: attendance });
                res.status.should.be.eq(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.property('success').eq(true);
                expect(res.body).to.have.property('msg').eq("data updated");
                expect(res.body).to.have.property('data').to.not.be.empty;
                expect(res.body.data.id).to.equal("5c99c53b5239d6f1d8245f4c");
                done();
            });
        });
    });

    it('delete attendance', (done)=>{
        let attendance = new Attendance({date: new Date(), id: "5c99c53b5239d6f1d8245f3c"});
        attendance.save((err, attendance)=>{
            server
            .get('/employee/attendance/delete/'+ attendance._id)
            .end((err, res)=>{
        // else res.status(200).json({ success: true, msg: 'Successfully removed', data: attendance });
        res.status.should.be.eq(200);
        res.body.should.be.a('object');
        expect(res.body).to.have.property('success').eq(true);
        expect(res.body).to.have.property('msg').eq("Successfully removed");
        expect(res.body).to.have.property('data').to.not.be.empty;
        expect(res.body.data.id).to.equal("5c99c53b5239d6f1d8245f3c");
        done();
    })
        })
    })
});