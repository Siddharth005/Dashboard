/*Importing Libraries*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Statewise} from '../Model/Statewise'
import {Districtwise} from '../Model/Districtwise'
import { Resource } from '../Model/Resource';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) {
  }

  /*To fetch statewise data , timeseries and sample test data */
  GetStatewiseData(): Observable<Statewise[]> {
    return this.httpClient.get<Statewise[]>(`https://api.covid19india.org/data.json`);
  }

  /*To fetch district wise data */
  GetDistrictwise(): Observable<Districtwise[]> {
    return this.httpClient.get<Districtwise[]>(`https://api.covid19india.org/state_district_wise.json`);
  }

  /*To fetch different zone of each district */
  GetDistrictZone(): Observable<Districtwise[]> {
      return this.httpClient.get<Districtwise[]>(`https://api.covid19india.org/zones.json`);
  } 

  /*To fetch summary and countrywise data */
  GetWorldData(): Observable<Statewise[]> {
    return this.httpClient.get<Statewise[]>(`https://api.covid19api.com/summary`)
  }

  /* To fetch information regarding resources */
  GetEssentialService(): Observable<Resource[]> {
    return this.httpClient.get<Resource[]>(`https://api.covid19india.org/resources/resources.json`)
  }     
}