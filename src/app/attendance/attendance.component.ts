import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import * as moment from 'moment';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PersonService } from '../person.service';
import { ActivatedRoute} from '@angular/router';

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
  disable: boolean;
  EID: string;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private ps: PersonService,
    private flashMessage: FlashMessagesService,
    private activeRoute: ActivatedRoute) {
      console.log(typeof(this.now));
    this.maxDate = this.now.toISOString().substring(0, 10);
    // console.log('hello world', this.now.toISOString().substring(0,10),"\n maxDate", this.maxDate)
    this.createForm();
    this.EID = this.activeRoute.snapshot.queryParamMap.get('id');
    console.log(this.EID);

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
    var q='';
    if (this.EID) q="EID="+this.EID;
    this.ps.getAttendance(q)
      .then((res) => {
        console.log(res['data'])
        this.attendanceList = res['data'];
        if(this.attendanceList.length > 0){
          this.attendanceList.forEach(attendance => {
            attendance.date = attendance.date.substring(0, 10);
          });
        console.log(this.attendanceList, "\n", this.attendanceList[0].date.substring(0, 10), "\t", this.attendanceList[0].id.name);
        }
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

  disableButton(name, date) {
    var loop = true;
    this.attendanceList.forEach(element => {
      if (name === element.id._id && loop) {
        if (date === element.date) {
          this.disable = true;
          this.flashMessage.show("The employee already has an attendance on the date"+ date,{cssClass: 'alert-danger'});
          return loop=false;
        }
      }
      if(loop) this.disable = false;
    });
    console.log(this.disable);
  }

  ngOnInit() {
    this.getEmployee();
    this.getAttendance();
  }

}
