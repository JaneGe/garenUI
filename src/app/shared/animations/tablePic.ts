import {animate, state, style, transition, trigger} from "@angular/animations";

export const tablePic= trigger('imgMove', [
  state('off', style({ 'display': 'none', 'z-index': '0', 'transform': 'translateX(0)' })),
  state('prev', style({
    'z-index': '1',
    'transform': 'translateX(-100%)',
  })),
  state('next', style({ 'z-index': '2', 'transform': 'translateX(100%)' })),
  state('on', style({ 'z-index': '3', 'transform': 'translateX(0)' })),
  transition('prev=>on', [
    animate('0.3s ease-in'),
  ]),
  transition('next=>on', [
    animate('0.3s ease-in'),
  ]),
  transition('on=>prev', [
    animate('0.3s ease-in'),
  ]),
  transition('on=>next', [
    animate('0.3s ease-in'),
  ])
])
