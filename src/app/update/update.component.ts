<<<<<<< HEAD
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../person.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Selector, State } from '@ngrx/store';
import { Content } from '@angular/compiler/src/render3/r3_ast';
=======
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../person.service';

>>>>>>> 97791b81e012b443ab1eecac6b72d0c253c747bf

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  employee: any = {};
  exampleForm: FormGroup;
<<<<<<< HEAD
  @Input() updateMessage: string;
  // createSelector(selectEmployees, employee): Selector;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ps: PersonService,
    private fb: FormBuilder,
    private modalService: NgbModal) {
=======

  constructor(private route: ActivatedRoute,
    private router: Router,
    private ps: PersonService,
    private fb: FormBuilder) {
>>>>>>> 97791b81e012b443ab1eecac6b72d0c253c747bf
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'update-employee-title'}).result.then((result)=>{
      console.log('Closed with',result);
    })
  }

  updateEmployee(name, department, gender, age) {
    this.route.params.subscribe(params => {
      this.ps.updateEmployee(name, department,gender, age, this.updateMessage);
      this.router.navigate(['employee']);
    });
  }

  ngOnInit() {
    console.log("edit Ok");
    console.log('ID', this.updateMessage);
    this.route.params.subscribe(params => {
      this.ps.editEmployee(this.updateMessage).then(res => {
        this.employee = res;
      });      
    });

    // open('');
  }

}
