import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadRoutePageComponent } from './bad-route-page.component';

describe('BadRoutePageComponent', () => {
  let component: BadRoutePageComponent;
  let fixture: ComponentFixture<BadRoutePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadRoutePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadRoutePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
