import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ReadComponent } from './read/read.component';

const routes: Routes = [
  { path: 'employee/create', component: CreateComponent },
  { path: 'employee/update/:id', component: UpdateComponent },
  { path: 'employee', component: ReadComponent },
  { path: '', redirectTo: '/employee', pathMatch: 'full' }
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
