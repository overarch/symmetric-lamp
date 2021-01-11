import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss']
})
export class AnalogClockComponent implements OnInit, OnDestroy {

  @ViewChild('hrHand', { static: false }) hrHand: ElementRef;
  @ViewChild('minHand', { static: false }) minHand: ElementRef;
  @ViewChild('secHand', { static: false }) secHand: ElementRef;

  timerSubscription: Subscription;
  constructor() { }

  ngOnInit(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      const date = new Date();
      this.updateClock(date);
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  updateClock(date: Date): void {
    this.secHand.nativeElement.style.transform = `rotate(${(date.getSeconds() * 6)}deg)`;
    this.minHand.nativeElement.style.transform = `rotate(${(date.getMinutes() * 6)}deg)`;
    this.hrHand.nativeElement.style.transform = `rotate(${(date.getHours() * 30 + date.getMinutes() * 0.5)}deg)`;
  }
}
