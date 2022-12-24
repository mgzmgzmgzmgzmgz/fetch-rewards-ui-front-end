import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  constructor(private router: Router) { }

  public goToForm(): void {
    this.router.navigate(['profile-form'])
  }
}
