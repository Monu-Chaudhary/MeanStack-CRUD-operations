import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PersonService} from '../person.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder, private ps: PersonService, private router: Router) {
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

   addPerson(name, department, gender, age){
     this.ps.addPerson(name, department, gender, age);
     this.router.navigate(['employee']);
   }

  ngOnInit() {
  }

}
