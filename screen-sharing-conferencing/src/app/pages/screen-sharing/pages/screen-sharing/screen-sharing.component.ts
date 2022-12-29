import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { TechnologiesService } from 'src/app/services/technologies.service';

@Component({
  selector: 'app-screen-sharing',
  templateUrl: './screen-sharing.component.html',
  styleUrls: ['./screen-sharing.component.css']
})

export class ScreenSharingComponent implements OnInit {
  @ViewChild('remoteVideo') remoteVideo: ElementRef;
  roleType;
  roleConfig;
  constructor(
    private serverService: ServerService,
    private techService: TechnologiesService
  ) { }

  ngOnInit(): void {
    this.initializeConnection();
  }

  async initializeConnection(): Promise<void> {
    const serverRes = await this.serverService.initializeConnection();
    this.roleType = serverRes.name;
    this.roleConfig = serverRes.technologies;
  }

  async checkTechnologies(): Promise<void> {
    const techRes = await this.techService.checkTechStatus(this.roleConfig);
    console.log(techRes);
  }
}
