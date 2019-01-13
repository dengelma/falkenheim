import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Position, TeamMembers } from '../../contracts/team-members';
import { AuthenticationService } from '../../services/authentication.service';
import { TeamMembersService } from '../../services/team-members.service';

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
  selector: 'falkenheim-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {
  teamMembers: TeamMembers[] = [];

  goalies: TeamMembers[] = [];
  aussen: TeamMembers[] = [];
  rueckraum: TeamMembers[] = [];
  kreis: TeamMembers[] = [];
  noCategory: TeamMembers[] = [];

  teamMemberSubscription = new Subscription();

  positions = positions;

  newTeamMember: TeamMembers = {
    name: '',
    firstName: '',
    nickname: '',
    number: 0,
    position: { positionFull: '', positionShort: '', category: '' },
    image: '',
    memberSince: 2019
  };

  editModeActive = false;

  constructor(public authenticationService: AuthenticationService, private teamMembersService: TeamMembersService) {}

  ngOnInit() {
    this.teamMemberSubscription = this.teamMembersService.getTeamMembers().subscribe((teamMember: TeamMembers) => {
      this.checkCategory(teamMember);
      this.teamMembers.push(teamMember);
      this.teamMembers = this.teamMembers.sort((teamMemberA, teamMemberB) => {
        if (teamMemberA.number < teamMemberB.number) {
          return 1;
        }
        if (teamMemberA.number > teamMemberB.number) {
          return -1;
        }
        return 0;
      });
    });
  }

  ngOnDestroy() {
    this.teamMemberSubscription.unsubscribe();
  }

  checkStatusOfElement(element: HTMLInputElement) {
    return element.className.includes('ng-valid') || element.className.includes('ng-pristine');
  }

  addNewPlayer() {
    this.clearArrays();
    this.teamMembersService.addNewTeamMember(this.newTeamMember).then(() => this.clearAddPlayerForm());
  }

  clearAddPlayerForm() {
    this.newTeamMember = {
      name: '',
      firstName: '',
      nickname: '',
      number: 0,
      position: { positionFull: '', positionShort: '', category: '' },
      image: '',
      memberSince: 2019
    };
  }

  checkCategory(teamMember: TeamMembers) {
    if (teamMember.position) {
      switch (teamMember.position.category) {
        case 'Torwart':
          this.goalies.push(teamMember);
          break;
        case 'Außen':
          this.aussen.push(teamMember);
          break;
        case 'Rückraum':
          this.rueckraum.push(teamMember);
          break;
        case 'Kreis':
          this.kreis.push(teamMember);
          break;
        default:
          this.noCategory.push(teamMember);
      }
    }
  }

  clearArrays() {
    this.teamMembers = [];
    this.goalies = [];
    this.aussen = [];
    this.rueckraum = [];
    this.kreis = [];
    this.noCategory = [];
  }
}
