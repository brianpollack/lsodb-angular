import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { MasterfileService } from "src/app/services/graphql/masterfile.service";
import { CountryService } from 'src/app/services/graphql/country.service';

@Component({
  selector: "app-master-dashboard",
  templateUrl: "./master-dashboard.component.html",
  styleUrls: ["./master-dashboard.component.scss"],
})
export class MasterDashboardComponent implements OnInit {
  dataSource = [];
  lsName = [];
  count = [];
  barchart = [];
  data: any = [];
  user = [];
  userCount: any;
  dounutChart = [];
  name: any[];
  breed: any;
  constructor(
    private dataService: MasterfileService,
    private countryService: CountryService
    ) {}

  ngOnInit() {
    this.getData();
    // this.getUser();
   
   
  }

  getData() {
    this.dataService.findAll().subscribe((result) => {
      this.dataSource = result.FindAllLivestock;
      this.lsName = this.dataSource.map((x) => x.livestockName);
      this.count = this.dataSource.map((x) => x.breedCount);
      this.breed = this.dataSource.map((x => x.breeds.breedName))
      //   this.dataSource.map(x => x.breedCount)
      console.log(
        "constructor get data",
        this.dataSource,
        this.lsName,
        this.count,
        this.breed
      );
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

 /*  getUser(){
    this.dataService.findUser().subscribe(
      res => {
        this.user =res.FindAllUsers;
        this.name = this.user.map(x => x.userName)
        this.userCount = this.user.length
        console.log("user",this.user, this.userCount, this.name)
      },)
      console.log(
        "constructor get data",
        this.dataSource,
        this.lsName,
        this.count
      );
      this.dounutChart = new Chart("donut", {
        type: "doughnut",
        data: {
          labels: this.lsName,
          datasets: [
            {
              data: this.count,
              barPercentage: 10,
              barThickness: 50,
              maxBarThickness: 50,
              // minBarLength: 2,
              backgroundColor: [
                "#ff809c",
                "#7ce6e5",
                "#EBE0FF",
                "#55edb9",
                "#ffde85",
              ],
              borderColor: [
                "#dd4165",
                "#2b9fa0",
                "#9966FF",
                "#00a676",
                "#cd933e",
              ],
              borderWidth: 1,
              borderSkipped: 'bottom',
              fill: true,
            },
          ],
        },
      })
  } */
}
