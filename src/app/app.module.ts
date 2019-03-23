import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
=======
>>>>>>> 97791b81e012b443ab1eecac6b72d0c253c747bf

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';
import { PersonService } from './person.service';
import {  UserService } from './user.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    SlimLoadingBarModule,
    BrowserModule,
<<<<<<< HEAD
    AppRoutingModule,
    NgbModule
=======
    AppRoutingModule
>>>>>>> 97791b81e012b443ab1eecac6b72d0c253c747bf
  ],
  providers: [PersonService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
