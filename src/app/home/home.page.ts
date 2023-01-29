import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Pitch, PitchDetector } from 'capacitor-musetrainer-pitch-detection';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pitch: Pitch | null = null;

  constructor(private platform: Platform) {}

  init() {
    this.platform.ready().then(() => {
      PitchDetector.addListener('pitchReceive', (pitch) => {
        this.pitch = pitch;
      });
    });
  }
}
