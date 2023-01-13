import { ProfileFormComponent } from './profile-form.component';
import { MockInstance, ngMocks, MockBuilder, MockRenderFactory } from 'ng-mocks';
import { ProfileFormModule } from '../profile-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { FetchHttpService } from 'src/app/fetch-http.service/fetch-http.service';
import { of } from 'rxjs/internal/observable/of';
import { anyAlphaString, getOccupationsAndStates } from 'src/test-utils';

describe('ProfileFormComponent', () => {
  ngMocks.faster();
  MockInstance.scope('all');

  const render = MockRenderFactory(ProfileFormComponent);
  beforeAll(() => MockBuilder(ProfileFormComponent, [ProfileFormModule, AppModule])
    .keep(ReactiveFormsModule));
  beforeEach(() => {
    MockInstance(FetchHttpService, 'getOccupationsAndStates', jest.fn()).mockReturnValue(of(undefined));
  });

  it('should create', () => {
    const fixture = render();
    expect(fixture.point.componentInstance).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get the occupations and states from the fetch service', () => {
      MockInstance(FetchHttpService, 'getOccupationsAndStates', jest.fn())
        .mockReturnValue(of(getOccupationsAndStates()));
      const fixture = render();
      
      const fetchService = ngMocks.get(FetchHttpService);
      expect(fetchService.getOccupationsAndStates).toHaveBeenCalledTimes(1);
      expect(fetchService.getOccupationsAndStates).toHaveBeenCalledWith();
    });

    it('should display the occupations and states fetched from the service', () => {
      const expectedStatesAndOccs = getOccupationsAndStates({
        occupations: [
          anyAlphaString(3),
          anyAlphaString(4),
          anyAlphaString(8)
        ],
        states: [
          { name: anyAlphaString(6), abbreviation: anyAlphaString(2) },
          { name: anyAlphaString(6), abbreviation: anyAlphaString(2) }
        ]
      });
      MockInstance(FetchHttpService, 'getOccupationsAndStates', jest.fn())
        .mockReturnValue(of(expectedStatesAndOccs));
      const fixture = render();

      const states = ngMocks.find(fixture, '[data-testid=state-selector]').children;
      const occs = ngMocks.find(fixture, '[data-testid=occ-selector]').children;
      
      expect(states.length).toEqual(2);
      expect(states[0].nativeElement.text).toEqual(expectedStatesAndOccs.states[0].name);
      expect(states[1].nativeElement.text).toEqual(expectedStatesAndOccs.states[1].name);
      expect(occs.length).toEqual(3);
      expect(occs[0].nativeElement.text).toEqual(expectedStatesAndOccs.occupations[0]);
      expect(occs[1].nativeElement.text).toEqual(expectedStatesAndOccs.occupations[1]);
      expect(occs[2].nativeElement.text).toEqual(expectedStatesAndOccs.occupations[2]);
    });
  });

  // More unit tests should be written here, but I'm going to call it a day
});
