import {Component, OnInit} from '@angular/core';
import {MatchReport} from '../../contracts/match-report';
import {MatchReportService} from '../../services/match-report.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'falkenheim-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.css']
})
export class MatchReportComponent implements OnInit {

  matchReports$: Observable<MatchReport[]> = new Observable();

  constructor(private matchReportService: MatchReportService) {
  }

  ngOnInit() {
    this.matchReports$ = this.matchReportService.getMatchReports();
  }


}
