import { ChangeDetectionStrategy, Component, OnInit, Output, Input } from '@angular/core';
import Employee from '../Employee';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateComponent} from '../update/update.component';

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
  sort: string='';
  order: string='';

  filterForm: FormGroup;

  ngOnInit() {
    this.getPage(1);
    // this.getDepartment();
  }

  sortData(sort?: string, fname?: string, fgender?: string){
    // console.log("ok SORT:",, '\n Filter', fname, "Gender", fgender);
    if(this.order === sort) sort = '-'+sort;
    this.order = sort;
    if((fname || fgender) && !sort) var page = 1;
    else page = this.page;
    this.getPage(page, sort, fname, fgender);
  }

  getPage(page: number=1, sort?: string, fname?: string, fgender?: string) {
    this.loading = true;
    console.log("1", sort, fname, fgender);
    // console.log("PAGE:: ",page);
    this.ps.getEmployees(page, sort, fname, fgender).then((result) => {
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
