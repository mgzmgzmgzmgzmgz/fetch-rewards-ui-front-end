import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs/internal/observable/timer';
import { take } from 'rxjs/internal/operators/take';
import { Subscription } from 'rxjs/internal/Subscription';
import confetti from 'canvas-confetti';

export interface Pages {
  welcome: Page;
  badRoute: Page;
  formSubmitted: Page;
}

export interface Page {
  headerText: string;
  pText: string;
  buttonText: string;
  routerUrl: string;
}

@Component({
  selector: 'app-title-para-button',
  templateUrl: './title-para-button.component.html'
})
export class TitleParaButtonComponent implements OnInit, OnDestroy {
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);
  private sub: Subscription = new Subscription();
  private currentPage: 'welcome' | 'badRoute' | 'formSubmitted' = 'welcome';
  private readonly pages: Pages = {
    welcome: {
      headerText: 'Welcome!',
      pText: 'Are you ready to fill out a form',
      buttonText: 'Click Here To Go To The Form!',
      routerUrl: 'profile-form'
    },
    badRoute: {
      headerText: 'Woops!',
      pText: 'Looks like nothing\'s here',
      buttonText: 'Click Here To Go To The Form!',
      routerUrl: 'profile-form'
    },
    formSubmitted: {
      headerText: '🎉Congrats!🎉',
      pText: 'You successfully submitted a form!',
      buttonText: 'Click Here To Start Over',
      routerUrl: ''
    }
  }

  public get page(): Page {
    return this.pages[this.currentPage || 'welcome'];
  }

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
    this.setCurrentPage();

    if (this.currentPage === 'formSubmitted' && this.isBrowser) {
      this.fireConfetti();
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public goToPage(): void {
    this.router.navigate([this.page.routerUrl]);
  }

  private setCurrentPage(): void {
    const url = this.router.url;
    if (url === '/') {
      this.currentPage = 'welcome';
      return;
    }
    if (url === '/form-submitted') {
      this.currentPage = 'formSubmitted';
      return;
    }
    this.currentPage = 'badRoute';
  }

  private fireConfetti(): void {
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
