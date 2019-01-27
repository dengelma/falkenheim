import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { TeamMembers, Position } from '../../../contracts/team-members';
import { TeamMembersService } from '../../../services/team-members.service';

export const positions: Position[] = [
  {
    positionFull: 'Torwart',
    positionShort: 'TW',
    category: 'Torwart'
  },
  {
    positionFull: 'Linksaußen',
    positionShort: 'LA',
    category: 'Außen'
  },
  {
    positionFull: 'Rechtsaußen',
    positionShort: 'RA',
    category: 'Außen'
  },
  {
    positionFull: 'Rückraumlinks',
    positionShort: 'RL',
    category: 'Rückraum'
  },
  {
    positionFull: 'Rückraumrechts',
    positionShort: 'RR',
    category: 'Rückraum'
  },
  {
    positionFull: 'Rückraummitte',
    positionShort: 'RM',
    category: 'Rückraum'
  },
  {
    positionFull: 'Kreismitte',
    positionShort: 'KM',
    category: 'Kreis'
  }
];

@Component({
  selector: 'falkenheim-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  @Input() teamMemberToEdit: TeamMembers;

  @Output() editPlayer: EventEmitter<TeamMembers> = new EventEmitter();
  @Output() editModeCanceled: EventEmitter<void> = new EventEmitter();
  @Output() deletePlayer: EventEmitter<void> = new EventEmitter();

  positions = positions;

  constructor() {}

  ngOnInit() {}

  checkStatusOfElement(element: HTMLInputElement) {
    return element.className.includes('ng-valid') || element.className.includes('ng-pristine');
  }
}
