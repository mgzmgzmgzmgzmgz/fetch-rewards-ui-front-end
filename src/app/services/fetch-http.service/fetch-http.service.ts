import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  constructor(private httpClient: HttpClient) { }

  public getOccupationsAndStates(): Observable<OccupationsAndStates> {
    return this.httpClient.get<OccupationsAndStates>('https://frontend-take-home.fetchrewards.com/form');
  }

  public submitTheForm(form: ProfileFormBody): Observable<any> {
    return this.httpClient.post('https://frontend-take-home.fetchrewards.com/form', form);
  }
}
