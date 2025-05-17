import { Component, Input, SimpleChanges } from '@angular/core';
import { General } from '../../shared/general';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RayahenService } from '../../Services/rayahen.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  ticket: any;
  ticketId: any;
  constructor(
    public general : General,
    public rayahenService : RayahenService,
    public translate: TranslateService,
    public title: Title,
    public route : ActivatedRoute,
    public router : Router
  ){
    this.ticket = this.general.displayedTckt;
    if(!this.ticket){
      this.getTicket()
    }
    
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

  getTicket(){
    this.ticketId = this.route.snapshot.paramMap.get('id');
      this.rayahenService.getTicketById(this.ticketId).subscribe({
      next: (res) => {
        this.general.displayedTckt = res.body.ticket
        this.ticket = this.general.displayedTckt
        this.rayahenService.readTickt(this.ticketId).subscribe()
      }
    })
  }
  returnToTckts(){
    this.router.navigate(['/tickets'])
    this.general.openNavElmnt('tickets')
  }
}
