import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RayahenService } from '../../Services/rayahen.service';
import { DeclarationHelper } from '../../shared/DeclarationHelper';
import { General } from '../../shared/general';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tickets',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  
@Input('mainTickets') mainTickets: any;
tickets: any[] = [];
  getTckts: any;
  currentPage = 1;
  pageSize = 10;
  allTickets: any;
  ticketsActive: any;
  ticketsDeactive: any;
  chosenTckt: any;
  numberOfPages: number | undefined;
  pagesArray: number[] | undefined;
  constructor(
    public translate: TranslateService,
    public rayahenService: RayahenService,
    public general: General,
    public title: Title
  ) {
    // Initialize any properties or services here if needed
    this.title.setTitle('Rayahen | Tickets');
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes['mainTickets']) {
      this.title.setTitle('Rayahen | Tickets');
      this.getTickets('all')

    }
  }
  ngoninit() {
    debugger
    this.paging({pageIndex: 0, pageSize: 10}, this.mainTickets)
    this.getTickets('all')
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.mainTickets
    });
  }
  getNumberOfPages(array:any, pageSize: number) {
    this.numberOfPages = Math.ceil(array.length / pageSize);
    this.pagesArray = Array.from({ length: this.numberOfPages }, (_, i) => i + 1);

  }
  getTickets(event :  any){
    debugger
    this.getTckts = event
    if(event == 'all'){
      this.allTickets = this.mainTickets
      this.getNumberOfPages(this.allTickets, this.pageSize)
      this.paging({pageIndex: 0, pageSize: 10} , this.allTickets)
    }else if(event == 'active'){
      this.ticketsActive = this.mainTickets.filter((ticket:any) => ticket.isActive == true)
      this.getNumberOfPages(this.ticketsActive, this.pageSize)
      this.paging({pageIndex: 0, pageSize: 10} , this.ticketsActive)

    }else if(event == 'deactive'){
      this.ticketsDeactive = this.mainTickets.filter((ticket:any) => ticket.isActive == false)
      this.getNumberOfPages(this.ticketsDeactive, this.pageSize)
      this.paging({pageIndex: 0, pageSize: 10} , this.ticketsDeactive)

    }
  }
  getTicketbyId(event: any) {
    this.rayahenService.getTicketById(event).subscribe({
      next: (res) => {
        this.general.displayedTckt = res.body.ticket
        this.general.showTckts = false;
        this.general.showreturnBtn = true
        this.general.showSingleTckt = true;
        // this.general.openModal('displayTcktModal')
        this.rayahenService.readTickt(event).subscribe()
      }
    })
  }
  updTckt(event:any){
    const ticket = Object.entries(event);
    console.log(ticket)
    ticket.forEach((element:any)=>{
      let control = element[0]
      let val = element[1]
      this.general.updTcktForm.controls[control].setValue(val)
    })
    this.general.openModal('updTcktModal')
  }
  paging(event: any,tickets:any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.tickets = tickets.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);  
  }
  prevPage(){
    if(this.getTckts == 'all'){
      this.allTickets = this.mainTickets
      this.paging({pageIndex: 0, pageSize: 10} , this.allTickets)
    }else if( this.getTckts == 'active'){
      this.ticketsActive = this.mainTickets.filter((ticket:any) => ticket.isActive == true)
      this.paging({pageIndex: 0, pageSize: 10} , this.ticketsActive)
    }else if( this.getTckts == 'deactive'){   
      this.ticketsDeactive = this.mainTickets.filter((ticket:any) => ticket.isActive == false)
      this.paging({pageIndex: 0, pageSize: 10} , this.ticketsDeactive)
    }
  }
  nextPage(){
    if(this.getTckts == 'all'){
      this.allTickets = this.mainTickets
      this.paging({pageIndex: 1, pageSize: 10} , this.allTickets)
    }else if( this.getTckts == 'active'){
      this.ticketsActive = this.mainTickets.filter((ticket:any) => ticket.isActive == true)
      this.paging({pageIndex: 1, pageSize: 10} , this.ticketsActive)
    }else if( this.getTckts == 'deactive'){   
      this.ticketsDeactive = this.mainTickets.filter((ticket:any) => ticket.isActive == false)
      this.paging({pageIndex: 1, pageSize: 10} , this.ticketsDeactive)
    }
  }
  getPageByNumber(pageNum : any){
    let pageIndex = pageNum - 1
    if(this.getTckts == 'all'){
      this.allTickets = this.mainTickets
      this.paging({pageIndex: pageIndex, pageSize: 10} , this.allTickets)
    }else if( this.getTckts == 'active'){
      this.ticketsActive = this.mainTickets.filter((ticket:any) => ticket.isActive == true)
      this.paging({pageIndex: pageIndex, pageSize: 10} , this.ticketsActive)
    }else if( this.getTckts == 'deactive'){   
      this.ticketsDeactive = this.mainTickets.filter((ticket:any) => ticket.isActive == false)
      this.paging({pageIndex: pageIndex, pageSize: 10} , this.ticketsDeactive)
    }
  }
}
