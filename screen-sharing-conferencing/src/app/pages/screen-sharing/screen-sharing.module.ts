import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenSharingRoutingModule } from './screen-sharing-routing.module';
import { ScreenSharingComponent } from './pages/screen-sharing/screen-sharing.component';


@NgModule({
  declarations: [ScreenSharingComponent],
  imports: [
    CommonModule,
    ScreenSharingRoutingModule
  ]
})
export class ScreenSharingModule { }
