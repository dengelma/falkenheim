import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { HistoryComponent } from './history/history.component';
import { ContactComponent } from './contact/contact.component';
import { SeasonComponent } from './season/season.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContentComponent, HistoryComponent, ContactComponent, SeasonComponent, TeamComponent]
})
export class ContentModule { }
