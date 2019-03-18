import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { resolve } from 'url';
import { reject } from 'q';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000/user';

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) { }

  login(username, hash){
    const obj = {
      username: username,
      hash: hash
    };
    let promise = new Promise((resolve, reject) =>{
      let apiURL = `${this.uri}/login`;
      this.http.post(apiURL, obj)
        .toPromise()
        .then(
          res => {
            console.log('Logged in');
            this.loggedIn.next(true);
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }

  //TODO logout this.loggedIn.next(false);

  register(username, hash, firstName, lastName){
    const obj = {
      username: username,
      hash: hash, 
      firstName: firstName,
      lastName: lastName
    };
    let promise = new Promise((resolve, reject) =>{
      let apiURL = `${this.uri}/register`;
      this.http.post(apiURL, obj)
        .toPromise()
        .then(
          res => {
            console.log('registered successfully');
            resolve(res);
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }
}
