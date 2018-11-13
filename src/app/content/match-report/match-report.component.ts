import {Component, OnInit} from '@angular/core';
import {MatchReport} from '../../contracts/match-report';

@Component({
  selector: 'falkenheim-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.css']
})
export class MatchReportComponent implements OnInit {

  matchReports: MatchReport[] = [{
    date: '28.10.2018, 13.00 Uhr',
    match: 'TSV Herren - TSV Wendelstein 2',
    report: `Wirklich sehr sehr unglücklich haben wir unser viertes Saisonspiel gegen die 2. Mannschaft der Wendelsteiner
    in den letzten Sekunden noch mit 16:17 (9:7) verloren.
    Doch der Reihe nach…
    Nach den bisherigen Ergebnissen des gegnerischen Teams (alle Spiele gegen die Spitzenmannschaften unserer
    Gruppe mit kaum Torunterschied verloren) hatten wir uns von vornherein auf eine schwere Begegnung eingestellt.
    Und…, unsere Erwartungen wurden nicht enttäuscht. Praktisch über die gesamte Spieldauer wurde es dann ein
    Treffen auf Augenhöhe, in dem wir es allerdings - vor allem mit einer guten Abwehrleistung - trotzdem schafften,
    bis zur 55 Minute fast immer in Führung zu liegen. Mit dem cleveren Schachzug einer sehr frühen offenen Manndeckung
     brachten uns die Wendelsteiner allerdings in den letzten 5 Minuten derart aus dem Konzept, dass wir keinen Treffer
      mehr landen konnten, leichte Abspielfehler produzierten, eine Zeitstrafe kassierten und 15 Sekunden vor Schluss den
      17 Gegentreffer hinnehmen mussten.
    Letztendlich fehlte uns da ein wenig die Cleverness einfach nur den Ball zu sichern, und insgesamt in der zweiten
     Hälfte ein wenig mehr Treffsicherheit bei unseren Würfen. Außerdem wäre ein Schiri wünschenswert gewesen, der nicht aus
     Schwabach kommt, der uns nicht rund 5 klare Vorteiltore abpfeift, der die Siebenmeter (Wendelstein 5 / wir 0) etwas gerechter
     verteilt und der nicht vor dem entscheidenden Gegentreffer ein Kreisspiel eines endlich vor dem Wendelsteiner Tor freigespielten
      Spielers pfeift, der zu diesem Zeitpunkt klar vor der Linie stand!?!`,
    participating: 'Gerald (Tor); Mäx (0 Siebenmetertore/2 Feldtore), Reiner, Maddin (0/1), Harry (0/1), Matsches (0/2), Stefan, Ralf, Domi, Lucas (0/1), Jonas (0/3) und Michl (0/6).',
    prevented: 'Marcel, Manu, Jules, Jan',
    supervisor: 'Erich, Steffi, Stolz',
    link: 'https://bhv-handball.liga.nu/cgi-bin/WebObjects/nuLigaDokumentHBDE.woa/wa/nuDokument?dokument=MeetingReportHBFOP&meeting=6290285&etag=e0760c79-970f-4997-8a9a-bd66ef7010d7'
  }];


  constructor() {
  }

  ngOnInit() {
  }


}
