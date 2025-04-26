import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { RayahenService } from '../../Services/rayahen.service';
import { enableRtl } from '@syncfusion/ej2-base';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AccumulationChartComponent, AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { ToastComponent } from '../toast/toast.component';
import { General } from '../../shared/general';

// ✅ Interface for chart data
interface single {
  name: string;
  value: number;
}

// ✅ Interface for issue object
interface mainTickets {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdByUser: number;
  userNameCreated: string;
  typeOfIssueId: number;
  typeOfIssue: string;
  priority: number;
  createdOn: string;
  isActive: boolean;
  readFlg: boolean;
}
interface Ticket {
  id: number;
  title: string;
  isActive: boolean;
  // add other fields as needed
}
enableRtl(true);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NgxChartsModule, TranslateModule, CommonModule, AccumulationChartModule, ToastComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})

export class ChartsComponent implements AfterViewInit {
  @ViewChild('pieChart') pieChart: AccumulationChartComponent | undefined;

  view: [number, number] = [700, 400];
  lineChartData: any[] = []

  barChartData: any[] = [];
  pieChartData: any[] = [];

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#28a745', '#dc3545'] // green (active), red (inactive)
  };

  colorSchemePie: Color = {
    name: 'customColorScheme',
    selectable: true,
    group: ScaleType.Ordinal,  // Correct usage of ScaleType
    domain: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#17a2b8', '#fd7e14']    // green for active, red for inactive
  };
  @ViewChild('toastRef') toastComponent!: ToastComponent;

  displaydata:boolean = false;
  mainTickets: mainTickets[] = [];
  tickets: any;
  activeArray: Ticket[] = [];
  deactiveArray: Ticket[] = [];
  chartsCountArray: any[] = []
  allIssues: any;
  toastMessage: any;
  toastBgColor: string | undefined;
  lowprtyArray: any[] = []
  mdmprtyArray: any[] = []
  highprtyArray: any[] = []
  constructor(
    public rayahenService: RayahenService,
    public translate: TranslateService,
    public general: General,
  ) {
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getAllTickets()
    });
  }
  ngAfterViewInit() {
    // Optional: refresh initially
    this.refreshChart()
  }
  refreshChart() {
    this.getAllTickets()
  }

  groupByTypeOfIssue(data: any[]): Record<string, any[]> {
    return data.reduce((acc, item) => {
      acc[item.typeOfIssue] = acc[item.typeOfIssue] || [];
      acc[item.typeOfIssue].push(item);
      return acc;
    }, {} as Record<string, any[]>);
  }

  getAllTickets() {
    this.rayahenService.getAllTickets().subscribe({
      next: (res) => {
        debugger
        this.displaydata = true
        this.activeArray = []
        this.deactiveArray = []
        this.highprtyArray = []
        this.mdmprtyArray = []
        this.lowprtyArray = []
        this.mainTickets = res.body
        this.mainTickets.forEach((ticket: any) => {
          if (ticket.isActive == true) this.activeArray.push(ticket)
          if (ticket.isActive == false) this.deactiveArray.push(ticket)
          if (ticket.priority == 1) this.highprtyArray.push(ticket)
          if (ticket.priority == 2) this.mdmprtyArray.push(ticket)
          if (ticket.priority == 3) this.lowprtyArray.push(ticket)
                        
        })
        const activeCount = this.activeArray.length;
        const inactiveCount = this.deactiveArray.length;
        console.log('activeCount', activeCount)
        console.log('inactiveCount', inactiveCount)
        this.barChartData = [
          { name: this.translate.instant('tickets.tcktsCrd.active'), value: activeCount },
          { name: this.translate.instant('tickets.tcktsCrd.deactive'), value: inactiveCount }
        ];
        const grouped = this.groupByTypeOfIssue(this.mainTickets);
        this.pieChartData = Object.entries(grouped).map(([type, items]) => ({
          name: type,
          value: items.length
        }));
        this.chartsCountArray = [
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
          {
            label : 'highPrtyTckt',
            count: this.highprtyArray.length
          },
          {
            label : 'mediumPrtyTckt',
            count: this.mdmprtyArray.length
          },
          {
            label : 'lowPrtyTckt',
            count: this.lowprtyArray.length
          }

        ]
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
      error: (err) => {
        this.displaydata = false
        this.toastMessage = err.message
        this.toastBgColor = 'bg-danger'
        this.toastComponent.show();
      }
    })
  }
}