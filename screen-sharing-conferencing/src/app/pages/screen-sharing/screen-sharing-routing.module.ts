import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenSharingComponent } from './pages/screen-sharing/screen-sharing.component';


const routes: Routes = [
  {
    path: '',
    component: ScreenSharingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenSharingRoutingModule { }
