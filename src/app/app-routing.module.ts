import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ContactComponent} from './contact/contact.component';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './content/content.module#ContentModule',
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
