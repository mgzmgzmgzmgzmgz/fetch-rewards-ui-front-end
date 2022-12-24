import { ProfileFormComponent } from './profile-form.component';
import { MockInstance, ngMocks, MockBuilder, MockRenderFactory } from 'ng-mocks';
import { ProfileFormModule } from '../profile-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { FetchHttpService } from 'src/app/services/fetch-http.service/fetch-http.service';
import { of } from 'rxjs/internal/observable/of';

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
  })
});
