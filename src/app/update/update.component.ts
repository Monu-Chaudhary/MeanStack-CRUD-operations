import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService } from '../person.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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
  @Input() index: number;
  @Output() updatedData = new EventEmitter();
  departments: Observable<string[]>;

  // createSelector(selectEmployees, employee): Selector;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ps: PersonService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    // private activeModal: NgbActiveModal
    ) {
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

  open(content) {

    this.route.params.subscribe(params => {
      this.ps.editEmployee(this.updateMessage).then(res => {
        this.employee = res;
        // console.log(res);
      });
    });
    this.ps.getDepartment().then((result) => {
      this.departments = result['departments']
    });
    // this.activeModal = 
    this.modalService.open(content, { ariaLabelledBy: 'update-employee-title' }).result.then((result) => {
      console.log('Closed with', result);
    }, (reason) => {
      console.log("Dismissed", this.getDismissReason(reason));
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateEmployee() {
    // this.route.params.subscribe(params => {
      this.ps.updateEmployee(this.employee.name, this.employee.department._id, this.employee.gender, this.employee.age, this.updateMessage)
        .then((res: any) => {
          // console.log("updated value",res.data);
          this.modalService.dismissAll('Save Close');
          this.updatedData.emit({updatedEmployee: res.data, i: this.index});
          // this.activeModal.close();
        }).catch((err: any) => {
          console.log(err);
        })

      // this.router.navigate(['user']);
      // this.redirectTo('user');
    // });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  ngOnInit() {

    // this.route.params.subscribe(params => {
    //   this.ps.editEmployee(this.updateMessage).then(res => {
    //     this.employee = res;
    //     console.log(res);
    //   });      
    // });
  }

}
