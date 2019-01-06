import { Component, OnInit } from '@angular/core';
import { VictorServiceService } from '../apiService/victor-service.service';
import {Router} from '@angular/router';
import { UserLeads } from '../modal/userLeads';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

/*

*/
export class MainComponent implements OnInit {
public leadsCount: UserLeads;
todayDate;
loading=false;
  constructor(private router: Router, private getCounts: VictorServiceService) { 
    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.leadsCount = new UserLeads;
    if(sessionStorage.getItem('userName')===null){
      this.router.navigate(['']);
    }
    this.todayDate=new Date().toLocaleDateString();
    this.loading = true;
    this.getCounts.getDetails(sessionStorage.getItem('userName')).subscribe((data: UserLeads) => {
      this.leadsCount = data;
      this.loading=false;
      console.log('LeadsCount',this.leadsCount);
      sessionStorage.setItem('rawLeadsCount', this.leadsCount.rawLeadsCount.toString());
     // console.log(this.leadsCount);
      return true;
    },
    error => {
      this.loading=false;
      console.error("Error in Api!");
      return throwError(error);  // Angular 6/RxJS 6
    }
  );

  } // end of constructor

  ngOnInit() {
  
    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
            

  } // end of ngOnInit
  viewLeadsByStatus(statusId){
    sessionStorage.setItem('statusId',statusId);
    this.router.navigate(['/leads']);
    //return;
   // this.router.navigate(['/dashBoard/leads']);
  } // end of viewDetails
 /*
  viewLeadsByStatus(statusId){
  sessionStorage.setItem('statusId',statusId);
 // sessionStorage.setItem('status','acd');
  this.router.navigate(['/leads']);
    return;
  }  */
  /*superadmin/rawLead*/
  navigateLead(path){
    this.router.navigateByUrl(path);
  }
  



}
