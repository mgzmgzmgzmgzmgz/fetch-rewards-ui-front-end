import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ngMocks, MockInstance, MockRenderFactory, MockBuilder } from 'ng-mocks';
import { WelcomePageComponent } from 'src/app/welcome-page/welcome-page.component/welcome-page.component';
import { WelcomePageModule } from 'src/app/welcome-page/welcome-page.module';
import { FormSubmittedModule } from '../form-submitted.module';

import { FormSubmittedComponent } from './form-submitted.component';

describe('FormSubmittedComponent', () => {
  ngMocks.faster();
  MockInstance.scope('all');

  const render = MockRenderFactory(FormSubmittedComponent);
  beforeAll(() => MockBuilder(FormSubmittedComponent, [FormSubmittedModule]));

  it('should create', () => {
    const fixture = render();
    expect(fixture.point.componentInstance).toBeTruthy();
  });

  describe('startOver', () => {
    it('should route to the welcome page when the button is clicked', () => {
      MockInstance(Router, 'navigate', jest.fn());
      const fixture = render();

      const goToFormButton = ngMocks.find('button.btn-primary');
      ngMocks.click(goToFormButton);

      const router = ngMocks.get(Router);
      expect(router.navigate).toBeCalledTimes(1);
      expect(router.navigate).toBeCalledWith(['']);
    });
  });
});
