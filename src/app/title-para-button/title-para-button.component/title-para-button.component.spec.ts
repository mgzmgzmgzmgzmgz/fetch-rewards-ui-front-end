import { Router } from "@angular/router";
import { ngMocks, MockInstance, MockRenderFactory, MockBuilder } from "ng-mocks";
import { AppModule } from "src/app/app.module";
import { anyAlphaString } from "src/test-utils";
import { TitleParaButtonModule } from "../title-para-button.module";
import { TitleParaButtonComponent } from "./title-para-button.component";
import { PLATFORM_ID } from "@angular/core";
import confetti from 'canvas-confetti';
import { fakeAsync, tick } from "@angular/core/testing";
jest.mock('canvas-confetti', () => jest.fn());

describe('TitleParaButtonComponent', () => {
  ngMocks.faster();
  MockInstance.scope('all');

  const render = MockRenderFactory(TitleParaButtonComponent);
  beforeAll(() => MockBuilder(TitleParaButtonComponent, [TitleParaButtonModule, AppModule]));

  it('should create', () => {
    const fixture = render();
    expect(fixture.point.componentInstance).toBeTruthy();
  });

  describe('ngOnInit', () => {
    describe('setCurrentPage', () => {
      it('should correctly set the values in the template and current page when the url is /', () => {
        MockInstance(Router, 'url', '/');
        const fixture = render();

        const h1 = ngMocks.find('h1');
        const para = ngMocks.find('p');
        const button = ngMocks.find('button');
        expect(ngMocks.formatText(button)).toEqual('Click Here To Go To The Form!');
        expect(ngMocks.formatText(para)).toEqual('Are you ready to fill out a form');
        expect(ngMocks.formatText(h1)).toEqual('Welcome!');
      });

      it('should use the correct router argument when navigating away from the / url and clicking the button', () => {
        MockInstance(Router, 'url', '/');
        MockInstance(Router, 'navigate', jest.fn());
        const fixture = render();

        const button = ngMocks.find('button');
        ngMocks.click(button);

        const router = ngMocks.get(Router);
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['profile-form'])
      });

      it('should correctly set the values in the template and current page when the url is /formSubmitted', () => {
        MockInstance(Router, 'url', '/form-submitted');
        const fixture = render();

        const h1 = ngMocks.find('h1');
        const para = ngMocks.find('p');
        const button = ngMocks.find('button');
        expect(ngMocks.formatText(button)).toEqual('Click Here To Start Over');
        expect(ngMocks.formatText(para)).toEqual('You successfully submitted a form!');
        expect(ngMocks.formatText(h1)).toEqual('🎉Congrats!🎉');
      });

      it('should use the correct router argument when navigating away from the /formSubmitted url and clicking the button', () => {
        MockInstance(Router, 'url', '/form-submitted');
        MockInstance(Router, 'navigate', jest.fn());
        const fixture = render();

        const button = ngMocks.find('button');
        ngMocks.click(button);

        const router = ngMocks.get(Router);
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith([''])
      });

      it('should correctly set the values in the template and current page when the url is random text', () => {
        MockInstance(Router, 'url', anyAlphaString(10));
        const fixture = render();

        const h1 = ngMocks.find('h1');
        const para = ngMocks.find('p');
        const button = ngMocks.find('button');
        expect(ngMocks.formatText(button)).toEqual('Click Here To Go To The Form!');
        expect(ngMocks.formatText(para)).toEqual('Looks like nothing\'s here');
        expect(ngMocks.formatText(h1)).toEqual('Woops!');
      });

      it('should use the correct router argument when navigating away from a random url and clicking the button', () => {
        MockInstance(Router, 'url', anyAlphaString(10));
        MockInstance(Router, 'navigate', jest.fn());
        const fixture = render();

        const button = ngMocks.find('button');
        ngMocks.click(button);

        const router = ngMocks.get(Router);
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['profile-form'])
      });
    });

    describe('fireConfetti', () => {
      it('should not fire the confetti when its not the form submitted url', fakeAsync(() => {
        MockInstance(PLATFORM_ID, () => 'server');
        MockInstance(Router, 'url', anyAlphaString(12));
        const fixture = render();
        tick(150);

        expect(confetti).toBeCalledTimes(0)
      }));

      it('should not fire the confetti when its not on the browser', fakeAsync(() => {
        MockInstance(PLATFORM_ID, () => 'server');
        MockInstance(Router, 'url', '/form-submitted');
        const fixture = render();
        tick(150);

        expect(confetti).toBeCalledTimes(0)
      }));

      it('should fire the confetti when it is the form submitted page and it as on browser', fakeAsync(() => {
        MockInstance(PLATFORM_ID, () => 'browser');
        MockInstance(Router, 'url', '/form-submitted');
        const expectedObj = {
          angle: 20,
          spread: 60,
          particleCount: 100,
          origin: { y: 0.5 }
        }
        const fixture = render();

        tick(150);

        expect(confetti).toBeCalledTimes(7)
        expect(confetti).toHaveBeenCalledWith(expectedObj);
        expect(confetti).toHaveBeenCalledWith({ ...expectedObj, angle: 45 });
        expect(confetti).toHaveBeenCalledWith({ ...expectedObj, angle: 70 });
        expect(confetti).toHaveBeenCalledWith({ ...expectedObj, angle: 95 });
        expect(confetti).toHaveBeenCalledWith({ ...expectedObj, angle: 120 });
        expect(confetti).toHaveBeenCalledWith({ ...expectedObj, angle: 145 });
        expect(confetti).toHaveBeenCalledWith({ ...expectedObj, angle: 170 });
      }));
    });
  });
});
