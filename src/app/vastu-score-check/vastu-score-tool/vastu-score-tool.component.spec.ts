import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VastuScoreToolComponent } from './vastu-score-tool.component';

describe('VastuScoreToolComponent', () => {
  let component: VastuScoreToolComponent;
  let fixture: ComponentFixture<VastuScoreToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VastuScoreToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VastuScoreToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
