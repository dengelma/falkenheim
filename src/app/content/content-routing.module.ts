import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {HistoryComponent} from './history/history.component';
import {SeasonComponent} from './season/season.component';
import {TeamComponent} from './team/team.component';

const contentRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'season', component: SeasonComponent},
  {path: 'team', component: TeamComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(
      contentRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class ContentRoutingModule {
}
