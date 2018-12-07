import { Component, OnInit } from '@angular/core';
import { MatchReport } from '../../contracts/match-report';
import { MatchReportService } from '../../services/match-report.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'falkenheim-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.css']
})
export class MatchReportComponent implements OnInit {
  matchReports$: Observable<MatchReport[]> = new Observable();

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

  constructor(private matchReportService: MatchReportService) {}

  ngOnInit() {
    this.matchReports$ = this.matchReportService.getMatchReports();
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
    this.matchReportService.setNewMatchReport(this.matchReportToSubmit);
  }
}
