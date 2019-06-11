import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, Subscription } from 'rxjs';

import { Position, TeamMembers } from '../../contracts/team-members';
import { AuthenticationService } from '../../services/authentication.service';
import { TeamMembersService } from '../../services/team-members.service';
import { NotificationService } from './../../services/notification.service';
import { StorageService } from './../../services/storage.service';

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

  public ngOnDestroy(): void {
    this.teamMemberSubscription.unsubscribe();
  }

  public checkStatusOfElement(element: HTMLInputElement): boolean {
    return element.className.includes('ng-valid') || element.className.includes('ng-pristine');
  }

  public addNewPlayer(): void {
    this.clearArrays();
    this.teamMembersService.addNewTeamMember(this.newTeamMember).then(() => {
      this.clearAddPlayerForm();
      this.notificationService.showNotification('Neuen Spieler erfolgreich angelegt!');
    });
  }

  private clearAddPlayerForm(): void {
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

  public checkCategory(teamMember: TeamMembers): void {
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

  public activateEditMode(teamMember: TeamMembers): void {
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

  private clearArrays(): void {
    this.teamMembers = [];
    this.goalies = [];
    this.aussen = [];
    this.rueckraum = [];
    this.kreis = [];
    this.noCategory = [];
  }

  public editPlayer(teamMember: TeamMembers): void {
    this.editModeActive = false;
    teamMember.editMode = false;
    this.clearTeamMemberToEdit();
    this.clearArrays();
    this.teamMembersService.editTeamMember(teamMember).then(() => {
      this.notificationService.showNotification('Daten des Spielers erfolgreich angepasst!');
    });
  }

  public cancelEditMode(teamMember: TeamMembers): void {
    this.editModeActive = false;
    teamMember.editMode = false;
    this.clearTeamMemberToEdit();
  }

  public clearTeamMemberToEdit(): void {
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

  public deletePlayer(teamMember: TeamMembers): void {
    this.clearArrays();
    this.teamMembersService.deleteTeamMember(teamMember).then(() => {
      this.editModeActive = false;
      this.notificationService.showNotification('Spieler erfolgreich gelöscht');
    });
  }
}
