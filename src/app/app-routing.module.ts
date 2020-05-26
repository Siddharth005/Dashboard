/*Routing Model  */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorlddataComponent} from '../app/worlddata/worlddata.component'
import {DistrictwiseComponent} from '../app/districtwise/districtwise.component'
import {ResourcesComponent} from '../app/resources/resources.component'


const routes: Routes = [
  {path: "India",component: WorlddataComponent},
  { path: "", redirectTo: "India", pathMatch: "full" },
  {path: "Districtwise/:state", component: DistrictwiseComponent},
  {path: "Resources/:state", component: ResourcesComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
