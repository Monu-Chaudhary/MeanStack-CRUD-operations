import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $AB from 'jquery';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import * as moment from 'moment';

import { PersonService } from '../person.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  employeeObjects: any;
  now = new Date();
  maxDate: string;
  attendanceForm: FormGroup;
  attendanceList: any;
  attendance: any = {};
  option: string;
  AID: number;
  index: number;
  // date= new Date();

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private ps: PersonService) {
    // let now = moment(); 
    // console.log(this.now);
    this.maxDate = this.now.toISOString().substring(0, 10);
    // console.log('hello world', this.now.toISOString().substring(0,10),"\n maxDate", this.maxDate)
    this.createForm();
  }
  createForm() {
    this.attendanceForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  open(content, option, id?, i?) {
    if (option == 'edit') {
      this.AID = id;
      this.index = i;
      this.option = 'edit';
      // console.log(id);
      // this.attendance.name = this.attendanceList[i].id.name;
      // this.attendance.date = this.attendanceList[i].date;
      // console.log("edit", this.attendance.name, this.attendance.date);
      this.attendanceForm.get('name').setValue(this.attendanceList[i].id._id);
      this.attendanceForm.get('date').setValue(this.attendanceList[i].date);
    }
    else this.option = 'add';

    this.modalService.open(content, { ariaLabelledBy: 'attendance-title' }).result.then((result) => {
      console.log('Closed with', result);
    }, (reason) => {
      console.log('Dismissed', this.getDismissReason(reason));
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getEmployee() {
    this.ps.getEmployees('').then((result) => {
      this.employeeObjects = result['data'];
      // console.log(this.employeeObjects);
    });
  }

  addAttendance(name, date) {
    // date = new Date(date);
    console.log(typeof (date), "\t", date);
    // console.log("name", name, "date", date);
    this.ps.addAttendance(name, date)
      .then((res: any) => {
        this.modalService.dismissAll('save Close');
        this.addToList(res.data);
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }

  addToList(attendance) {
    attendance.id = this.employeeObjects.find((element) => {
      return attendance.id === element._id;
    });
    console.log(attendance);
    attendance.date = attendance.date.substring(0, 10);
    this.attendanceList.push(attendance);
  }

  getAttendance() {
    this.ps.getAttendance()
      .then((res) => {
        this.attendanceList = res;
        this.attendanceList.forEach(attendance => {
          attendance.date = attendance.date.substring(0, 10);
        });
        console.log(this.attendanceList, "\n", this.attendanceList[0].date.substring(0, 10), "\t", this.attendanceList[0].id.name);
      })
  }

  deleteAttendance(id, index) {
    var result = confirm("Are you sure you want to delete?");
    if (result) {
      this.ps.deleteAttendance(id).then(res => {

        this.attendanceList.splice(index, 1);
        console.log(index);
      });
    }
    console.log(this.employeeObjects.length);
  }

  UpdateAttendance(EID, date) {

    console.log(this.AID);
    this.ps.updateAttendance(this.AID, EID, date)
      .then((res: any) => {
        this.modalService.dismissAll('save Close');
        console.log("res.data", res.data);
        res.data.name = this.employeeObjects.find((element) => {
          console.log(element._id);
          return element._id === res.data.id;
        });
        console.log("res.data.id", res.data.name);
        this.attendanceList[this.index].id.name = res.data.name.name;
        this.attendanceList[this.index].date = res.data.date.substring(0, 10);
        //edit array
      }).catch((err) => {
        console.log(err);
      });
  }

  // onChange(){
  //   var disabledDates = ["2019-04-08","2019-04-09","2019-04-07"];
    // $(document).ready(function() {
      // $("#date").datepicker({
      //   beforeShowDay: function(date){
      //     var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
      //     return [ disabledDates.indexOf(date) == -1 ]
      // }
      // });
    // });
  // }

  // onChange(name: string) {
  //   alert(name);
  //   $(document).ready(function () {
  //     $("#date").datepicker(function(){
  //         $.fn.disableDate();
  //     });
  //     $.fn.disableDate = function(){
  //       alert(here);
  //       const attr = this.attendanceList.find((element) => {
  //         return name === this.attendanceList.id._id;
  //       });
  //       console.log(attr);
  //     }
  //   });
  // }

  ngOnInit() {
    this.getEmployee();
    this.getAttendance();
  }

}
