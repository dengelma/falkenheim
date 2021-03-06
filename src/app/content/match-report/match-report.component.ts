import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatchReport } from '../../contracts/match-report';
import { AuthenticationService } from '../../services/authentication.service';
import { MatchReportService } from '../../services/match-report.service';
import { NotificationService } from '../../services/notification.service';

export interface MatchReportSubmitData {
  // Wird noch erweitert
  id?: string;
  date: Date;
  time: any;
  homeGame: boolean;
  opponent: string;
  resultTsv: string;
  resultOpponent: string;
  report: string;
  participating: string;
  prevented: string;
  supervisor: string;
  link: string;
}

@Component({
  selector: 'falkenheim-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.css']
})
export class MatchReportComponent implements OnInit, OnDestroy {
  matchReports: MatchReport[] = [];
  matchReportsSubscription: Subscription;

  editModeActive = false;

  gameAtHome = true;

  matchReportSubmitData: MatchReportSubmitData = {
    date: new Date(),
    time: '',
    homeGame: true,
    opponent: '',
    resultTsv: '',
    resultOpponent: '',
    report: '',
    participating: '',
    prevented: '',
    supervisor: '',
    link: ''
  };

  matchReportEditData: MatchReportSubmitData = {
    date: new Date(),
    time: '',
    homeGame: true,
    opponent: '',
    resultTsv: '',
    resultOpponent: '',
    report: '',
    participating: '',
    prevented: '',
    supervisor: '',
    link: ''
  };

  matchReportToEdit: MatchReport;

  matchReportToSubmit: MatchReport;

  dateForForm = new Date();
  dateForEditForm: Date = new Date();

  constructor(
    private matchReportService: MatchReportService,
    public authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.matchReportsSubscription = this.matchReportService.getMatchReports().subscribe((result: MatchReport) => {
      this.matchReports.push(result);
      this.matchReports = this.matchReports.sort((matchReportA, matchReportB) => {
        if (matchReportA.date < matchReportB.date) {
          return 1;
        }
        if (matchReportA.date > matchReportB.date) {
          return -1;
        }
        return 0;
      });
    });
  }

  public ngOnDestroy(): void {
    this.matchReportsSubscription.unsubscribe();
  }

  public checkStatusOfElement(element: HTMLInputElement): boolean {
    return element.className.includes('ng-valid') || element.className.includes('ng-pristine');
  }

  public onSubmit(): void {
    const dateAsMiliseconds = this.generateMatchDate(this.matchReportSubmitData.date, this.matchReportSubmitData.time);
    const match = this.generateMatchString(this.matchReportSubmitData.homeGame, this.matchReportSubmitData.opponent);

    const result = this.generateResult(
      this.matchReportSubmitData.homeGame,
      this.matchReportSubmitData.resultTsv,
      this.matchReportSubmitData.resultOpponent
    );

    this.matchReportToSubmit = {
      date: dateAsMiliseconds,
      match: match,
      result: result,
      report: this.matchReportSubmitData.report,
      participating: this.matchReportSubmitData.participating,
      prevented: this.matchReportSubmitData.prevented,
      supervisor: this.matchReportSubmitData.supervisor,
      link: this.matchReportSubmitData.link
    };
    this.matchReports = [];
    this.matchReportService.setNewMatchReport(this.matchReportToSubmit).then(x => {
      console.log(x);
      this.clearSubmitForm();
      this.notificationService.showNotification('Neuen Spielbericht erfolgreich angelegt!');
    });
  }

  onEdit(matchReport: MatchReport) {
    const dateAsMiliseconds = this.generateMatchDate(this.matchReportEditData.date, this.matchReportEditData.time);
    const match = this.generateMatchString(this.matchReportEditData.homeGame, this.matchReportEditData.opponent);

    const result = this.generateResult(
      this.matchReportEditData.homeGame,
      this.matchReportEditData.resultTsv,
      this.matchReportEditData.resultOpponent
    );
    this.matchReportToEdit = {
      id: this.matchReportEditData.id,
      date: dateAsMiliseconds,
      match: match,
      result: result,
      report: this.matchReportEditData.report,
      participating: this.matchReportEditData.participating,
      prevented: this.matchReportEditData.prevented,
      supervisor: this.matchReportEditData.supervisor,
      link: this.matchReportEditData.link
    };

    this.matchReports = [];
    this.matchReportService.editMatchReport(this.matchReportToEdit).then(x => {
      console.log(x);
      this.notificationService.showNotification('Spielbericht erfolgreich geändert!');
      matchReport.editMode = false;
      this.editModeActive = false;
    });
  }

  public activateEditMode(matchReport: MatchReport): void {
    this.matchReportToEdit = matchReport;
    this.editModeActive = true;
    this.matchReports.forEach((report: MatchReport) => {
      report.editMode = false;
    });

    this.dateForEditForm = new Date(matchReport.date * 1000);
    this.matchReportToEdit.editMode = true;
    this.checkHomeGame();
    this.matchReportEditData.id = matchReport.id;
    this.matchReportEditData.date = new Date(matchReport.date);
    this.matchReportEditData.time = this.getTime();
    this.matchReportEditData.report = matchReport.report;
    this.matchReportEditData.participating = matchReport.participating;
    this.matchReportEditData.prevented = matchReport.prevented;
    this.matchReportEditData.supervisor = matchReport.supervisor;
    this.matchReportEditData.link = matchReport.link;
  }

  public cancelEditMode(matchReport: MatchReport): void {
    this.editModeActive = false;
    this.dateForEditForm = new Date();
    matchReport.editMode = false;
    this.matchReportToEdit = {
      id: '',
      date: new Date().getSeconds(),
      match: '',
      result: '',
      report: '',
      participating: '',
      prevented: '',
      supervisor: '',
      link: ''
    };
  }

  private clearSubmitForm(): void {
    this.matchReportToSubmit = {
      date: new Date().getSeconds(),
      match: '',
      report: '',
      result: '',
      participating: '',
      prevented: '',
      supervisor: '',
      link: ''
    };
  }

  public generateMatchString(homeGame: boolean, opponent: string): string {
    if (homeGame) {
      return `TSV Herren - ${opponent}`;
    }
    return `${opponent} - TSV Herren`;
  }

  public generateMatchDate(date: Date, time: string): number {
    if (date.toString().indexOf('-') > -1) {
      const year: string = date.toString().substring(0, date.toString().indexOf('-'));
      const month: string = date.toString().substring(date.toString().indexOf('-') + 1, date.toString().lastIndexOf('-'));
      const day: string = date.toString().substring(date.toString().lastIndexOf('-') + 1, date.toString().length);
      date = new Date();
      const dateAsNumber = date.setFullYear(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day));
    }
    const hours = Number.parseInt(time.substring(0, 2));
    const minutes = Number.parseInt(time.substring(3, time.length));

    return date.setHours(hours, minutes, 0);
  }

  public generateResult(homeGame: boolean, resultTsv: string, resultOpponent: string): string {
    if (homeGame) {
      return `${resultTsv}:${resultOpponent}`;
    } else {
      return `${resultOpponent}:${resultTsv}`;
    }
  }

  public checkHomeGame(): void {
    if (this.matchReportToEdit.match.startsWith('TSV Herren')) {
      this.matchReportEditData.homeGame = true;
      this.matchReportEditData.opponent = this.matchReportToEdit.match.substring(
        this.matchReportToEdit.match.indexOf('-') + 2,
        this.matchReportToEdit.match.length
      );
      this.matchReportEditData.resultTsv = this.matchReportToEdit.result.substring(0, this.matchReportToEdit.result.indexOf(':'));
      this.matchReportEditData.resultOpponent = this.matchReportToEdit.result.substring(
        this.matchReportToEdit.result.indexOf(':') + 1,
        this.matchReportToEdit.result.length
      );
    } else {
      this.matchReportEditData.homeGame = false;
      this.matchReportEditData.opponent = this.matchReportToEdit.match.substring(0, this.matchReportToEdit.match.indexOf('-') - 1);
      this.matchReportEditData.resultTsv = this.matchReportToEdit.result.substring(
        this.matchReportToEdit.result.indexOf(':') + 1,
        this.matchReportToEdit.result.length
      );
      this.matchReportEditData.resultOpponent = this.matchReportToEdit.result.substring(0, this.matchReportToEdit.result.indexOf(':'));
    }
  }

  public getTime(): string {
    const hours = new Date(this.matchReportToEdit.date).getHours();
    const minutes = new Date(this.matchReportToEdit.date).getMinutes();

    return `${this.parseTime(hours)}:${this.parseTime(minutes)}`;
  }

  private parseTime(time: number): string {
    if (time <= 9) {
      return `0${time}`;
    } else {
      return `${time}`;
    }
  }
}
