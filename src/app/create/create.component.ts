import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PersonService} from '../person.service';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ReadComponent } from '../read/read.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private ps: PersonService, 
    private modalService: NgbModal) {
    this.createForm();
   }

  @Output() addedData = new EventEmitter();
  exampleForm: FormGroup;
  departments: Observable<string[]>;

   createForm(){
     this.exampleForm = this.fb.group({
       name: ['', Validators.required],
       department: [''],
       gender: ['', Validators.required],
       age: ['', Validators.required]
     });
   }

  open(content){
    this.ps.getDepartment().then((result)=>{
      this.departments = result['departments']
    })
    // console.log('department',this.dpt);
    this.modalService.open(content, {ariaLabelledBy: 'add-employee-title'}).result.then((result)=>{
      console.log('Closed with',result);
      // this.closeResult = 'Closed with: ${result}';
    }, (reason) => {
      console.log('Dismissed',this.getDismissReason(reason));
      // this.closeResult = 'Dismissed ${this.getDissmissReason(reason)}';
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

   addPerson(name, department, gender, age){
     this.ps.addPerson(name, department, gender, age)
      .then((res: any)=>{
        this.modalService.dismissAll('Save Close');
        console.log("RES", res.data);
        this.addedData.emit({addedEmployee: res.data});
      }).catch((err) => {
        console.log(err);
      });
    // alert("hi");
    //  this.router.navigate(['employee']);
   }

  //  showSuccess(){
  //   var msg = "Employee added successfully" 
  //   this.rc.showSuccess(msg);

  //  }

  ngOnInit() {
  }

}
