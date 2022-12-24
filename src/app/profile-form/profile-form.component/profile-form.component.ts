import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FetchHttpService, ProfileFormBody, State } from 'src/app/services/fetch-http.service/fetch-http.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  public states: State[] = [];
  public occupations: string[] = [];
  public submitClicked = false;
  public defaultState = 'Select a state';
  public defaultOccupation = 'Select an occupation';
  public profileForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    occupation: [this.defaultOccupation, Validators.required],
    state: [this.defaultState, Validators.required],
  });
  private subs = new Subscription();

  public get stateIsInvalid(): boolean {
    return ((this.submitClicked &&
      !!this.profileForm?.get('state')?.invalid) ||
      this.profileForm?.get('state')?.value !== this.defaultState);
  }

  public get occupationIsInvalid(): boolean {
    return ((this.submitClicked && 
      !!this.profileForm?.get('occupation')?.invalid) ||
      this.profileForm?.get('occupation')?.value !== this.defaultOccupation);
  }

  public get invalidFullNameText(): string {
    if (this.submitClicked) {
      const val = this.profileForm?.get('fullName')?.value;
      if (!val) {
        return 'A full name is required';
      }
      if (val.length < 4) {
        return 'Full name must be more than 3 characters';
      }
    }
    return '';
  }

  public get invalidPasswordText(): string {
    if (this.submitClicked) {
      const val = this.profileForm?.get('password')?.value;
      if (!val) {
        return 'A password is required';
      }
      if (val.length < 13) {
        return 'Password must be more than 13 characters';
      }
    }
    return '';
  }

  public get invalidEmailText(): string {
    if (this.submitClicked) {
      const val = this.profileForm?.get('email')?.value;
      if (!val) {
        return 'An email is required';
      }
      if (val.length < 7) {
        return 'Email must be more than 7 characters';
      }
      if (!val.includes('@')) {
        return 'Email must contain a @'
      }
      if (val[val.length - 1] === '@') {
        return 'Email cannot end with an @'
      }
    }
    return '';
  }

  constructor(
      private fb: FormBuilder,
      private fetchHttpService: FetchHttpService
    ) { }

  ngOnInit(): void {
    this.fetchHttpService.getOccupationsAndStates().subscribe(res => {
      this.states = res.states;
      this.occupations = res.occupations;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public allFieldsAreValid(): boolean {
    return !this.stateIsInvalid &&
          !this.occupationIsInvalid &&
          !this.invalidFullNameText &&
          !this.invalidPasswordText &&
          !this.invalidEmailText;
  }

  public getVal(controlName: string): string {
    return this.profileForm.get(controlName)?.value;
  }

  public onSubmit(): void {
    this.submitClicked = true;
    if (this.allFieldsAreValid()) {
      const requestBody: ProfileFormBody = {
        name: this.getVal('fullName'),
        email: this.getVal('email'),
        occupation: this.getVal('occupation'),
        state: this.getVal('state'),
        password: this.getVal('password')
      }
      console.log(requestBody);
      // this.fetchHttpService.submitTheForm(pF).subscribe();
    }
  }
}