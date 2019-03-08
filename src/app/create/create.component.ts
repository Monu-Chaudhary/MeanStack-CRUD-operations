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

  exampleForm: FormGroup;
  constructor(private fb: FormBuilder, private ps: PersonService, private router: Router) {
    this.createForm();
   }

   createForm(){
     this.exampleForm = this.fb.group({
       name: ['', Validators.required],
       address: ['', Validators.required],
       phone: ['', Validators.required]
     });
   }

   addPerson(name, address, phone){
     this.ps.addPerson(name, address, phone);
     //location.reload();
     this.router.navigate(['employee']);
   }

  ngOnInit() {
  }

}
