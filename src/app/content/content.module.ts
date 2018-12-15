import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatchReportService } from '../services/match-report.service';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { JoinComponent } from './join/join.component';
import { MatchReportComponent } from './match-report/match-report.component';
import { SeasonComponent } from './season/season.component';
import { StandingsComponent } from './standings/standings.component';
import { TeamComponent } from './team/team.component';
import { JoinService } from '../services/join.service';

@NgModule({
  imports: [CommonModule, ContentRoutingModule, FormsModule],
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
  ],
  providers: [MatchReportService, JoinService]
})
export class ContentModule {}
