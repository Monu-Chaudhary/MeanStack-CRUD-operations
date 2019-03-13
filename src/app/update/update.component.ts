import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../person.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  employee: any = {};
  exampleForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private ps: PersonService,
    private fb: FormBuilder) {
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

  updateEmployee(name, department, gender, age) {
    this.route.params.subscribe(params => {
      this.ps.updateEmployee(name, department,gender, age, params['id']);
      this.router.navigate(['employee']);
    });
  }

  ngOnInit() {
    console.log("edit OK");
    this.route.params.subscribe(params => {
      this.ps.editEmployee(params['id']).then(res => {
        this.employee = res;
      });      
    });
  }

}
