import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
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
  // employeeObjects: Observable<string[]>;
  page: number = 1;
  count: number = 0;
  loading: boolean;
  drpdnDepartment: string;
  sort: string = '';
  order: string = '';
  departments: Observable<string[]>;
  name: string = '';
  list: any;
  // sortByName: string; 

  filterForm: FormGroup;

  ngOnInit() {
    this.getPage(1);
    this.getDepartment();
  }

  sortData(sort?: string,fname?: string, drpdnDepartment?: string, fgender?: string) {
    // console.log(this.sortByName);
    // sort = sort || this.sortByName || sortByGender || sortByDep || sortByAge;
    if (sort) {
      if (this.order === 'asc') this.order = 'desc';
      else this.order = 'asc';
    }
    if ((fname || fgender || drpdnDepartment) && !sort) var page = 1;
    else page = this.page;
    console.log("sort:", sort, " order", this.order, " fname:", fname, " drpdnDepartment: ", drpdnDepartment, "fgender: ", fgender)
    var obj = {
      page: page || 1,
      order: this.order,
      sort: sort,
      fname: fname,
      drpdnDepartment: drpdnDepartment,
      fgender: fgender,
    };
    this.getPage(obj);
  }

  getPage(obj) {
    console.log("object", obj, " page:", obj.page, " sort:", obj.sort, " order", obj.order, " fname:", obj.fname, " drpdnDepartment: ", obj.drpdnDepartment, "fgender: ", obj.fgender)
    
    var q = '?';
    if (obj.page) q = q + 'page=' + obj.page + '&';
    if (obj.order) q = q + 'order=' + obj.order + '&';
    if (obj.sort) q = q + 'sort=' + obj.sort + '&';
    if (obj.fname) q = q + 'fname=' + obj.fname + '&';
    if (obj.drpdnDepartment) q = q + 'drpdnDepartment=' + obj.drpdnDepartment + '&';
    if (obj.fgender) q = q + 'fgender=' + obj.fgender;
    console.log(q);
    
    this.loading = true;
    this.ps.getEmployees(q).then((result) => {
      console.log("RESULT", result['data']);
      this.employeeObjects = result['data'];
      this.count = result['count'];
      this.page = result['page'];
      this.loading = false;
    });
  }

  getDepartment() {
    this.ps.getDepartment().then((result) => {
      this.departments = result['departments'];
      console.log('dept', this.departments, '\t', result);

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
      drpdnDepartment: [''],
    });
  }

  deleteEmployee(id, index) {
    var result = confirm("Are you sure you want to delete?");
    if (result) {
      this.ps.deleteEmployee(id).then(res => {
        
        this.employeeObjects.splice(index, 1);
      });
    }
    console.log(this.employeeObjects.length);
  }

  addToList(item){
    this.list = this.departments;
    item.addedEmployee.department = this.list.find((element) => {
      // console.log("ElemID", element._id, "\t", dept);
      return element._id === item.addedEmployee.department;
    });
    console.log("DEPT", item.departobject);
    this.employeeObjects.push(item.addedEmployee);
  }

  updateList(item){
    // console.log("ITEMS",item);
    this.list = this.departments;
    // console.log("LIST", this.list);
    item.departobject = this.list.find((element) => {
      // console.log("ElemID", element._id, "\t", dept);
      return element._id === item.updatedEmployee.department;
    });
    
    this.employeeObjects[item.i].name = item.updatedEmployee.name;
    this.employeeObjects[item.i].age = item.updatedEmployee.age;
    this.employeeObjects[item.i].department = item.departobject;
    this.employeeObjects[item.i].gender = item.updatedEmployee.gender;
    // console.log("LIST",this.employeeObjects);
  }

}
