import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-screen-sharing',
  templateUrl: './screen-sharing.component.html',
  styleUrls: ['./screen-sharing.component.css'],
})

export class ScreenSharingComponent implements OnInit {

  roleType;
  roleConfig;
  uiOpts;
  techSelected = '';
  controlBtnLabel = 'Start';
  mode = '';
  transmissionActive = false;
  transmissionBtnStatus = false;
  mobileFlag = false;
  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.initializeConnection();
  }

  async handleConnectionBtn(): Promise<void> {
    this.transmissionBtnStatus = !this.transmissionBtnStatus;
    if (this.transmissionActive) {
      this.stopConnection();
    } else {
      await this.initializeConnection();
      this.checkTechnologies();
    }
    this.handleConnectionBtnLabel();
  }

  async initializeConnection(): Promise<void> {
    const serverRes = await this.serverService.initializeConnection();
    this.roleType = serverRes.name;
    this.roleConfig = serverRes.technologies;
  }

  stopConnection(): void {
    this.transmissionActive = false;
    this.serverService.stopTransmission();
  }

  async checkTechnologies(): Promise<void> {
    this.mobileFlag = this.techSelected === 'VNC' && Math.random() > 0.5 ? true : false;
    await this.serverService
      .checkSelectedTechnology(this.techSelected, this.roleConfig, this.mobileFlag)
      .then(async (res) => {
        console.log(res);
        this.uiOpts = res.shareOpts ? res.shareOpts : null;
        this.techSelected = res.resolvedTech;
        this.mode = res.resolvedTech;
        if (this.mobileFlag && this.techSelected === 'VNC') {
          const label = {
            title: 'Mobile Display'
          };
          await this.serverService.finalizeconnection(label).then((res) => {
            this.transmissionActive = true;
            this.handleConnectionBtnLabel();
            Swal.fire({
              text: 'Transmission is activted successfully with Mobile Display',
              timer: 5000
            });
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
      });
  }

  handleTechs($event): void {
    this.techSelected = $event.target.value;
  }

  handleConnectionBtnLabel(): void {
    this.controlBtnLabel = this.transmissionActive ? 'Stop' : 'Start';
  }

  async getSelectedScreen($event): Promise<void> {
    await this.serverService.finalizeconnection($event).then((res) => {
      this.transmissionActive = true;
      this.handleConnectionBtnLabel();
      Swal.fire({
        text: 'Transmission is activted successfully with ' + this.serverService.transmissionSettings.selectedSharingOpt.title,
        timer: 5000
      });
    });
  }
}
