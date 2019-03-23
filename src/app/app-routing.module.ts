import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ReadComponent } from './read/read.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
<<<<<<< HEAD
  // { path: 'employee/create', component: CreateComponent },
=======
  { path: 'employee/create', component: CreateComponent },
>>>>>>> 97791b81e012b443ab1eecac6b72d0c253c747bf
  { path: 'employee/update/:id', component: UpdateComponent },
  { path: 'employee', component: ReadComponent },
  { path: 'user', component: LoginComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user/register', component: RegisterComponent }


  // { 
  //   path:'employee', 
  //   component: ReadComponent,
  //   children:[
  //     { path:'create', component:CreateComponent},
  //     { path: 'edit/:id', component:UpdateComponent},
  //     { path: 'read', component:ReadComponent}
  //   ]
  // },
  // { path:'', redirectTo:'/employee', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
