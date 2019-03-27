import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ToastrManager} from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient, public toastr: ToastrManager) { }

  addPerson(name, department, gender, age) {
    const obj = {
      name: name,
      department: department,
      gender: gender,
      age: age
    };
    // console.log("service",obj);
    //this.http.post(`${this.uri}/add`, obj).subscribe(res => console.log('Done'));

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/employee/add`;
      this.http.post(apiURL, obj)
        .toPromise()
        .then(
          res => { // Success
            this.toastr.successToastr('Employee Added Successfully');
            resolve(res);
          },
          msg => { // Error
            reject(msg);
            this.toastr.errorToastr("Error Adding Employee"+ msg);
          }
        );
    });
    return promise;
  }

  getEmployees(page: number, sort?: string, fname?: string, drpdnDepartment?: string,fgender?: string) {

    // console.log("FILTER", fgender);

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/employee`;
      // let pg = this.getHttpParams(page);
      let pg = page;
      this.http.get(apiURL, { params: new HttpParams({
        fromObject: { 
          page: pg.toString(),
          sort: sort,
          fname: fname,
          drpdnDepartment: drpdnDepartment,
          fgender: fgender  
        }
        })
     })
        .toPromise()
        .then(
          res => { // Success

            resolve(res);
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }

  getDepartment() {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/department`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success

            resolve(res);
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }


  editEmployee(id) {
    //console.log("HERE");
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/employee/edit/${id}`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success

            resolve(res);
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;

  }



  updateEmployee(name, department, gender, age, id) {
    console.log("updateEmployee");
    const obj = {
      name: name,
      department: department,
      gender: gender,
      age: age
    };
    console.log(obj);
    // this.http.post(`${this.uri}/update/${id}`, obj).subscribe(res => console.log('Updated'));

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/employee/update/${id}`;
      this.http.post(apiURL, obj)
        .toPromise()
        .then(
          res => { // Success
            this.toastr.successToastr('Updated Successfully!!');
            resolve(res);
          },
          msg => { // Error
            this.toastr.successToastr('Updated Error!!'+ msg);
            reject(msg);
          }
        );
    });
    return promise;
  }

  deleteEmployee(id) {
    //console.log('hello');

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/employee/delete/${id}`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            this.toastr.successToastr('Deleted Successfully');
            resolve(res);
          },
          msg => { // Error
            this.toastr.errorToastr('Error Deleating!!'+ msg);
            reject(msg);
          }
        );
    });
    return promise;

    //return this.http.get(`${this.uri}/delete/${id}`);
  }

  // showSuccess(msg?: string){
  //     this.toastr.successToastr(msg);
  //   }
}
