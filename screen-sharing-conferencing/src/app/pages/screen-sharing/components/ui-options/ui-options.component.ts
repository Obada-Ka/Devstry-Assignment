import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ui-options',
  templateUrl: './ui-options.component.html',
  styleUrls: ['./ui-options.component.css']
})
export class UiOptionsComponent implements OnInit {
  @Input() options: ShareOpts;
  @Input() mobileFlag: boolean;
  @Input() mode: string;
  @Output() screenSelected = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.mode);
  }

  selectScreen(): void {
    Swal.fire({
      input: 'select',
      inputOptions: this.options.screens.map((item: any) => {
        return item.title;
      }),
      inputPlaceholder: 'Select Screen from dropdown',
      showCancelButton: true,
    }).then((res) => {
      this.screenSelected.emit(this.options.screens[res.value]);
    });
  }

  selectWindow(): void {
    Swal.fire({
      input: 'select',
      inputOptions: this.options.windows.map((item: any) => {
        return item.title;
      }),
      inputPlaceholder: 'Select Window from dropdown',
      showCancelButton: true,
    }).then((res) => {
      this.screenSelected.emit(this.options.windows[res.value]);
    });
  }

}

interface ShareOpts {
  screens: [];
  windows: [];
}
