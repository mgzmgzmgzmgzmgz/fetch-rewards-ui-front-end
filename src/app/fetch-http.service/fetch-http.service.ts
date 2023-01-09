import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, of, tap } from 'rxjs';

export interface State {
  name: string;
  abbreviation: string;
}

export interface OccupationsAndStates {
  occupations: string[];
  states: State[];
}

export interface ProfileFormBody {
  name: string;
  password: string;
  email: string;
  occupation: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class FetchHttpService {
  private readonly OCC_AND_STATE_KEY = makeStateKey<OccupationsAndStates>('occs_and_state');

  constructor(
    private httpClient: HttpClient,
    private transferState: TransferState
    ) { }

  public getOccupationsAndStates(): Observable<OccupationsAndStates> {
    const stateVal = this.transferState.get(this.OCC_AND_STATE_KEY, undefined);
    const httpCall = this.httpClient.get<OccupationsAndStates>('https://frontend-take-home.fetchrewards.com/form').pipe(tap(res => this.transferState.set(this.OCC_AND_STATE_KEY, res)));
    return stateVal ? of(stateVal) : httpCall;
  }

  public submitTheForm(form: ProfileFormBody): Observable<any> {
    return this.httpClient.post('https://frontend-take-home.fetchrewards.com/form', form);
  }
}
