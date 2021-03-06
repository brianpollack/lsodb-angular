import { Component, OnInit } from "@angular/core";
import { ReportService } from "src/app/services/report/report.service";
import { Chart } from "chart.js";
@Component({
  selector: "app-tacking-dashboard",
  templateUrl: "./tacking-dashboard.component.html",
  styleUrls: ["./tacking-dashboard.component.scss"],
})
export class TackingDashboardComponent implements OnInit {
  dataSource = [];
  lineChart = [];
  district: any;
  ownCount: any[];

  constructor(private report: ReportService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.report.getDistrict().subscribe(
      (res: any) => {
        this.dataSource = res.district;
        this.district = this.dataSource.map((x) => x.name);
        this.ownCount = this.dataSource.map((x) => x.ownCount);
        console.log(this.dataSource,this.district,this.ownCount);

        this.lineChart = new Chart("canvas", {
          type: "horizontalBar",
          data: {
            labels: this.district,
            datasets: [
              {
                labelString: "Districts", 
                data: this.ownCount,
                borderColor: "#e2863b",
                backgroundColor: "#e2863b",
                fill: false,
                borderWidth: 2,
                borderCapStyle: "square",
                borderJoinStyle: "miter",
                pointBackgroundColor: "#ffa600",
                pointBorderColor: "#ffa600",
                pointStyle: 'circle',
                // steppedLine: true
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            legend: {  
              display: false  
            },  
            scales: { 
              display: true,
              // labelString: "Districts", 
              xAxes: [{  
                // display: false,
                ticks: {
                  // display: false,
                  fontColor: "#000",
                  fontStyle: "initial"
                },  
              }],  
              yAxes: [{  
                ticks: {
                  // display: false,
                  beginAtZero: true
                },
                // display: false  
              }],  
            }  
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );

   
  }
}
