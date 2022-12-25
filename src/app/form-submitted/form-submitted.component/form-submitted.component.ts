import { Component, OnDestroy, OnInit } from '@angular/core';
import confetti from 'canvas-confetti';
import { Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'app-form-submitted',
  templateUrl: './form-submitted.component.html',
  styleUrls: ['./form-submitted.component.scss']
})
export class FormSubmittedComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
