import { Injectable } from '@angular/core';
import { ConferenceSetting } from '../models/conferenceSetting';
import { ConferenceUI } from '../models/conferenceUI';
import { Configuration } from '../models/configuration';
import { RoleService } from './role.service';
import { TechnologiesService } from './technologies.service';

@Injectable()
export class ServerService {
  transmissionSettings: ConferenceSetting = {
    mode: '',
    mobileFlag: false,
    transmissionStatus: 'off',
    selectedSharingOpt: ''
  };

  screenOptions: ConferenceUI[] = [
    {
      id: 'screen-1',
      title: 'Screen-1',
    },
    {
      id: 'screen-2',
      title: 'Screen-2',
    },
    {
      id: 'screen-3',
      title: 'Screen-3',
    },
  ];

  windowOptions: ConferenceUI[] = [
    {
      id: 'window-1',
      title: 'Window-1',
    },
    {
      id: 'window-2',
      title: 'Window-2',
    },
    {
      id: 'window-3',
      title: 'Window-3',
    },
  ];


  constructor(
    private techService: TechnologiesService,
    private roleService: RoleService
  ) {}

  initializeConnection(): Promise<Configuration> {
    return new Promise((resolve, reject) => {
      const role = this.getRole();
      const configRole = this.getConfigRole(role);
      this.resetTransmissionSettings();
      resolve({
        name: role,
        technologies: configRole,
      });
    });
  }

  resetTransmissionSettings(): void {
    this.transmissionSettings = {
      mode: '',
      mobileFlag: false,
      transmissionStatus: 'off',
      selectedSharingOpt: ''
    };
  }

  stopTransmission(): void {
    this.transmissionSettings.transmissionStatus = 'off';
  }

  resumeTransmission(): void {
    this.transmissionSettings.transmissionStatus = 'on';
  }

  finalizeconnection(selectedOpt: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.transmissionSettings.selectedSharingOpt = selectedOpt;
      this.transmissionSettings.transmissionStatus = 'on';
      resolve(true);
    });
  }

  checkSelectedTechnology(
    selectedTech,
    techs,
    mobileFlagSet = false
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.techService
        .checkTechStatus(selectedTech, techs)
        .then((res) => {
          this.transmissionSettings = Object.assign(this.transmissionSettings, {
            mobileFlag: mobileFlagSet,
            mode: res,
          });
          resolve(this.prepareTech(res, mobileFlagSet));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getRole(): any {
    return this.roleService.getRandomRole();
  }

  getConfigRole(role: string): any {
    return this.roleService.getConfigRole(role);
  }

  prepareTech(mode, mobileFlag = false): any {
    if (mode === 'VNC') {
      return {
        resolvedTech: mode,
        shareOpts: !mobileFlag ? {
          screens: this.screenOptions,
          windows: this.windowOptions
        } : null
      };
    } else if (mode === 'WebRTC') {
      return {
        resolvedTech: mode,
        shareOpts: {
          screens: this.screenOptions
        }
      };
    }

  }
}
