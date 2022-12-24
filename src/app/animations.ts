import { trigger, transition, style, query, group, animate } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('welcome-page => profile-form', [
      query(':enter, :leave', [
        style({ position: 'absolute', top: 0, left: 0, width: '100%' })
      ]),
      query(':enter', [ style({ left: '100%' }) ]),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '-100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ]),
      ]),
    ]),
    transition('profile-form => welcome-page', [
      query(':enter, :leave', [
        style({ position: 'absolute', top: 0, left: 0, width: '100%' })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ]),
      ]),
    ]),
    transition('profile-form => form-submitted', [
        query(':enter, :leave', [
          style({ position: 'absolute', top: 0, left: 0, width: '100%' })
        ]),
        query(':enter', [ style({ left: '100%' }) ]),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '-100%' }))
          ]),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%' }))
          ]),
        ]),
      ]),
    transition('form-submitted => profile-form', [
        query(':enter, :leave', [
            style({ position: 'absolute', top: 0, left: 0, width: '100%' })
        ]),
        query(':enter', [
            style({ left: '-100%' })
        ]),
        group([
        query(':leave', [
            animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
            animate('300ms ease-out', style({ left: '0%' }))    
        ]),
        ]),
    ]),
  ]);