import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { HistoryComponent } from './history/history.component';
import { SeasonComponent } from './season/season.component';
import { TeamComponent } from './team/team.component';
import { HomeComponent } from './home/home.component';
import { ContentRoutingModule } from './content-routing.module';
import { StandingsComponent } from './standings/standings.component';
import { MatchReportComponent } from './match-report/match-report.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { JoinComponent } from './join/join.component';

@NgModule({
  imports: [CommonModule, ContentRoutingModule],
  declarations: [
    ContentComponent,
    HistoryComponent,
    SeasonComponent,
    TeamComponent,
    HomeComponent,
    StandingsComponent,
    MatchReportComponent,
    FixturesComponent,
    JoinComponent
  ]
})
export class ContentModule {}
