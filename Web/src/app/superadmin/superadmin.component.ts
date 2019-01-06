import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Project } from '../modal/project';
import { Company } from '../modal/company';
import {throwError} from 'rxjs';
import { Registration } from '../modal/Registration';
import { UserLeads } from '../modal/userLeads';
@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {
  loginCompanyName;
  bShow=true;
  projectsOfCompany: Project[];
  companies: Company[];
  projects: Project[];
  companyName;
  projectName;
  userName;
  rawLeadsCount = +sessionStorage.getItem('rawLeadsCount');
  user;
  loading=true;
  isUser=false;
  showUser=false;
  userRole;
  companyId;
  length;
  leadsCount:UserLeads;
  users: Registration[];
  constructor(private router:Router,private prjService:VictorServiceService,
    private userService:VictorServiceService,private getCounts:VictorServiceService ) {

      if(sessionStorage.getItem('userName')===null){
        console.log('sesson strorage', sessionStorage.getItem('userName'));
        this.router.navigate(['']);
      } 

      this.user =sessionStorage.getItem('userName');
      this.userRole = sessionStorage.getItem('role');
      this.companyId= sessionStorage.getItem('CompanyId');
      

    this.users = [];
    //companyList
    this.loading=true;
    this.getCounts.getAllCompanies().subscribe((data: Company[])=>{
      this.companies = data;
      this.length = this.companies.length;
     // sessionStorage.setItem('rawLeadsCount', this.leadsCount.rawLeadsCount.toString());
     // this.loginCompanyName = sessionStorage.getItem('CompanyId');
      for(let index=0;index<this.companies.length;index++){
          if(this.companies[index].companyId==+sessionStorage.getItem('CompanyId')){
            this.loginCompanyName = this.companies[index].companyName;
            sessionStorage.setItem('loginCompany',this.loginCompanyName);
            console.log('useranme',this.loginCompanyName);
            this.loading=false;
            break;
          }
      }
     
  
    },error=>{
      this.loading=false;
      console.error('Error in get Api, Companies!');
      return throwError(error);
   });//end of companyList

   //getAllUser
   this.loading=true;
   if(sessionStorage.getItem('role')==='SuperAdmin' || sessionStorage.getItem('role')==='Admin'){
     this.loading=true;
    this.userService.getAllUser(sessionStorage.getItem('userName')).subscribe((data: Registration[])=>{
      this.users = data;
      this.loading=false;
      this.length= this.users.length;
     console.log('User List',this.users);
    }, error=>{
     this.loading=false;
      console.error('Error in get all user api, try again later');
      return throwError(error);
    });
  }//end of getAllUser

//getAllProjects
this.loading=true;
  if(sessionStorage.getItem('role')==='SuperAdmin' || sessionStorage.getItem('role')==='Admin'){
  this.prjService.getAllProjects(sessionStorage.getItem('userName')).subscribe((data: Project[])=>{
  this.projects = data;
  this.loading=false;
  }, error=>{
    this.loading=false;
    console.log('Error in get all projects api, try again');
    return throwError(error);
  });
}//end of getAllProjects

   }

  ngOnInit() {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }

   this.loading=true;
    this.getCounts.getDetails(sessionStorage.getItem('userName')).subscribe((data: UserLeads) => {
      this.leadsCount = data;
      this.loading=false;
     // this.user =sessionStorage.getItem('userName');
      console.log('Aarif1');
     // console.log(this.leadsCount);
      return true;
    },
    error => {
      this.loading=false;
      console.error("Error in Api!");
      return throwError(error);  // Angular 6/RxJS 6
    });
  }
  
  projectList(){
    //this.isUser=!this.isUser;
}

selectedCompany(){
  for(let i=0;i<this.companies.length;i++){
    if(this.companyName===this.companies[i].companyName){
      this.prjService.getProjectsOfCompany(this.companies[i].companyId).subscribe((data: Project[])=>{
        this.projects = data;
        this.projects.length = this.projects.length;
       console.log('projects',this.projects);
       this.isUser=true;
      }, error=>{
      // this.loading=false;
         console.log('Error in get projects of company api, try again');
         return throwError(error);
      });
      this.prjService.getAllUserCmp(this.companies[i].companyId).subscribe((data: Registration[])=>{
        this.users=data;
        this.length= this.users.length;
        console.log('users',this.users);
        this.showUser = true;
      });
    }
  }
  this.companyName;

}


signOut(){
  console.log('Signout Your Panel');
  this.router.navigate(['']);
}

billingInfo(){
  console.log('Billing Info');
}
  addProject(){
    console.log('Create Location');
    this.router.navigate(['userhome/location']);
  }
  crmDashboard(){
    console.log('Home Page');
    this.router.navigate(['userhome/home']);
  }

  addUser(){
    console.log('Create User');
    this.router.navigate(['userhome/createuser']);
  }
  show(){
   this.bShow=!this.bShow;
  }
}
