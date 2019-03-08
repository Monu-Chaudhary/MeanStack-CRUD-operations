import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { promise } from 'protractor';
// import { resolve } from 'dns';
// import { reject } from 'q';
import {Observable} from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  uri = 'http://localhost:4000/employee';

  constructor(private http: HttpClient) { }

  addPerson(name, address, phone) {
    const obj = {
      name: name,
      address: address,
      phone: phone
    };
    //console.log(obj);
    //this.http.post(`${this.uri}/add`, obj).subscribe(res => console.log('Done'));

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/add`;
      this.http.post(apiURL, obj)
        .toPromise()
        .then(
          res => { // Success
          console.log('ADDED');
          resolve(res);
          },
          msg => { // Error
          reject(msg);
          }
        );
    });
    return promise;
  }

  getEmployees() {

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}`;
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

  editEmployee(id){
    //console.log("HERE");
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/edit/${id}`;
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

  

  updateEmployee(name, address, phone, id) {
    console.log("updateEmployee");
    const obj = {
      name: name,
      address: address,
      phone: phone
    };
    // console.log(obj);
    // this.http.post(`${this.uri}/update/${id}`, obj).subscribe(res => console.log('Updated'));

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/update/${id}`;
      this.http.post(apiURL, obj)
        .toPromise()
        .then(
          res => { // Success
          console.log('Updated');
          resolve(res);
          },
          msg => { // Error
          reject(msg);
          }
        );
    });
    return promise;
  }

  deleteEmployee(id){
    //console.log('hello');

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}/delete/${id}`;
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

    //return this.http.get(`${this.uri}/delete/${id}`);
  }

}
