import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-screen-sharing',
  templateUrl: './screen-sharing.component.html',
  styleUrls: ['./screen-sharing.component.css']
})
export class ScreenSharingComponent implements OnInit {
  @ViewChild('remoteVideo') remoteVideo: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

}
