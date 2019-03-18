import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private us: UserService, private router: Router) {
    this.createForm();
   }

   loginForm: FormGroup;

   createForm(){
     this.loginForm = this.fb.group({
       username: ['', Validators.required],
       hash: ['', Validators.required]
     });
   }

   login(username, hash){
     this.us.login(username, hash);
     this.router.navigate(['employee']);

   }

  ngOnInit() {
  }

}
