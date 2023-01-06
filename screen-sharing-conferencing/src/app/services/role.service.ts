import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  getRandomRole(): any {
    return 'presenter';
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
