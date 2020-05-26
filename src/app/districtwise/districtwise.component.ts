/* Backend type script for districtwise.html */
import { Component, OnInit } from '@angular/core';
import { DataService } from '../Service/Data.Service';
import { ActivatedRoute, Router } from '@angular/router';
import { Statewise } from '../Model/Statewise';
import { Districtwise } from '../Model/Districtwise';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-districtwise',
  templateUrl: './districtwise.component.html',
  styleUrls: ['./districtwise.component.scss']
})
export class DistrictwiseComponent implements OnInit {
  
  /*Variables for storing fetched data */
  state: string;
  states: Districtwise[] = [];
  Zones: Districtwise[] = [];
  ok: boolean = false;
 
  /*Variables for storing Redzone related data*/
  RedZoneConfirmed:number[] = []
  RedZoneRecovered:number[] = []
  RedZoneDeaths:number[] = []
  RedZoneDistrict:string[] = []

  /*Variables for storing Green Zone Data */
  GreenZoneConfirmed:number[] = []
  GreenZoneRecovered:number[] = []
  GreenZoneDeaths:number[] = []
  GreenZoneDistrict:string[] = []

  /*Variables for storing Orange Zone data  */
  OrangeZoneConfirmed:number[] = []
  OrangeZoneRecovered:number[] = []
  OrangeZoneDeaths:number[] = []
  OrangeZoneDistrict:string[] = []

  statecode: string;
  data: Districtwise[] = [];
  summary: Statewise ;
  errorcode: string;
  message: string;

  constructor(private dataservice: DataService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    /* Storing value passed through routing */
    this.state = this.route.snapshot.params.state;

    /* To fetch district wise data  */
    this.dataservice.GetDistrictwise().subscribe((response)=>{
      
      this.data = response[this.state]['districtData'];
      /*To ftch statecode */
      this.statecode =  response[this.state]['statecode']
      /*Extracting value from key value pair */
      for(var key in this.data)
      { 
        this.data[key].district = key;
        this.states.push(this.data[key]);
      }
      
      /*Error Handling */
    },(error)=>{
      if(error['status']=='400')
      {this.errorcode = '400';
      this.message = 'Bad Request'}
      if(error['status']=='404')
      {this.errorcode = '404';
      this.message = 'Page Not Found'}
      if(error['status']=='500')
      {this.errorcode = '500';
      this.message = 'Internal Server Error'}
      if(error['status']=='503')
      {this.errorcode = '503';
      this.message = 'Service Unavailable'}
       this.ok = true;
    })
    /*To store summary of that state */
    this.dataservice.GetStatewiseData().subscribe((response)=>{
      this.summary  = response['statewise'].find(x=>x.state==this.state)
      this.summary.state=this.state;
    },(error)=>{
      if(error['status']=='400')
      {this.errorcode = '400';
      this.message = 'Bad Request'}
      if(error['status']=='404')
      {this.errorcode = '404';
      this.message = 'Page Not Found'}
      if(error['status']=='500')
      {this.errorcode = '500';
      this.message = 'Internal Server Error'}
      if(error['status']=='503')
      {this.errorcode = '503';
      this.message = 'Service Unavailable'}
      
    })
    
    /*To fetch zone of each district */
    this.dataservice.GetDistrictZone().subscribe((response)=>{
     this.Zones= response['zones'] 
     
     /*For loop for filtering districts into different zones and grouping them  */
     for(var i =0;i<this.states.length;i++)
     {
       for(var j=0 ; j<this.Zones.length;j++)
       {
         if(this.Zones[j].district !=null)
         {
         if((this.states[i].district==this.Zones[j].district)&&(this.statecode == this.Zones[j].statecode))
         {
           if(this.Zones[j].zone=="Red")
           {
             this.states[i].zone = "Red";
             this.RedZoneDistrict.push(this.states[i].district)
             this.RedZoneRecovered.push(+this.states[i].recovered)
             this.RedZoneDeaths.push(+this.states[i].deceased)
             this.RedZoneConfirmed.push(+this.states[i].active)
           }
           else{
             if(this.Zones[j].zone=="Green")
             {
              this.states[i].zone = "Green";
              this.GreenZoneDistrict.push(this.states[i].district)
              this.GreenZoneRecovered.push(+this.states[i].recovered)
             this.GreenZoneDeaths.push(+this.states[i].deceased)
             this.GreenZoneConfirmed.push(+this.states[i].active)
             }
             else{
               if(this.Zones[j].zone =="Orange")
               {
                this.states[i].zone = "Orange";
                this.OrangeZoneDistrict.push(this.states[i].district)
                this.OrangeZoneRecovered.push(+this.states[i].recovered)
                this.OrangeZoneDeaths.push(+this.states[i].deceased)
                this.OrangeZoneConfirmed.push(+this.states[i].active)
            }
             }
           }
         }
        }
       }
     }
     },
     /*Error Handling*/
     (error)=>
     {
      if(error['status']=='400')
      {this.errorcode = '400';
      this.message = 'Bad Request'}
      if(error['status']=='404')
      {this.errorcode = '404';
      this.message = 'Page Not Found'}
      if(error['status']=='500')
      {this.errorcode = '500';
      this.message = 'Internal Server Error'}
      if(error['status']=='503')
      {this.errorcode = '503';
      this.message = 'Service Unavailable'}
      this.ok = true;
     });     
  }
   
  /*Green Zone Chart */
  GreenZoneChartOptions: ChartOptions = {
    responsive: true,
  };
  GreenZoneChartLabels: Label[] = this.GreenZoneDistrict;
  GreenZoneChartType: ChartType = 'bar';
  GreenZoneChartLegend = true;
  GreenZoneChartPlugins = [];

  GreenZoneChartData: ChartDataSets[] = [
    { data: this.GreenZoneConfirmed, label: 'Active',stack:'a' },
    { data: this.GreenZoneRecovered, label: 'Recovered',stack:'a' },
    { data: this.GreenZoneDeaths, label: 'Deaths',stack:'a' },
  ];

  /*Red Zone Chart */
  RedZoneChartOptions: ChartOptions = {
    responsive: true,
  };
  RedZoneChartLabels: Label[] = this.RedZoneDistrict;
  RedZoneChartType: ChartType = 'bar';
  RedZoneChartLegend = true;
  RedZoneChartPlugins = [];

  RedZoneChartData: ChartDataSets[] = [
    { data: this.RedZoneConfirmed, label: 'Active',stack:'a' },
    { data: this.RedZoneRecovered, label: 'Recovered',stack:'a' },
    { data: this.RedZoneDeaths, label: 'Deaths',stack:'a' },
  ];

  /*Orange zone Chart */
  OrangeZoneChartOptions: ChartOptions = {
    responsive: true,
  };
  OrangeZoneChartLabels: Label[] = this.OrangeZoneDistrict;
  OrangeZoneChartType: ChartType = 'bar';
  OrangeZoneChartLegend = true;
  OrangeZoneChartPlugins = [];

  OrangeZoneChartData: ChartDataSets[] = [
    { data: this.OrangeZoneConfirmed, label: 'Active',stack:'a' },
    { data: this.OrangeZoneRecovered, label: 'Recovered',stack:'a' },
    { data: this.OrangeZoneDeaths, label: 'Deaths',stack:'a' },
  ];
}
