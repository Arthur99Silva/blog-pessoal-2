import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';  // Importe o módulo do ngx-charts

@Component({
  selector: 'app-dashboard',
  standalone: true,   // Indica que o componente é standalone
  imports: [NgxChartsModule],  // Adicione aqui os módulos necessários
  template: `
    <ngx-charts-bar-vertical
      [results]="data"
      [scheme]="colorScheme"
      [xAxis]="true"
      [yAxis]="true"
      [gradient]="false"
      [showXAxisLabel]="true"
      [showYAxisLabel]="true"
      xAxisLabel="Autor"
      yAxisLabel="Quantidade de Posts">
    </ngx-charts-bar-vertical>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Dados de exemplo para o gráfico
  data: any[] = [
    { name: 'Autor A', value: 50 },
    { name: 'Autor B', value: 80 },
    { name: 'Autor C', value: 30 }
  ];

  // Definição de esquema de cores
  colorScheme: any = {
    name: 'customScheme',
    selectable: true,
    group: 'Ordinal',
    domain: ['#5AA454', '#E44D25', '#CFC0BB']
  };

  constructor() { }

  ngOnInit(): void {
    // Aqui você pode carregar os dados reais, possivelmente via um serviço
  }
}
