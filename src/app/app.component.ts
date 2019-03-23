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
<<<<<<< HEAD
import { CreateComponent} from './create/create.component';
=======
>>>>>>> 97791b81e012b443ab1eecac6b72d0c253c747bf

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

  // ngOnInit(){
  //   this.isLoggedIn$ = this.us.isLoggedIn;
  // }
}
