import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchReport } from '../../contracts/match-report';
import { MatchReportService } from '../../services/match-report.service';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'falkenheim-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.css']
})
export class MatchReportComponent implements OnInit, OnDestroy {
  matchReports: MatchReport[] = [];
  matchReportsSubscription: Subscription;

  editModeActive = false;

  matchReportToEdit: MatchReport = {
    id: '',
    date: { seconds: new Date().getSeconds() },
    match: '',
    report: '',
    participating: '',
    prevented: '',
    supervisor: '',
    link: ''
  };

  matchReportToSubmit: MatchReport = {
    date: { seconds: new Date().getSeconds() },
    match: '',
    report: '',
    participating: '',
    prevented: '',
    supervisor: '',
    link: ''
  };

  dateForForm = new Date();
  dateForEditForm: Date = new Date();

  constructor(
    private matchReportService: MatchReportService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.matchReportsSubscription = this.matchReportService
      .getMatchReports()
      .subscribe((result: MatchReport) => {
        this.matchReports.push(result);
        this.matchReports = this.matchReports.sort((a, b) => {
          if (a.date.seconds < b.date.seconds) {
            return 1;
          }
          if (a.date.seconds > b.date.seconds) {
            return -1;
          }
          return 0;
        });
      });
  }

  ngOnDestroy() {
    this.matchReportsSubscription.unsubscribe();
  }

  checkStatusOfElement(element: HTMLInputElement) {
    return (
      element.className.includes('ng-valid') ||
      element.className.includes('ng-pristine')
    );
  }

  onSubmit() {
    const dateToSubmit = new Date(this.dateForForm);
    this.matchReportToSubmit.date.seconds = dateToSubmit.getTime() / 1000;
    this.matchReports = [];
    this.matchReportService.setNewMatchReport(this.matchReportToSubmit);
  }

  onEdit(matchReport: MatchReport) {
    const dateToEdit = new Date(this.dateForEditForm);
    this.matchReportToEdit.date.seconds = dateToEdit.getTime() / 1000;
    this.matchReports = [];
    this.matchReportService.editMatchReport(this.matchReportToEdit).then(() => {
      matchReport.editMode = false;
      this.editModeActive = false;
    });
  }

  activateEditMode(matchReport: MatchReport) {
    this.editModeActive = true;
    this.matchReports.forEach((report: MatchReport) => {
      report.editMode = false;
    });
    this.dateForEditForm = new Date(matchReport.date.seconds * 1000);
    matchReport.editMode = true;
    this.matchReportToEdit = {
      id: matchReport.id,
      date: matchReport.date,
      match: matchReport.match,
      report: matchReport.report,
      participating: matchReport.participating,
      prevented: matchReport.prevented,
      supervisor: matchReport.supervisor,
      link: matchReport.link
    };
  }

  cancelEditMode(matchReport: MatchReport) {
    this.editModeActive = false;
    this.dateForEditForm = new Date();
    matchReport.editMode = false;
    this.matchReportToEdit = {
      id: '',
      date: { seconds: new Date().getSeconds() },
      match: '',
      report: '',
      participating: '',
      prevented: '',
      supervisor: '',
      link: ''
    };
  }
}
