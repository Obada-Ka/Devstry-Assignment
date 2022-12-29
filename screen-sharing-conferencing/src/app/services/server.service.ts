import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ServerService {
  constructor() { }

  initializeConnection(): Promise<Configuration> {
    return new Promise((resolve, reject) => {
      const role = this.getRandomRole();
      const configRole = this.getConfigRole(role);
      resolve({
        name: role,
        technologies: configRole
      });
    });
  }

  getRandomRole(): any {
    return Math.random() > 0.5 ? 'presenter' : 'participant';
  }

  getConfigRole(role: string): any {
    if (role === 'participant') {
      return null;
    }
    const config = Math.random() > 0.5 ? ['VNC', 'WebRTC'] : ['WebRTC', 'VNC'];
    return config;
  }

}

interface Configuration {
  name: string;
  technologies: string[];
}
