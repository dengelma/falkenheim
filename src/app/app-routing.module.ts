import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ContactComponent} from './contact/contact.component';
import {HomeComponent} from './content/home/home.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
  },
  {path: 'contact', component: ContactComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
