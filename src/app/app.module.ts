import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbModalRef, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import {ToastrModule} from 'ng6-toastr-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    FormsModule,
    SlimLoadingBarModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [PersonService, UserService, ReadComponent, NgbActiveModal],
  bootstrap: [AppComponent],
  // entryComponents: [UpdateComponent]
})
export class AppModule { }
