import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FixturesComponent } from './fixtures/fixtures.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { MatchReportComponent } from './match-report/match-report.component';
import { SeasonComponent } from './season/season.component';
import { StandingsComponent } from './standings/standings.component';
import { TeamComponent } from './team/team.component';

const contentRoutes: Routes = [
  { path: 'history', component: HistoryComponent },
  {
    path: 'season',
    component: SeasonComponent,
    children: [
      { path: 'fixtures', component: FixturesComponent },
      { path: 'match-report', component: MatchReportComponent },
      { path: 'standings', component: StandingsComponent }
    ]
  },
  { path: 'team', component: TeamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(contentRoutes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
