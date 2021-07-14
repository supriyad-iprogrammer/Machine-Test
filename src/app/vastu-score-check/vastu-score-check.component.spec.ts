import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VastuScoreCheckComponent } from './vastu-score-check.component';

describe('VastuScoreCheckComponent', () => {
  let component: VastuScoreCheckComponent;
  let fixture: ComponentFixture<VastuScoreCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VastuScoreCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VastuScoreCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
