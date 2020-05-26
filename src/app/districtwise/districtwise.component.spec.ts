import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictwiseComponent } from './districtwise.component';

describe('DistrictwiseComponent', () => {
  let component: DistrictwiseComponent;
  let fixture: ComponentFixture<DistrictwiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictwiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
