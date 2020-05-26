import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorlddataComponent } from './worlddata.component';

describe('WorlddataComponent', () => {
  let component: WorlddataComponent;
  let fixture: ComponentFixture<WorlddataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorlddataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorlddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
