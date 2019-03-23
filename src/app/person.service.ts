import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  uri = 'http://localhost:4000/employee';

  constructor(private http: HttpClient) { }

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

  getEmployees(page: number, sort?: string, filter?: string, fgender?: string) {

    console.log("FILTER", fgender);

    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.uri}`;
      // let pg = this.getHttpParams(page);
      let pg = page;
      this.http.get(apiURL, { params: new HttpParams({
        fromObject: { 
          page: pg.toString(),
          sort: sort,
          filter: filter,
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


  editEmployee(id) {
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

  deleteEmployee(id) {
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