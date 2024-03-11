import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Prize } from '../prize.type';
import { FormControl } from '@angular/forms';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-wheel-design',
  templateUrl: './wheel-design.component.html',
  styleUrls: ['./wheel-design.component.scss'],
})
export class WheelDesignComponent implements OnInit {
  ngOnInit(): void {
    this.offsetValue = this.angle / 2 + 45;
    this.currentActiveItem = this.prizes.length - 1;
    this.tingSound.src = 'assets/ting.mpeg';
    this.winnerSound.src = 'assets/winner.mp3';
    this.tingSound.load();
    this.winnerSound.load();
    console.log(this.tingSound);
  }

  spinValue: number = 0;
  oldSpinValue: number = 0;
  offsetValue: number = 0;
  currentActiveItem: number = 0;
  selectedPrize: Prize | null = null;
  prizeDialogOpen: boolean = false;
  addedAnyPrize: boolean = false;
  angle: number = 45;
  sectorPath: string = '';
  inputField: FormControl = new FormControl(null);
  timeInterval: any;
  tingSound = new Audio();
  winnerSound = new Audio();

  prizes: Prize[] = [
    { name: 'Entry1', color: this.getColor(0) },
    { name: 'Entry2', color: this.getColor(1) },
    { name: 'Entry3', color: this.getColor(2) },
    { name: 'Entry4', color: this.getColor(3) },
    { name: 'Entry5', color: this.getColor(4) },
    { name: 'Entry6', color: this.getColor(5) },
    { name: 'Entry7', color: this.getColor(6) },
    { name: 'Entry8', color: this.getColor(7) },
  ];

  rotateWheel() {
    const randomNumber =
      Math.floor(Math.random() * (this.prizes.length - 1)) + 1;
    if (this.spinValue !== 0) {
      this.spinValue -= this.spinValue % 3600;
    }
    this.spinValue -= randomNumber * this.angle + 3600;
    this.highlightItem(randomNumber + 3600 / this.angle);

    this.selectedPrize = this.prizes[randomNumber - 1];
    this.offsetValue = this.angle / 2 + 45;
    setTimeout(() => {
      this.currentActiveItem = randomNumber - 1;
      clearInterval(this.timeInterval);
      this.prizeDialogOpen = true;
      this.winnerSound.play();
      // this.launchConfetti();
    }, 13500);
  }
  // launchConfetti() {
  //   confetti({
  //     particleCount: 150,
  //     spread: 70,
  //     origin: { y: 0.6 },
  //   });
  // }

  addNewItem() {
    if (!this.inputField.value) return;

    const newInputs = this.inputField.value
      .split(',')
      .map((el: string) => el.trim())
      .filter((el) => el);

    if (!this.addedAnyPrize) {
      this.addedAnyPrize = true;
      this.prizes = [];
      this.selectedPrize = null;
    }

    newInputs.forEach((el) => {
      this.prizes.push({
        name: el,
        color: this.getColor(this.prizes.length),
      });
    });

    this.angle = 360 / this.prizes.length;
    this.offsetValue = this.angle / 2 + 45;
    this.currentActiveItem = this.prizes.length - 1;
    this.inputField.reset();
  }

  getPieSlice(index: number) {
    if (this.prizes.length == 0) return null;

    const degreesPerSlice = 360 / this.prizes.length;
    const radiansPerSlice = (degreesPerSlice * Math.PI) / 180;
    let startAngle = radiansPerSlice * index - Math.PI;
    let endAngle = startAngle + radiansPerSlice;
    const largeArcFlag = radiansPerSlice > Math.PI ? '1' : '0';
    const radius = 16;
    const startX = Math.cos(startAngle) * radius;
    const startY = Math.sin(startAngle) * radius;
    const endX = Math.cos(endAngle) * radius;
    const endY = Math.sin(endAngle) * radius;
    return `M 0 0 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  }

  getColor(index: number) {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[index % colors.length];
  }

  highlightItem(angle: number) {
    this.timeInterval = setInterval(() => {
      this.tingSound.play();
      if (this.currentActiveItem === this.prizes.length - 1) {
        this.currentActiveItem = 0;
      } else {
        this.currentActiveItem++;
      }
    }, 13000 / angle);
  }

  deletePrize(index: number) {
    this.prizes.splice(index, 1);
    if (this.prizes.length === 0) {
      this.addedAnyPrize = false;
      this.prizes = [
        { name: 'Entry1', color: this.getColor(0) },
        { name: 'Entry2', color: this.getColor(1) },
        { name: 'Entry3', color: this.getColor(2) },
        { name: 'Entry4', color: this.getColor(3) },
        { name: 'Entry5', color: this.getColor(4) },
        { name: 'Entry6', color: this.getColor(5) },
        { name: 'Entry7', color: this.getColor(6) },
        { name: 'Entry8', color: this.getColor(7) },
      ];
    }
    this.angle = 360 / this.prizes.length;
    this.offsetValue = this.angle / 2 + 45;
    this.currentActiveItem = this.prizes.length - 1;
  }
}
