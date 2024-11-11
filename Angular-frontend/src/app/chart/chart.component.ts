import { Component } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  chartData = [
    { data: [10, 20, 30, 40], label: 'Patients' }
  ];
  chartLabels = ['Jan', 'Feb', 'Mar', 'Apr'];
  chartOptions = {
    responsive: true
  };
  chartType: string = 'bar'; // Specify the chart type
}
