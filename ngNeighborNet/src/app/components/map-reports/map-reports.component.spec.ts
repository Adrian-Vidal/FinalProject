import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapReportsComponent } from './map-reports.component';

describe('MapReportsComponent', () => {
  let component: MapReportsComponent;
  let fixture: ComponentFixture<MapReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
