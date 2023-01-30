import { ChangeDetectorRef, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PitchDetector } from 'capacitor-musetrainer-pitch-detection';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  note = '';
  status = '';

  constructor(private platform: Platform, private ref: ChangeDetectorRef) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 100);
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      PitchDetector.requestPermissions().then((status) => {
        this.status = status.microphone;
        if (status.microphone === 'granted') {
          PitchDetector.addListener('pitchReceive', (pitch) => {
            this.note = `${pitch.note} / ${pitch.noteAlt}`;
          });
        }
      });
    });
  }
}
