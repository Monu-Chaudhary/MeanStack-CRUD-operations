import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PersonService} from '../person.service';
<<<<<<< HEAD
// import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
=======
import {Router} from '@angular/router';
>>>>>>> 97791b81e012b443ab1eecac6b72d0c253c747bf

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

<<<<<<< HEAD
  // closeResult: string;

  constructor(
    private fb: FormBuilder, 
    // private router: Router, 
    private ps: PersonService, 
    private modalService: NgbModal) {
=======
  constructor(private fb: FormBuilder, private ps: PersonService, private router: Router) {
>>>>>>> 97791b81e012b443ab1eecac6b72d0c253c747bf
    this.createForm();
   }

  exampleForm: FormGroup;

   createForm(){
     this.exampleForm = this.fb.group({
       name: ['', Validators.required],
       department: ['', Validators.required],
       gender: ['', Validators.required],
       age: ['', Validators.required]
     });
   }

<<<<<<< HEAD
  open(content){
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
     this.ps.addPerson(name, department, gender, age);
    //  this.router.navigate(['employee']);
=======
   addPerson(name, department, gender, age){
     this.ps.addPerson(name, department, gender, age);
     this.router.navigate(['employee']);
>>>>>>> 97791b81e012b443ab1eecac6b72d0c253c747bf
   }

  ngOnInit() {
  }

}
