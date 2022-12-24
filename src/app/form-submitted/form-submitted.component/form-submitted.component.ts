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
    this.sub.add(timer(200, 200).pipe(take(7)).subscribe(() => {
      confetti({
          angle: this.randomInRange(55, 125),
          spread: this.randomInRange(50, 70),
          particleCount: this.randomInRange(50, 100),
          origin: { y: 0.5 }
      });
    }));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
}

