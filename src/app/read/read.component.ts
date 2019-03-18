import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import Employee from '../Employee';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadComponent implements OnInit {

  // employeeObjects: any;
  // public filter: string = '';
  employeeObjects: Observable<string[]>;
  page: number = 1;
  count: number = 0;
  loading: boolean;
  departmnet: Observable<string[]>;
  // sort: string='';

  filterForm: FormGroup;

  ngOnInit() {
    this.getPage(1);
    // this.getDepartment();
  }

  sortData(sort: string, filter?: string, fgender?: string){
    console.log("ok SORT:",sort, '\n Filter', filter, "Gender", fgender);
    if(filter) var page =1;
    else page = this.page
    this.getPage(page, sort, filter, fgender);
  }

  getPage(page: number=1, sort?: string, filter?: string, fgender?: string) {
    this.loading = true;
    console.log("1", sort, filter, fgender);
    // console.log("PAGE:: ",page);
    this.ps.getEmployees(page, sort, filter, fgender).then((result) => {
      console.log("RESULT", result['data']);
      console.log("result", result);
      this.employeeObjects = result['data'];
      this.count = result['count'];
      this.page = result['page'];
      this.loading = false;
    });
  }

  getDepartment(){

  }

  constructor(private ps: PersonService, private router: Router, private fb: FormBuilder ) {
    this.createForm();
  }

  createForm(){
    this.filterForm = this.fb.group({
      sort: ['', Validators.required],
      fname: ['', Validators.required],
      fgender: ['', Validators.required],
      fdepartment: ['', Validators.required]
    });
  }

  deleteEmployee(id) {
    this.ps.deleteEmployee(id).then(res => {
      console.log('deleted');
      //location.reload();
      //this.router.navigate(['employee']);
    });

  }

}
