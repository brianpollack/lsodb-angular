import { Component, OnInit } from '@angular/core';
import { ReportService } from "src/app/services/report/report.service";
import { Chart } from "chart.js";
@Component({
  selector: 'app-report-owner',
  templateUrl: './report-owner.component.html',
  styleUrls: ['./report-owner.component.scss']
})
export class ReportOwnerComponent implements OnInit {
  dataSource = [];
  lineChart = [];
  district: any;
  ownCount: any[];

  foods  = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  districtLists: any;
  dataCount: any = 0;
  birth: any;
  death: any;
  constructor(private report: ReportService) { 

    this.districtLists = [
      {
        name: "",
        ownCount: null,
        birth: null,
        death: null,
      }
    ]
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.report.getDistrict().subscribe(
      (res: any) => {
        this.dataSource = res.district;
        this.districtLists = res.district;
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

  onChange(e){
     this.dataCount = e.value
     
     console.log(this.dataCount)
  }

  birthChange(e){
    this.birth = e.value
  }

  deathChange(e){
    this.death = e.value
  }


}
