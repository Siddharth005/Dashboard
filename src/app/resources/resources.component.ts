/*Backend For resources page */
import { Component, OnInit } from '@angular/core';
import { Resource } from '../Model/Resource';
import { DataService } from '../Service/Data.Service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  constructor(private dataservice : DataService, private route: ActivatedRoute, private router:Router) { }

  /*Variables for storing fetched data*/
  resources: Resource[] = []
  state: string;
  errorcode: string;
  message: string;
  ok:boolean=false;
  
  ngOnInit() {
    
    /*To fetch state name through parameterised routing */
    this.state = this.route.snapshot.params.state
    
    /*Fetching essential  data */
    this.dataservice.GetEssentialService().subscribe((response)=>{

      /*if PAN India information is required*/
      if(this.state == 'India')
      {
        this.resources = response['resources']
      }
      /*If statewise data is required */
      else{
     for(var i =0;i<response['resources'].length;i++)
     {
       if(response['resources'][i].state == this.state)
       {
         this.resources.push(response['resources'][i])
       }
     }/*If no information is there to display */
     if(this.resources.length==0)
     {
       this.ok= true
       this.errorcode = '';
       this.message = 'Sorry, No essentials services are listed for this state'
     }
    } /*Error Handling*/ 
    },(error)=>
    {      if(error['status']=='400')
    {this.errorcode = '400 and';
    this.message = 'Bad Request'}
    if(error['status']=='404 ')
    {this.errorcode = '404 and';
    this.message = 'Page Not Found'}
    if(error['status']=='500')
    {this.errorcode = '500 and';
    this.message = 'Internal Server Error'}
    if(error['status']=='503')
    {this.errorcode = '503 and';
    this.message = 'Service Unavailable'}
    
    this.ok = true;
  });

  }

}
