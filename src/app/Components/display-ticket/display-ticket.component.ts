import { Component, Input, SimpleChanges } from '@angular/core';
import { General } from '../../shared/general';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RayahenService } from '../../Services/rayahen.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-display-ticket',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './display-ticket.component.html',
  styleUrl: './display-ticket.component.scss'
})
export class DisplayTicketComponent {
@Input('ticket') ticket: any;
  constructor(
    public general : General,
    public rayahenService : RayahenService,
    public translate: TranslateService,
    public title: Title
  ){
  }
  ngOnInit(): void {
    this.title.setTitle('Rayahen | Ticket' + this.ticket.id);
  }
  ngOnChanges(changes: SimpleChanges) {
        console.log(changes)

      if (changes['ticket'].currentValue != false) {
    this.title.setTitle('Rayahen | Ticket' + this.ticket.id);
      }
    }
  returnToTckts(){
    this.general.showSingleTckt = false;
    this.general.showTckts = true;
  }
}
