import { Component } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NavigationCancel,
         Event,
         NavigationEnd,
         NavigationError,
         NavigationStart,
         Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
// import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'meanstack1';

  isLoggedIn$: Observable<boolean>;

  constructor(private _loadingBar:SlimLoadingBarService, private _router: Router, private us: UserService){
    this._router.events.subscribe((event: Event)=>{
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: Event): void{
    if(event instanceof NavigationStart){
      this._loadingBar.start();
    }
    if(event instanceof NavigationEnd){
      this._loadingBar.complete();
    }
    if( event instanceof NavigationCancel){
      this._loadingBar.stop();
    }
    if(event instanceof NavigationError){
      this._loadingBar.stop();
    }
  }


  // showSuccess(msg){
  //   this.toastr.successToastr(msg);
  // }
  // ngOnInit(){
  //   this.isLoggedIn$ = this.us.isLoggedIn;
  // }
}
