import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
} from '@angular/core';
import confetti from 'canvas-confetti';

import { Prize } from '../prize.type';

@Component({
  selector: 'app-prize-dialog',
  templateUrl: './prize-dialog.component.html',
  styleUrls: ['./prize-dialog.component.scss'],
})
export class PrizeDialogComponent implements AfterViewInit {
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() prize: Prize;

  constructor() {}

  ngAfterViewInit() {
    // Trigger the confetti when the component view is fully initialized.
    this.launchConfetti();
  }

  closeComponent() {
    this.closeDialog.emit(true);
  }

  launchConfetti() {
    confetti({
      particleCount: 500,
      spread: 100,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      const confettiCanvases = document.querySelectorAll('canvas');
      confettiCanvases.forEach((canvas) => {
        canvas.style.zIndex = '1050';
        canvas.style.position = 'absolute'; // or 'fixed'
      });
    }, 0);
  }
}
