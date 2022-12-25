import { Router } from '@angular/router';
import { ngMocks, MockInstance, MockRenderFactory, MockBuilder } from 'ng-mocks';
import { WelcomePageModule } from '../welcome-page.module';

import { WelcomePageComponent } from './welcome-page.component';

describe('WelcomePageComponent', () => {
  ngMocks.faster();
  MockInstance.scope('all');

  const render = MockRenderFactory(WelcomePageComponent);
  beforeAll(() => MockBuilder(WelcomePageComponent, [WelcomePageModule]));

  it('should create', () => {
    const fixture = render();
    expect(fixture.point.componentInstance).toBeTruthy();
  });

  describe('goToForm', () => {
    it('should route to the profile-form when the button is clicked', () => {
      MockInstance(Router, 'navigate', jest.fn());
      const fixture = render();

      const goToFormButton = ngMocks.find('button.btn-primary');
      ngMocks.click(goToFormButton);

      const router = ngMocks.get(Router);
      expect(router.navigate).toBeCalledTimes(1);
      expect(router.navigate).toBeCalledWith(['profile-form']);
    });
  });
});
