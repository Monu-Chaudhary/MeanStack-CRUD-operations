import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../person.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  employee: any = {};
  exampleForm: FormGroup;
  @Input() updateMessage: string;
  departments: Observable<string[]>;

  // createSelector(selectEmployees, employee): Selector;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ps: PersonService,
    private fb: FormBuilder,
    private modalService: NgbModal) {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [''],
      department: [''],
      gender: [''],
      age: ['']
    });
  }

  open(content){
    this.ps.getDepartment().then((result)=>{
      this.departments = result['departments']
    })
    this.modalService.open(content, {ariaLabelledBy: 'update-employee-title'}).result.then((result)=>{
      console.log('Closed with',result);
    },(reason)=>{
      console.log("Dismissed",this.getDismissReason(reason));
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  updateEmployee() {
    this.route.params.subscribe(params => {
      this.ps.updateEmployee(this.employee.name, this.employee.department._id, this.employee.gender, this.employee.age, this.updateMessage);
      this.router.navigate(['employee']);
    });
  }

  ngOnInit() {
    // console.log("edit Ok");
    // console.log('ID', this.updateMessage);
    this.route.params.subscribe(params => {
      this.ps.editEmployee(this.updateMessage).then(res => {
        this.employee = res;
        console.log(res);
      });      
    });

    // open('');
  }

}
