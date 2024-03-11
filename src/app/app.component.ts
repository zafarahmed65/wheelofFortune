import { Component, OnInit } from '@angular/core';
import { Prize } from './prize.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wheel-of-fortune';

  backgroundSound: HTMLAudioElement = new Audio();
  eventListener: any;

  ngOnInit(): void {
    this.playLoopSound();
  }

  playLoopSound() {
    this.backgroundSound.src = 'assets/melody.mp3';
    this.backgroundSound.loop = true;
    this.backgroundSound.load();
    this.eventListener = document.addEventListener('mouseup', () => {
      this.backgroundSound.play();
      removeEventListener('mouseup', this.eventListener);
    });
  }

  currentDate: string = new Date().toString();
}
