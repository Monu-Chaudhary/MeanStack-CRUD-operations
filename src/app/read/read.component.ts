import { Component, OnInit } from '@angular/core';
import Employee from '../Employee';
import { PersonService} from '../person.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  employeeObjects: Employee[];
  p: number = 1;

  constructor(private ps: PersonService, private router: Router) { 
  }

  deleteEmployee(id){
    this.ps.deleteEmployee(id).then(res => {
      console.log('deleted');
      //location.reload();
      //this.router.navigate(['employee']);
    });

  }

  ngOnInit() {
    this.ps.getEmployees().then((data: Employee[])=>{
      this.employeeObjects = data;
    });
  }

}
