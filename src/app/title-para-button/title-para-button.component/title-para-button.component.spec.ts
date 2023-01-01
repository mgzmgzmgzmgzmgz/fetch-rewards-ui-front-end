import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleParaButtonComponent } from './title-para-button.component';

describe('TitleParaButtonComponent', () => {
  let component: TitleParaButtonComponent;
  let fixture: ComponentFixture<TitleParaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleParaButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleParaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
