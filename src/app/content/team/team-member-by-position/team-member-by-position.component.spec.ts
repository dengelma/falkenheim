import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberByPositionComponent } from './team-member-by-position.component';

describe('TeamMemberByPositionComponent', () => {
  let component: TeamMemberByPositionComponent;
  let fixture: ComponentFixture<TeamMemberByPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMemberByPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberByPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
