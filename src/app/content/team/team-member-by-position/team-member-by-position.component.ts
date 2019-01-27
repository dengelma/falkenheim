import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamMembers } from '../../../contracts/team-members';

@Component({
  selector: 'falkenheim-team-member-by-position',
  templateUrl: './team-member-by-position.component.html',
  styleUrls: ['./team-member-by-position.component.css']
})
export class TeamMemberByPositionComponent implements OnInit {
  @Input() position: string;
  @Input() teamMembersByPosition: TeamMembers[];
  @Input() teamMemberToEdit: TeamMembers;

  @Output() activateEditMode: EventEmitter<TeamMembers> = new EventEmitter();
  @Output() editPlayer: EventEmitter<TeamMembers> = new EventEmitter();
  @Output() editModeCanceled: EventEmitter<TeamMembers> = new EventEmitter();
  @Output() deletePlayer: EventEmitter<TeamMembers> = new EventEmitter();

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {}
}
