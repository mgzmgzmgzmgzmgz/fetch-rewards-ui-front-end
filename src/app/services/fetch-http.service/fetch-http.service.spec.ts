import { HttpClientModule } from '@angular/common/http';
import { expect } from '@jest/globals';
import { ngMocks, MockBuilder, MockRender } from 'ng-mocks';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FetchHttpService, OccupationsAndStates } from './fetch-http.service';
import { anyAlphaString, getOccupationsAndStates, getProfileFormBody, getState } from 'src/test-utils';

describe('FetchHttpService', () => {
    beforeEach(() => MockBuilder(FetchHttpService).replace(HttpClientModule, HttpClientTestingModule));


  it('should be created', () => {
    const service = MockRender(FetchHttpService).point.componentInstance;
    expect(service).toBeTruthy();
  });

  describe('getOccupationsAndStates', () => {
    it('should make a http get request with the correct url and return the expected value', () => {
      const expectedRes: OccupationsAndStates = getOccupationsAndStates({
        occupations: [anyAlphaString(7), anyAlphaString(8)],
        states: [getState(), getState({ name: anyAlphaString(9), abbreviation: anyAlphaString(2) })]
      });
      const service = MockRender(FetchHttpService).point.componentInstance;
      const httpMock = ngMocks.findInstance(HttpTestingController);
      let actual;
      service.getOccupationsAndStates().subscribe(res => actual = res);

      const req = httpMock.expectOne('https://frontend-take-home.fetchrewards.com/form');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedRes);
      httpMock.verify();
      expect(actual).toEqual(expectedRes);
    });
  });

  describe('submitTheForm', () => {
    it('should make a http get request with the correct url and return the expected value', () => {
      const expectedFormBody = getProfileFormBody();
      const expectedReturnValue = anyAlphaString(10);
      const service = MockRender(FetchHttpService).point.componentInstance;
      const httpMock = ngMocks.findInstance(HttpTestingController);
      let actual;
      service.submitTheForm(expectedFormBody ).subscribe(res => actual = res);

      const req = httpMock.expectOne('https://frontend-take-home.fetchrewards.com/form');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedFormBody);
      req.flush(expectedReturnValue);
      httpMock.verify();
      expect(actual).toEqual(expectedReturnValue);
    });
  });
});
