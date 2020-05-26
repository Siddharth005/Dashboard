/* Importing  Required Packages  */
import { Component, OnInit } from '@angular/core';
import {DataService} from '../Service/Data.Service'
import {Statewise} from '../Model/Statewise'
import { Timeseries } from '../Model/timeseries';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worlddata',
  templateUrl: './worlddata.component.html',
  styleUrls: ['./worlddata.component.scss']
})


export class WorlddataComponent implements OnInit {
  
  summary: Statewise;
  states: Statewise[] =[];
  timeseries:Timeseries[] = []
  timeseries1:Timeseries[] = [] 
  tested: number;
  statewise: boolean = true;
  ok: boolean = false;
  daywise: boolean = false;
  visuals: boolean = false;
  confirmed: number[]=[];
  deceased: number[]=[];
  dailycases: number[]=[];
  Recovered: number[] = [];
  days: string[]=[];
  errorcode: string;
  message: string;
  

  constructor( private dataservice : DataService ,private router:Router) { }

  ngOnInit() {
    
    /* Fetching statewise data from api */ 
    this.dataservice.GetStatewiseData().subscribe((response)=>{
      
      /* to store values of summary of covid cases in summary variable */
      this.summary = response['statewise'][0]
      this.timeseries1 = response['cases_time_series']

      /* For loop for storing class data into individual array later to use to  plot graphs */
      for(let i=0;i <this.timeseries1.length;i++)
      {
        
        this.Recovered[i] = this.timeseries1[i].dailyrecovered
        this.days[i] = this.timeseries1[i].date;
        this.confirmed[i] = +this.timeseries1[i].totalconfirmed;
        this.deceased[i] = +this.timeseries1[i].dailydeceased;
        this.dailycases[i] = +this.timeseries1[i].dailyconfirmed;
        this.timeseries[i]  = this.timeseries1[this.timeseries1.length-i-1];
        
      }
      /* Storing number of tested samples into tested variable */
      this.tested=response['tested'][response['tested'].length-1].totalsamplestested
      
      /* To store daywise value of present dat  in summary  */
      this.summary.dailyconfirmed=response['cases_time_series'][response['cases_time_series'].length-1].dailyconfirmed
      
      /*To store values of each state in states array  */
      this.states = response['statewise'];
      this.states = this.states.slice(1,38)

    },
    /*Error handling */
    (error)=>{
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
    
  }
  /* to switch div */
    OnStatewiseClick()
    {
      this.statewise = true;
      this.daywise = false;
      this.visuals = false;
    }
    OnDaywiseClick()
    {
      this.statewise = false;
      this.daywise = true;
      this.visuals = false;
    }
    OnVisualsClick()
    {
      this.statewise = false;
      this.daywise = false;
      this.visuals = true;
    }
    
  /* For plotting line graph of Daily Confirmed */  
  lineChartDataConfirmed: ChartDataSets[] = [
    { data: this.confirmed, label: 'number of cases' },
  ];
  
  /* Label x axis (each date) */
  lineChartLabelsConfirmed: Label = this.days;
 
  /* To make graph responsive in order to present data on hovering data point*/
  lineChartOptionsConfirmed = {
    responsive: true,
  };
 
  /* Color of line */
  lineChartColorsConfirmed: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(187, 216, 250 ,0.7)',
    },
    
  ];
  /* Legend  */
  lineChartLegendConfirmed = true;

  /* Type of chart */
  lineChartTypeConfirmed = 'line';
  
  /*For plotting data of deceased */
  lineChartDataDeceased: ChartDataSets[] = [
    { data: this.deceased, label: 'number of deceased' },
  ];
   
  /* Label */
  lineChartLabelDeceased: Label = this.days;

  /*For making chart responsive i.e to display data on hovering */
  lineChartOptionDeceased = {
    responsive: true,
  };

  /* Color of chart */
  lineChartColorDeceased: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(246, 177, 171 ,0.7)',
    },
  ];

  /*Legend */
  lineChartLegendDeceased = true;
  /*Chart Type */
  lineChartTypeDeceased = 'line';
 
  /*For plotting data of daily cases */
  lineChartDataDailyCases: ChartDataSets[] = [
    { data: this.dailycases, label: 'number of new cases per day' },
  ];
  
  /* Label for x axis */
  lineChartLabelsDailyCases: Label = this.days;

  /*making graph responsive */
  lineChartOptionsDailyCases = {
    responsive: true,
  };
  
  /*Color of chart  */
  lineChartColorsDailyCases: Color[] = [
    {
      borderColor: 'grey',
      backgroundColor: 'rgba(234, 230, 221  ,0.7)',
    },
  ];

  /*Legend */
  lineChartLegendDailyCases = true;
  /*Type of chart  */
  lineChartTypeDailyCases = 'line';
 
  /*For plotting graph of daily recovered */ 
  lineChartDataRecovered: ChartDataSets[] = [
    { data: this.Recovered, label: 'number of Recovered per day' , }];
 
  /*Label */
  lineChartLabelsRecovered: Label = this.days;

  /* Making graph responsive */
  lineChartOptionsRecovered = {
    responsive: true,
  };
 
  /*Color */
  lineChartColorsRecovered: Color[] = [
    {
      borderColor: 'green',
      backgroundColor: 'rgba(230, 234, 221   ,0.7)',
    },
    
  ];
  /*legend */
  lineChartLegendRecovered = true;
  /*Tpe of graph */
  lineChartTypeRecovered = 'line';
 
  /*Function to route to fetch district wise data on click */
  OnStateClick(state){
    this.router.navigate(["/Districtwise", state]);
  }


}


