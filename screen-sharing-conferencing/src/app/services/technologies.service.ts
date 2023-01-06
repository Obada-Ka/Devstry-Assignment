import { Injectable } from '@angular/core';

@Injectable()
export class TechnologiesService {

  fullConfig = {
    VNC: this.VNCTech(),
    WebRTC: this.WEBRtcTech()
  };

  constructor() { }

  VNCTech(): boolean {
    return Math.random() > 0.5 ? true : false;
  }

  WEBRtcTech(): boolean {
    return Math.random() > 0.5 ? true : false;
  }

  checkTechStatus(selectedTech, techs): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.fullConfig[selectedTech]) {
        return resolve(selectedTech);
      }
      for (const tech of techs) {
        if (this.fullConfig[tech]) {
          return resolve(tech);
        }
      }
      return reject('Unresolved technologies !!');
    });
  }

}
