import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { MasterfileService } from "src/app/services/graphql/masterfile.service";
@Component({
  selector: 'app-report-livestock',
  templateUrl: './report-livestock.component.html',
  styleUrls: ['./report-livestock.component.scss']
})
export class ReportLivestockComponent implements OnInit {

  dataSource = [];
  lsName = [];
  count = [];
  barchart = [];
  data: any = [];
  constructor(private dataService: MasterfileService,) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dataService.findAll().subscribe((result) => {
      this.dataSource = result.FindAllLivestock;
      this.lsName = this.dataSource.map((x) => x.livestockName);
      this.count = this.dataSource.map((x) => x.breedCount);
      // this.breed = this.dataSource.map((x => x.breeds.breedName))
      //   this.dataSource.map(x => x.breedCount)
      
      this.barchart = new Chart("canvas", {
        type: "bar",
        data: {
          labels: this.lsName,
          datasets: [
            {
              label: 'livestock',
              data: this.count,
              barPercentage: 10,
              barThickness: 50,
              maxBarThickness: 50,
              // minBarLength: 2,
              backgroundColor: "#e2863b",
             /*  backgroundColor: [
                "#ffa458",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
              ], */
              // borderColor: [
              //   "#dd4165",
              //   "#2b9fa0",
              //   "#9966FF",
              //   "#00a676",
              //   "#cd933e",
              // ],
              borderWidth: 1,
              borderSkipped: 'bottom',
              fill: true,
            },
          ],
        },
        options: {
          legend: {  
            display: false  
          },  
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true,
              ticks: {
                maxRotation: 0,
                minRotation: 0
              }
            }],
            yAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    });
  }
}
