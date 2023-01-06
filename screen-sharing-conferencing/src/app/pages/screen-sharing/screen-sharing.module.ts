import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenSharingRoutingModule } from './screen-sharing-routing.module';
import { ScreenSharingComponent } from './pages/screen-sharing/screen-sharing.component';
import { ServerService } from 'src/app/services/server.service';
import { TechnologiesService } from 'src/app/services/technologies.service';
import { RoleService } from 'src/app/services/role.service';
import { UiCanvasComponent } from './components/ui-canvas/ui-canvas.component';
import { UiOptionsComponent } from './components/ui-options/ui-options.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ScreenSharingComponent, UiCanvasComponent, UiOptionsComponent],
  imports: [CommonModule, FormsModule, ScreenSharingRoutingModule],
  providers: [ServerService, RoleService, TechnologiesService],
})
export class ScreenSharingModule {}
