import { Component, OnInit, Output,EventEmitter,Input} from '@angular/core';
import { Project } from '../modal/project';
import { Document } from '../modal/document';
import { NgxSpinnerService } from 'ngx-spinner';
import { VictorServiceService } from '../apiService/victor-service.service';

import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://192.168.43.227:5000/api/victor/fileupload';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from "rxjs";
import {throwError} from 'rxjs';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { stringify } from '@angular/core/src/util';
import { Company } from '../modal/company';
declare var ol: any;
const httpOptions1 = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
};
@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit {
  map: any;
  loading=false;
  message:string;
  showPosition;
  companyName;
  companies: Company[];
  address: any;
  geoAddress: any;
  form1 = false;

  bExcel = false;
  form2 = false;
  projects: Project[];
  projectsOfCompany: Project[];
  files: FileList;
  filestring: string;
  fi = false;
  fim;
  length;
  project: Project;
  document: Document;
 
constructor(private prjService: VictorServiceService, private http: HttpClient, private data: VictorServiceService,
  private router: Router,private spinner:NgxSpinnerService ) {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
this.project = new Project();
this.document = new Document();
//this.document.dFile ='sd';
//this.document.name = 'zfg';
  this.loading=true;
  this.prjService.getAllProjects(sessionStorage.getItem('userName')).subscribe((data: Project[])=>{
  this.projects = data;
  this.length=this.projects.length;
  this.loading=false;
  this.bExcel =true;
  
}, error=>{
   this.loading=false;
   console.log('Error in get all projects api, try again');
   return throwError(error);
});
if(sessionStorage.getItem('role')==='SuperAdmin'){
            this.prjService.getAllCompanies().subscribe((data: Company[])=>{
              this.companies = data;
              console.log('CompanyList',this.companies);
              
            },error=>{
              console.error('Error in get Api, Companies!');
              return throwError(error);
            });
}

 }

  ngOnInit() {
    
    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
   
  }
  getDocuments(projectID){

    //projectID = stringify(pro);
    //console.log('pid', projectID);
    projectID = String(projectID);
    sessionStorage.setItem('prjID',projectID);
    console.log('project id',projectID);
    //this.data.changeMessage(projectID);

    //this.clicked.emit(projectID);
    this.router.navigate(['userhome/document']);

  }
  
 
         
  createProject(){
    this.router.navigate(['userhome/location']);
   
  }
  getProjectsofSelectedCompany(){
    this.loading=true;
    console.log('project list');
    for(let index=0;index<this.companies.length;index++){
          if(this.companyName===this.companies[index].companyName){
            console.log(this.companyName);
            this.prjService.getProjectsOfCompany(this.companies[index].companyId).subscribe((data: Project[])=>{
              this.projects = data;
              this.length=this.projects.length;
              this.projectsOfCompany=data;
              console.log('projectlist',this.projectsOfCompany);
             this.loading=false;
            }, error=>{
             this.loading=false;
               console.log('Error in get projects of company api, try again');
               return throwError(error);
            }
            );  
            break; 
          }
    }
   
   
  }
 
  createExcel(){
    this.prjService.exportAsExcelFile(this.projects, 'projects');
  }
  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //this.showPosition(position);// BSI, sector 63, H140
                                // 28.6258140//28° 37' 32.93'' N
                               //77.3790430//77° 22' 44.55'' E
                               //28.567945599999998
                               //77.41200099999999
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
       // console.log(Math.PI);
        // this.currentLat = position.coords.latitude;
   // this.currentLong = position.coords.longitude;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
 // newMessage(){
    //this.data.changeMessage("Hello from manage project");
 // }
 
}
