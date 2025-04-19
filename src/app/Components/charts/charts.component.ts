import { Component } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { RayahenService } from '../../Services/rayahen.service';

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

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})

export class ChartsComponent {
  view: [number, number] = [700, 400];

  // single = [
  //   { name: "Category A", value: 30 },
  //   { name: "Category B", value: 70 },
  //   { name: "Category C", value: 100 },
  // ];

  showLegend = true;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  gradient = false;

  colorScheme: Color = {
    name: 'custوomScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  viewline: [number, number] = [700, 400]; // Chart dimensions

  multi = [
    {
      "name": "Sales",
      "series": [
        { "name": "2020", "value": 50 },
        { "name": "2021", "value": 80 },
        { "name": "2022", "value": 65 },
        { "name": "2023", "value": 120 }
      ]
    },
    {
      "name": "Revenue",
      "series": [
        { "name": "2020", "value": 30 },
        { "name": "2021", "value": 60 },
        { "name": "2022", "value": 75 },
        { "name": "2023", "value": 100 }
      ]
    }
  ];


  showLegendline = true;
  showXAxis = true;
  showYAxis = true;
  showGridLines = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';
  curveType = "Linear"; // Curve type (default: Linear)

  // Define color scheme correctly
  colorSchemeline: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal, // Correct way to define ScaleType
    domain: ['#007bff', '#28a745', '#dc3545', '#ffc107']
  };
  mainTickets: mainTickets[] = [];
  single: single[] = [];
  tickets: any;
  constructor(
    public rayahenService: RayahenService
  ) {

    this.getAllTickets()

  }

  ngOnInit(): void {
    this.mainTickets = this.mainTickets; 
    this.single = this.transformData(this.mainTickets);
    console.log(this.single)
  }


  transformData(issues: mainTickets[]): single[] {
    const groupMap = new Map<string, number>();
    for (const issue of issues) {
      const key = issue.typeOfIssue;
      groupMap.set(key, (groupMap.get(key) || 0) + 1);
    }
    return Array.from(groupMap.entries()).map(([name, value]) => ({ name, value }));
  }
  getAllTickets() {
    let token = localStorage.getItem('token')
    this.rayahenService.getAllTickets(token).subscribe((res) => {
      this.mainTickets = res.body
      this.tickets = this.mainTickets
      console.log(this.mainTickets)
    })
  }
}
