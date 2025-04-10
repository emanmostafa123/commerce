import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements AfterViewInit {


  public show(): void {
    this.toastInstance.show();
  }
@Input('message') message: any;
@Input('bgColor') bgColor: any;
@ViewChild('toastElement') toastEl!: ElementRef;
  toastInstance: any;

ngAfterViewInit(): void {
  this.toastInstance = new Toast(this.toastEl.nativeElement, {
    animation: true,
    autohide: true,
    delay: 3000,
  });
}

}
