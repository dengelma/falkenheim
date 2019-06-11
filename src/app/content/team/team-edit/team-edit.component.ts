import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Position, TeamMembers } from '../../../contracts/team-members';

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
export class TeamEditComponent {
  @Input() teamMemberToEdit: TeamMembers;

  @Output() editPlayer = new EventEmitter<TeamMembers>();
  @Output() editModeCanceled = new EventEmitter<void>();
  @Output() deletePlayer = new EventEmitter<void>();

  public positions = positions;

  public checkStatusOfElement(element: HTMLInputElement): boolean {
    return element.className.includes('ng-valid') || element.className.includes('ng-pristine');
  }
}
