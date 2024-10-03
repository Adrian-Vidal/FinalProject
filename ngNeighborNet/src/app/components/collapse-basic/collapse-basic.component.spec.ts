import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseBasicComponent } from './collapse-basic.component';

describe('CollapseBasicComponent', () => {
  let component: CollapseBasicComponent;
  let fixture: ComponentFixture<CollapseBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapseBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapseBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
