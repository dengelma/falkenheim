import { NotificationService } from './../../services/notification.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { Position, TeamMembers } from '../../contracts/team-members';
import { AuthenticationService } from '../../services/authentication.service';
import { TeamMembersService } from '../../services/team-members.service';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from 'angularfire2/storage';

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
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  path = 'players/';

  teamMembers: TeamMembers[] = [];

  goalies: TeamMembers[] = [];
  aussen: TeamMembers[] = [];
  rueckraum: TeamMembers[] = [];
  kreis: TeamMembers[] = [];
  noCategory: TeamMembers[] = [];

  teamMemberSubscription = new Subscription();

  teamMemberToEdit: TeamMembers;

  positions = positions;

  newTeamMember: TeamMembers = {
    name: '',
    firstName: '',
    nickname: '',
    number: 0,
    position: { positionFull: '', positionShort: '', category: '' },
    image: '',
    memberSince: 2019,
    storagePath: 'players/'
  };

  editModeActive = false;

  constructor(
    public authenticationService: AuthenticationService,
    private teamMembersService: TeamMembersService,
    public storageService: StorageService,
    public afStorage: AngularFireStorage,
    private notificationService: NotificationService
  ) {}

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
    this.teamMembersService.addNewTeamMember(this.newTeamMember).then(() => {
      this.clearAddPlayerForm();
      this.notificationService.showNotification('Neuen Spieler erfolgreich angelegt!');
    });
  }

  clearAddPlayerForm() {
    this.newTeamMember = {
      name: '',
      firstName: '',
      nickname: '',
      number: 0,
      position: { positionFull: '', positionShort: '', category: '' },
      image: '',
      memberSince: 2019,
      storagePath: 'players/'
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

  activateEditMode(teamMember: TeamMembers) {
    teamMember.editMode = true;
    this.teamMemberToEdit = teamMember;
    this.editModeActive = true;
    this.teamMembers.forEach((oneTeamMember: TeamMembers) => {
      oneTeamMember.editMode = false;
    });

    this.teamMemberToEdit.editMode = true;
    this.teamMemberToEdit.id = teamMember.id;
    this.teamMemberToEdit.firstName = teamMember.firstName;
    this.teamMemberToEdit.name = teamMember.name;
    this.teamMemberToEdit.nickname = teamMember.nickname;
    this.teamMemberToEdit.number = teamMember.number;
    this.teamMemberToEdit.memberSince = teamMember.memberSince;
    this.teamMemberToEdit.image = teamMember.image;
    this.teamMemberToEdit.position = teamMember.position;
  }

  clearArrays() {
    this.teamMembers = [];
    this.goalies = [];
    this.aussen = [];
    this.rueckraum = [];
    this.kreis = [];
    this.noCategory = [];
  }

  editPlayer(teamMember: TeamMembers) {
    this.editModeActive = false;
    teamMember.editMode = false;
    this.clearTeamMemberToEdit();
    this.clearArrays();
    this.teamMembersService.editTeamMember(teamMember).then(() => {
      this.notificationService.showNotification('Daten des Spielers erfolgreich angepasst!');
    });
  }

  cancelEditMode(teamMember: TeamMembers) {
    this.editModeActive = false;
    teamMember.editMode = false;
    this.clearTeamMemberToEdit();
  }

  clearTeamMemberToEdit() {
    this.teamMemberToEdit = {
      name: '',
      firstName: '',
      nickname: '',
      number: 0,
      position: { positionFull: '', positionShort: '', category: '' },
      image: '',
      memberSince: 2019,
      storagePath: 'players/'
    };
  }

  deletePlayer(teamMember: TeamMembers) {
    this.clearArrays();
    this.teamMembersService.deleteTeamMember(teamMember).then(() => {
      this.editModeActive = false;
      this.notificationService.showNotification('Spieler erfolgreich gelöscht');
    });
  }
}
