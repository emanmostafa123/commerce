import { Component } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  view: [number, number] = [700, 400];

  single = [
    { name: "Category A", value: 30 },
    { name: "Category B", value: 70 },
    { name: "Category C", value: 100 },
  ];

  showLegend = true;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  gradient = false;

  colorScheme: Color = {
    name: 'customScheme',
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
  constructor() {}
}
