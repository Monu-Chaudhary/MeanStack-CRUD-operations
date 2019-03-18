import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private us: UserService, private router: Router) {
    this.createForm();  
  }

  registerForm: FormGroup;

  createForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      hash: ['', Validators.required],
      firstName: ['', Validators.required],    
      lastName: ['', Validators.required],    
    })
  }

  register(username, hash, firstName, lastName){
    this.us.register(username, hash, firstName, lastName);
    this.router.navigate(['user']);
    
  }

  ngOnInit() {
  }

}
