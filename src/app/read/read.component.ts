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
  employeeProperties: Employee;
  // sort: string='';

  filterForm: FormGroup;

  ngOnInit() {
    this.getPage(1);
  }

  sortData(sort: string, filter?: string){
    console.log("ok SORT:",sort, '\n Filter', filter);
    this.getPage(this.page, sort, filter);
  }

  getPage(page: number, sort?: string, filter?: string) {
    this.loading = true;
    console.log(sort, filter);
    // console.log("PAGE:: ",page);
    this.ps.getEmployees(page, sort, filter).then((result) => {
      console.log("RESULT", result['page']);

      this.employeeObjects = result['data'];
      this.count = result['count'];
      this.page = result['page'];
      this.loading = false;
    });
  }



  constructor(private ps: PersonService, private router: Router, private fb: FormBuilder ) {
    this.createForm();
  }

  createForm(){
    this.filterForm = this.fb.group({
      sort: ['', Validators.required],
      filter: ['', Validators.required]
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
