import { ChangeDetectionStrategy, Component, OnInit, ViewContainerRef } from '@angular/core';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReadComponent implements OnInit {

  employeeObjects: any;
  // public filter: string = '';
  // employeeObjects: Observable<string[]>;
  page: number = 1;
  count: number = 0;
  loading: boolean;
  drpdnDepartment: string;
  sort: string = '';
  order: string = '';
  departments: Observable<string[]>;

  filterForm: FormGroup;

  ngOnInit() {
    this.getPage(1);
    this.getDepartment();
  }

  sortData(sort?: string, fname?: string, drpdnDepartment?:string, fgender?: string) {
    console.log("param",drpdnDepartment);
    if (this.order === sort) sort = '-' + sort;
    this.order = sort;
    if ((fname || fgender || drpdnDepartment) && !sort) var page = 1;
    else page = this.page;
    this.getPage(page, sort, fname, drpdnDepartment, fgender);
  }

  getPage(page: number = 1, sort?: string, fname?: string,drpdnDepartment?: string, fgender?: string) {
    this.loading = true;
    page = page || 1;
    console.log("param",drpdnDepartment);
    this.ps.getEmployees(page, sort, fname,drpdnDepartment, fgender).then((result) => {
      console.log("RESULT", result['data']);
      // console.log("result", result);
      this.employeeObjects = result['data'];
      // console.log(this.employeeObjects);
      this.count = result['count'];
      this.page = result['page'];
      this.loading = false;
    });
  }

  getDepartment() {
    this.ps.getDepartment().then((result) => {
      this.departments = result['departments'];
      console.log('dept',this.departments,'\t', result);

    })
  }

  constructor(private ps: PersonService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.filterForm = this.fb.group({
      sort: ['', Validators.required],
      fname: ['', Validators.required],
      fgender: ['', Validators.required],
      fdepartment: ['', Validators.required],
      drpdnDepartment: ['']
    });
  }

  deleteEmployee(id,ind) {
    var result =confirm("Are you sure you want to delete?");
    if(result) {
      this.ps.deleteEmployee(id).then(res => {
      // this.showSuccess('Deleted Successfully');
      var index = this.employeeObjects.indexOf(id);
      console.log(index);
      this.employeeObjects.splice(ind, 1);
    });
  }
  }

  // showSuccess(msg?: string){
  //   // this.toastr.successToastr(msg);
  // }

}
