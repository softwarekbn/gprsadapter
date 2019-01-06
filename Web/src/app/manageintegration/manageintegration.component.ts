import { Component, OnInit } from '@angular/core';
import { Integrations } from '../modal/integrations';
import { IdName } from '../modal/id-name';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
//import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-manageintegration',
  templateUrl: './manageintegration.component.html',
  styleUrls: ['./manageintegration.component.css']
})
export class ManageintegrationComponent implements OnInit {
integrations: Integrations[];
integ = false;
loading=false;
newIntegration: Integrations;
companyName;
companyId;
sourceList=['99 acres', 'Facebook', 'Excelsheet', 'Google', 'Magic Bricks'];
//sourceType: IdName;
  constructor(private srv: VictorServiceService, private router: Router,
  private spinner:NgxSpinnerService) { 
 
    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }

    if(sessionStorage.getItem('role')==='Admin'){
     // this.showIntegration= true;
     this.companyName=sessionStorage.getItem('loginCompany');
     this.companyId = sessionStorage.getItem('CompanyId');
  }
  if(sessionStorage.getItem('role')==='SuperAdmin'){
    this.companyName = sessionStorage.getItem('integCmpName');
     this.companyId = sessionStorage.getItem('integCmpId');
  }

    this.integrations = [];
    this.newIntegration = new Integrations();
    this.newIntegration.sourceType = new IdName();
    this.loading=true;
    this.srv.getIntegrations(this.companyId).subscribe((res: Integrations[])=>{
      this.integrations = res;
      this.loading=false;
      console.log('integration of a company',this.integrations);
     // console.log(this,this.integrations);
    
    });

  }

  ngOnInit() {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
  
  }
  showForm(){
    sessionStorage.setItem('cmpIdForInteg',this.companyId);
    sessionStorage.setItem('cmpNameForInteg',this.companyName);
   this.router.navigate(['/userhome/createIntegration']);
  }
  
  
}
