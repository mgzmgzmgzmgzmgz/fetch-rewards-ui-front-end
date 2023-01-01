import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import confetti from 'canvas-confetti';
import { Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'app-form-submitted',
  templateUrl: './form-submitted.component.html',
  styleUrls: ['./form-submitted.component.scss']
})
export class FormSubmittedComponent implements OnInit, OnDestroy {
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);
  private sub: Subscription = new Subscription();

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
    ) { }

  ngOnInit(): void {
    if (this.isBrowser) {
      let count = 20;
      this.sub.add(timer(20, 20).pipe(take(7)).subscribe(() => {
        confetti({
            angle: count,
            spread: 60,
            particleCount: 100,
            origin: { y: 0.5 }
        });
        count += 25;
      }));
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public startOver(): void {
    this.router.navigate([''])
  }
}
