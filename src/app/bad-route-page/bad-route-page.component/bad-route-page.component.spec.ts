import { Router } from '@angular/router';
import { MockBuilder, MockInstance, MockRenderFactory, ngMocks } from 'ng-mocks';
import { BadRoutePageModule } from '../bad-route-page.module';

import { BadRoutePageComponent } from './bad-route-page.component';

describe('BadRoutePageComponent', () => {
  ngMocks.faster();
  MockInstance.scope('all');

  const render = MockRenderFactory(BadRoutePageComponent);
  beforeAll(() => MockBuilder(BadRoutePageComponent, [BadRoutePageModule]));

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
