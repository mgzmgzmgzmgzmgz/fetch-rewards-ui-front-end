import { HttpClientModule } from "@angular/common/http";
import { MockBuilder, MockInstance, MockRender, ngMocks } from "ng-mocks";
import { FetchHttpService, OccupationsAndStates } from "./fetch-http.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { anyAlphaString, getOccupationsAndStates, getProfileFormBody, getState } from "src/test-utils";
import { makeStateKey, TransferState } from "@angular/platform-browser";


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

    it('should set a value in the transfer state when the http call is made', () => {
      MockInstance(TransferState, 'set', jest.fn());
      const expectedRes: OccupationsAndStates = getOccupationsAndStates({
        occupations: [anyAlphaString(7), anyAlphaString(8)],
        states: [getState(), getState({ name: anyAlphaString(9), abbreviation: anyAlphaString(2) })]
      });
      const service = MockRender(FetchHttpService).point.componentInstance;
      const httpMock = ngMocks.findInstance(HttpTestingController);
      let actual;
      service.getOccupationsAndStates().subscribe(res => actual = res);

      const req = httpMock.expectOne('https://frontend-take-home.fetchrewards.com/form');
      req.flush(expectedRes);
      httpMock.verify();
      const transferState = ngMocks.get(TransferState);
      expect(transferState.set).toHaveBeenCalledTimes(1);
      expect(transferState.set).toBeCalledWith(makeStateKey<OccupationsAndStates>('occs_and_state'), actual);
    });

    it('should try and grab the value from the transfer state with the correct params', () => {
      MockInstance(TransferState, 'get', jest.fn());
      const service = MockRender(FetchHttpService).point.componentInstance;
      service.getOccupationsAndStates().subscribe();

      const transferState = ngMocks.get(TransferState);
      expect(transferState.get).toHaveBeenCalledTimes(1);
      expect(transferState.get).toHaveBeenCalledWith(makeStateKey<OccupationsAndStates>('occs_and_state'), undefined);
    });

    it('should return the stored state object as an observable when there is a stored value', () => {
      const occAndStates: OccupationsAndStates = getOccupationsAndStates({
        occupations: [anyAlphaString(7), anyAlphaString(8)],
        states: [getState(), getState({ name: anyAlphaString(9), abbreviation: anyAlphaString(2) })]
      });
      MockInstance(TransferState, 'get', jest.fn())
        .mockReturnValue(occAndStates);
      let actual;
      const service = MockRender(FetchHttpService).point.componentInstance;
      service.getOccupationsAndStates().subscribe(res => actual = res);

      expect(actual).toEqual(occAndStates);
    });

    it('should not make an http call when the transfer state has a value', () => {
      const occAndStates: OccupationsAndStates = getOccupationsAndStates({
        occupations: [anyAlphaString(7), anyAlphaString(8)],
        states: [getState(), getState({ name: anyAlphaString(9), abbreviation: anyAlphaString(2) })]
      });
      MockInstance(TransferState, 'get', jest.fn())
        .mockReturnValue(occAndStates);
      const service = MockRender(FetchHttpService).point.componentInstance;
      service.getOccupationsAndStates().subscribe();

      const httpMock = ngMocks.findInstance(HttpTestingController);
      httpMock.expectNone('https://frontend-take-home.fetchrewards.com/form');
      httpMock.verify();
    });
  });

  describe('submitTheForm', () => {
    it('should make a http get request with the correct url and return the expected value', () => {
      const expectedFormBody = getProfileFormBody();
      const expectedReturnValue = anyAlphaString(10);
      const service = MockRender(FetchHttpService).point.componentInstance;
      const httpMock = ngMocks.findInstance(HttpTestingController);
      let actual;
      service.submitTheForm(expectedFormBody).subscribe(res => actual = res);

      const req = httpMock.expectOne('https://frontend-take-home.fetchrewards.com/form');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedFormBody);
      req.flush(expectedReturnValue);
      httpMock.verify();
      expect(actual).toEqual(expectedReturnValue);
    });
  });
});
