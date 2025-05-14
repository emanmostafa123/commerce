import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RayahenService } from '../../Services/rayahen.service';
import { DeclarationHelper } from '../../shared/DeclarationHelper';
import { General } from '../../shared/general';
import { Title } from '@angular/platform-browser';
import { ToastComponent } from '../toast/toast.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  imports: [
    CommonModule,
    TranslateModule,
    ToastComponent
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  
// @Input('mainTickets') mainTickets: any;
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
  activeArray: { isActive: boolean }[] = [];
  deactiveArray: { isActive: boolean }[] = [];
  toastMessage: any;
  toastBgColor: any;
  @ViewChild('toastRef') toastComponent!: ToastComponent;
  mainTickets: any;
  
  constructor(
    public translate: TranslateService,
    public rayahenService: RayahenService,
    public general: General,
    public router: Router,
    public title: Title
  ) {
    // Initialize any properties or services here if needed
    this.title.setTitle('Rayahen | Tickets');
    this.general.openNavElmnt('tickets')
    this.getAllTickets()

  }
  
  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      debugger
      this.getAllTickets()
    });
    // this.paging({pageIndex: 0, pageSize: 10}, this.mainTickets)
    // this.getTickets('all')
  }
  getNumberOfPages(array:any, pageSize: number) {
    this.numberOfPages = Math.ceil(array.length / pageSize);
    this.pagesArray = Array.from({ length: this.numberOfPages }, (_, i) => i + 1);

  }
  goToAddTicket(){
    this.router.navigate(['/addTicket'])
  }
  goToUpdTicket(id : any){
    this.router.navigate(['/updTicket/'+id])
  }
  getAllTickets(){
    this.rayahenService.getAllTickets().subscribe({
      next: (res) => {
      this.mainTickets = res.body
      this.tickets = this.mainTickets
      this.general.ticketsAdded = true
      this.general.showTckts = true
      this.activeArray = []
      this.deactiveArray = []
      this.mainTickets.forEach((ticket : any) => {
        if (ticket.isActive === true) this.activeArray.push(ticket as { isActive: boolean });
        if (ticket.isActive === false) this.deactiveArray.push(ticket as { isActive: boolean });
                      
      })
      this.getTickets('all')
      const activeCount = this.activeArray.length;
      const inactiveCount = this.deactiveArray.length;
      this.general.ticketsStatusCount = [
        {
          label : 'allTcktCount',
          count: this.mainTickets.length
        },
        {
          label : 'activeTckt',
          count: activeCount
        },
        {
          label : 'deactiveTckt',
          count: inactiveCount
        },
      ]
      },
      error:(err)=>{
        this.toastMessage = err.message
        this.toastBgColor = 'bg-danger'
        this.toastComponent.show();
      }
    })
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
          this.router.navigate(['/ticket', this.general.displayedTckt.id]);

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
    debugger
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
