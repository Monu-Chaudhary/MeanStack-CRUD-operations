import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ToastrManager} from 'ng6-toastr-notifications';
// import { url } from '../main';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  // uri = url.uri;
  uri = 'http://localhost:3000';

  constructor(private http: HttpClient, public toastr: ToastrManager ) { }

  addPerson(name, department, gender, age) {
    const obj = {
      name: name,
      department: department,
      gender: gender,
      age: age
    };

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/employee/add`;
      this.http.post(apiURL, obj)
        .toPromise()
        .then(
          res => { // Success
            // console.log(JSON.stringify(res));
            this.toastr.successToastr(JSON.parse(JSON.stringify(res)).msg);
            resolve(res);
          },
          msg => { // Error
            var message = JSON.parse(JSON.stringify(msg.error)).msg;
            message.forEach(element => {
            this.toastr.errorToastr(element.msg);              
            });
            // console.log(JSON.parse(JSON.stringify(msg.error)).msg);
            reject(msg);
          }
        );
    });
    return promise;
  }

  getEmployees(q) {

    // console.log("ORDER", order);

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/employee?${q}`;
      this.http.get(apiURL
    //     , {
    //      params: new HttpParams({
    //     fromObject: obj
    //     // { 
    //     //   page: pg.toString(),
    //     //   order: order,
    //     //   sort: sort,
    //     //   fname: fname,
    //     //   drpdnDepartment: drpdnDepartment,
    //     //   fgender: fgender  
    //     // }
    //     })
    //  }
     )
        .toPromise()
        .then(
          res => { // Success

            resolve(res);
          },
          msg => { // Error
            this.toastr.errorToastr(msg.error);
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
            this.toastr.errorToastr(msg.error);
            reject(msg.error);
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
            this.toastr.errorToastr(msg.error);
            reject(msg);
          }
        );
    });
    return promise;

  }

  updateEmployee(name, department, gender, age, id) {
    // console.log("updateEmployee");
    const obj = {
      name: name,
      department: department,
      gender: gender,
      age: age
    };
    // console.log(obj);
    // this.http.post(`${this.uri}/update/${id}`, obj).subscribe(res => console.log('Updated'));

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/employee/update/${id}`;
      this.http.post(apiURL, obj)
        .toPromise()
        .then(
          res => { // Success
            this.toastr.successToastr(JSON.parse(JSON.stringify(res)).msg);
            resolve(res);
          },
          msg => { // Error
            this.toastr.errorToastr(JSON.parse(JSON.stringify(msg.error)).msg);
            // console.log("Error",JSON.parse(JSON.stringify(msg.error)).msg);
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
            var response = JSON.parse(JSON.stringify(res));
            // console.log("TYPE........",typeof(response));
            if (response.success)
            this.toastr.successToastr(response.msg);
            else 
            this.toastr.infoToastr(response.msg);
            resolve(res);
          },
          msg => { // Error
            this.toastr.errorToastr(msg.error);
            reject(msg);
          }
        );
    });
    return promise;
  }

  addAttendance(id, date){
    console.log(typeof(date));
    const obj = {id: id, date: date};
    console.log(obj);
    let promise = new Promise((resolve, reject)=>{
      let apiURL = `${this.uri}/employee/attendance/${id}`;
      this.http.post(apiURL, obj)
      .toPromise()
      .then(
        res => { //success
          this.toastr.successToastr(JSON.parse(JSON.stringify(res)).msg);
          resolve(res);

        },
        msg => { //error
          console.log(msg);
          console.log("err msg",JSON.parse(JSON.stringify(msg)).message);
          this.toastr.errorToastr("error occured");
          reject(msg);
        }
      ).catch(err =>{
        console.log("error occured", err);
      }

      );
    });
    return promise;
  }

  getAttendance(q?){
    console.log(q);
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/employee/attendance?${q}`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success

            resolve(res);
          },
          msg => { // Error
            this.toastr.errorToastr(msg.error);
            reject(msg.error);
          }
        );
    });
    return promise;
  }

  deleteAttendance(id) {
    //console.log('hello');

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/employee/attendance/delete/${id}`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { // Success
            var response = JSON.parse(JSON.stringify(res));
            // console.log("TYPE........",typeof(response));
            if (response.success)
            this.toastr.successToastr(response.msg);
            else 
            this.toastr.infoToastr(response.msg);
            resolve(res);
          },
          msg => { // Error
            this.toastr.errorToastr(msg.error);
            reject(msg);
          }
        );
    });
    return promise;
  }

  updateAttendance(id, EID, date){
    console.log(typeof(date));
    // console.log(id);
    const obj = {id: EID, date: date};
    let promise = new Promise((resolve, reject)=>{
      let apiURL = `${this.uri}/employee/attendance/update/${id}`;
      this.http.post(apiURL, obj)
      .toPromise()
      .then(
        res => { //success
          this.toastr.successToastr(JSON.parse(JSON.stringify(res)).msg);
          resolve(res);

        },
        msg => { //error
          this.toastr.errorToastr(JSON.parse(JSON.stringify(msg.error)).msg);
          reject(msg);
        }
      ).catch(err =>{
        console.log("error occured", err);
      }

      );
    });
    return promise;
  }

}
