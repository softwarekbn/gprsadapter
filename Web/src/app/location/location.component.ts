import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { VictorServiceService } from '../apiService/victor-service.service';
import * as $ from 'jquery';
import { Project } from '../modal/project';
import { Router } from '@angular/router';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { element } from 'protractor';
import { Company } from '../modal/company';
import {throwError} from 'rxjs';
declare var ol: any;
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
showPosition;
bCompanyId=true;
companies: Company[];
lblPro=false;
SuperAdminB=true;
lbldistt=false;
lblmessage=false;
lblLocation=false;
lblComp=false;
companyName;
loading=false;
locationName="";
projectName="";
longitude="";
latitude="";
description="";
district="";
createProjectForm;
companyId="";
address: any;
geoAddress: any;
project: Project;

  lt1: number = 28.6258140;
  ln1: number = 77.3790430;
  lt2: number = 28.5679455;
  ln2: number = 77.4120009;
  distance;
  earthRadius = 6373.0; // in km approx
  constructor(private userService: VictorServiceService, private router: Router ) {
    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.project = new Project();
    this.createProjectForm=new FormGroup({
      'locationName':new FormControl('',Validators.compose([Validators.required])),
      'projectName':new FormControl('',Validators.compose([Validators.required])),
      'longitude':new FormControl('',Validators.compose([Validators.required])),
      'latitude':new FormControl('',Validators.compose([Validators.required])),
      'description':new FormControl('',Validators.compose([Validators.required])),
      'district':new FormControl('',Validators.compose([Validators.required])),
      'companyId':new FormControl('',Validators.compose([Validators.required])),

    });
    
    if(sessionStorage.getItem('role')==='SuperAdmin'){
      this.loading=true;
      this.userService.getAllCompanies().subscribe((data: Company[])=>{
        // console.log(data);
         this.companies = data;
         this.SuperAdminB = true;
         console.log('CompanyList',this.companies);
        // this.project.companyId= +sessionStorage.getItem('CompanyId');
         this.loading=false;
       },error=>{
         this.loading = false;
         console.error('Error in get Api, Companies!');
        return throwError(error);
       });
    }else{
        this.SuperAdminB = false;
        this.project.companyId= +sessionStorage.getItem('CompanyId');
        console.log('company id:',this.project.companyId);
    }
   
    
   }

  ngOnInit() {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.userService.getIpAddress().subscribe(data => {
      console.log(data);
    });
    $(document).ready(function(){
      $("#mybtn").click(function(){
          alert('jquery');
      });
  }); 

 
  
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
    
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  calculateDistance(){
      let angleLt1= Math.PI * this.lt1/180; // in radians
      let angleLn1= Math.PI * this.ln1/180;
      let angleLt2= Math.PI * this.lt2/180;
      let angleLn2= Math.PI * this.ln2/180;
      let deltalt = angleLt1- angleLt2;
      let deltaln = angleLn1- angleLn2;
    let x1 = Math.pow(Math.sin(deltalt / 2),2);
    let x2 = Math.pow(Math.sin(deltaln / 2),2);
  let a = x1 + Math.cos(angleLt1) * Math.cos(angleLt2) * x2;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  this.distance = this.earthRadius * c;
  console.log('distance = ', this.distance +' km');
  
  }

handleAddressChange(event: any){
  this.address = JSON.stringify(event);
  this.geoAddress = JSON.parse(this.address);
  
  console.log(this.geoAddress.geometry.location.lat);
  console.log(this.geoAddress.geometry.location.lng);
this.project.longitude = this.geoAddress.geometry.location.lng;
this.project.lattitude = this.geoAddress.geometry.location.lat;
  
  return;
}
createProject(createProjectForm){
  this.locationName=createProjectForm.locationName;
  this.projectName=createProjectForm.projectName;
  this.companyId=createProjectForm.companyId;
  this.description=createProjectForm.description;
  this.longitude=createProjectForm.longitude;
  this.latitude=createProjectForm.latitude;
  this.district = createProjectForm.district;
  if(this.locationName.length===0||this.projectName.length===0||
    this.companyId.length===0||this.description.length===0||this.district.length===0||
    this.longitude.length===0||this.latitude.length===0){
      console.log(this.locationName,this.projectName,this.companyId,this.description,
        this.longitude,this.latitude, this.district)
  alert('Please Fill all Filed');
  return;
  }else{
    console.log('submitted project',this.project);
    this.loading=true;
    this.userService.postProject(this.project).subscribe((res: any)=>{
      console.log('success',res);
      this.loading=false;
      alert('Project Created Successfully');
      this.router.navigateByUrl('/userhome/projects');
    },error=>{
      this.loading = false;
      console.error('Error in post Api, create project');
     return throwError(error);
    });
    
    //this.router.navigateByUrl('/superadmin/projects');

  }

}
cancelProject(){
  console.log('Cancel Project');
  this.router.navigate(['/userhome/projects']);
}
validatePro(){
  console.log(this.project.projectName);
  let rex = /^[a-zA-Z\s]{2,50}$/;
  if (rex.test(this.project.projectName)==false) {
    this.lblPro = true;
  } else {
    this.lblPro=false;
  }  

}
validateLocation(event:any){
  if(event.target.value.length==0 || event.target.value==" "){
    this.lblLocation=true;
    console.log(this.lblLocation);
    return;

  }else{
    this.lblLocation=false;
    return;

  }
}


validateComp(){
 //this.project.companyId=1;
 
 for(let i=0;i<=this.companies.length;i++){
   if(this.companyName===this.companies[i].companyName){
     this.project.companyId=this.companies[i].companyId;
     this.bCompanyId=true;
     break;
   }else{
     this.bCompanyId=false;
   }

 }
console.log('selected Company Id:',this.project.companyId);
    this.lblComp=true;
   

}
validateDes(){
  let rex = /^[^&-_@,\s][0-9a-zA-Z #,-]{2,100}$/;
    console.log(this.project.description);
     
    if(rex.test(this.project.description)==true)
       {
          this.lblmessage = false;
          console.log('match');
          return;  
        }else{
                this.lblmessage=true;
                console.log('not match');
                return;
              }

}
validateDis(){
  let rex = /^[^&-_@,\s][A-Za-z]{2,100}$/;
  console.log(this.project.district);
   
  if(rex.test(this.project.district)==true)
     {
        this.lbldistt = false;
        console.log('match');
        return;  
      }else{
              this.lbldistt = true;
              console.log('not match');
              return;
            }

}



}

