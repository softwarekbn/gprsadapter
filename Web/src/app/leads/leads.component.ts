import { Component, OnInit } from '@angular/core';
import { Project } from '../modal/project';
import { User } from '../modal/User';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Registration } from '../modal/Registration';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  projects: Project[];
  users: Registration[];
  loading;
  selectedUserName;
  selectedProjectName;

  constructor(private srv: VictorServiceService,private router:Router) { 
    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.srv.getAllUserCmp(sessionStorage.getItem('CompanyId')).subscribe((data: Registration[])=>{
      this.users = data;
     // this.loading=false;
      //this.length= this.users.length;
      console.log('User List',this.users);
    }, error=>{
    //  this.loading=false;
      console.error('Error in get all user api, try again later');
      return throwError(error);
    });
  this.srv.getProjectsOfCompany(sessionStorage.getItem('CompanyId')).subscribe((data: Project[])=>{
    this.projects = data;
  //  this.length=this.projects.length;
    //this.loading=false;
   // this.bExcel =true;
    
  }, error=>{
     this.loading=false;
     console.log('Error in get all projects api, try again');
     return throwError(error);
  });

  }//end of constructor

  ngOnInit() {
    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }

  }

  selectedUser(){
    console.log('selected user',this.selectedUserName);
    for(let i=0;i<this.users.length;i++){
      if(this.selectedUserName===this.users[i].userName){
        let id= this.users[i].userName;
        console.log('selected username',id);

    }

    }
    return;
  }
  selectedProject(){
    console.log('selected project',this.selectedProjectName);
    for(let i=0;i<this.projects.length;i++){
      if(this.selectedProjectName===this.projects[i].projectName){
          let id= this.projects[i].projectId;
          console.log('selected projectid',id);

      }

    }
    return;
  }
  getLeads(){
    
    return;
  }

}
