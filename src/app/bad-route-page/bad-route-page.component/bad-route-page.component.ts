import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bad-route-page',
  templateUrl: './bad-route-page.component.html',
  styleUrls: ['./bad-route-page.component.scss']
})
export class BadRoutePageComponent {
  constructor(private router: Router) { }

  public goToForm(): void {
    this.router.navigate(['profile-form'])
  }
}
