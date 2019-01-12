import { Component, OnInit } from '@angular/core';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Project } from '../modal/project';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {throwError} from 'rxjs';
import { Company } from '../modal/company';
import { getDevice } from '../modal/getdevice';
import { Objects } from '../modal/object';

@Component({
  selector: 'app-createobject',
  templateUrl: './createobject.component.html',
  styleUrls: ['./createobject.component.css']
})
export class CreateobjectComponent implements OnInit {
  createuserForm;
  phoneB=false;
  phoneB0=false;
  bSelectProject=true;
  cuser=false;
  pass=false;
  cpass=false;
  comp=false;
  cudisplayName=false;
  fName=false;
  lName=false;
  companyName;
  lblComp=false;
  loading=false;


  /*end-validation-part*/
  phoneNumber="";
  name="";
  correcttodecimalplace="";
  password="";
  cPassword="";
  companyID="";
  displayName="";
  unit="";
  order="";
  roleName="";
  projectName="";
  allDevices: getDevice[];
object: Objects;
companies:Company[];
object1: Objects;
getdevice: getDevice;
//roleiid;
bRoleid = false;
project: Project;
cpy=false;
cpn=false;
devices: string[];
projects: string[];
projectList: Project[];

  constructor(private usersrv: VictorServiceService, private router:Router) { 

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.object =new Objects();
    this.allDevices=[];
    
    this.object.getdevice = new getDevice();
    this.object1 = new Objects();
    this.object1.getdevice = new getDevice();
    this.devices = [];
    
   
    //  this.user.getdevice = new getDevice();
    //  this.user1.getdevice = new getDevice();
    

    this.createuserForm=new FormGroup({
      'phoneNumber':new FormControl('',Validators.compose([Validators.required])),
      'companyID':new FormControl('',Validators.compose([Validators.required])),
      'name':new FormControl('',Validators.compose([Validators.required])),
      'password':new FormControl('',Validators.compose([Validators.required])),
      'cPassword':new FormControl('',Validators.compose([Validators.required])),
      'displayName':new FormControl('',Validators.compose([Validators.required])),
      'unit':new FormControl('',Validators.compose([Validators.required])),
      'order':new FormControl('',Validators.compose([Validators.required])),
      'projectName':new FormControl('',Validators.compose([Validators.required])),
      'roleName':new FormControl('',Validators.compose([Validators.required])),
      'correcttodecimalplace':new FormControl('',Validators.compose([Validators.required])),
    }); 

    
    if(sessionStorage.getItem('role')==='SuperAdmin'){
      this.loading=true;
    this.usersrv.getAllCompanies().subscribe((data: Company[])=>{
      // console.log(data);
       this.companies = data;
       console.log('CompanyList',this.companies);
       this.loading=false;
     });
    }
     
 if(sessionStorage.getItem('roleId')=='1'){
   this.bRoleid = true;
 }else{
  this.bRoleid = true;
 }
    this.projects =[];
   
    this.usersrv.getAllDevice().subscribe((data: getDevice[])=>{
   this.allDevices=data;
      console.log('role',this.allDevices);
      for(let object of data){
          this.devices.push(object.name);

      }
    });
   
   // console.log(this.roles);
  }

  ngOnInit() {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
     
  }
  
  selectedRole(){
    console.log(this.object.getdevice.name);
    for(let i =0;i<this.allDevices.length;i++){
                  if(this.object.getdevice.name===this.allDevices[i].name)
                      {
                        this.object.getdevice._id= this.allDevices[i]._id;
                        console.log(this.object.getdevice._id)
                        return;

                      }
       }
    }
 
  
  createUser(createuserForm){
    console.log('form submitted',this.object);
    this.phoneNumber=createuserForm.phoneNumber;
    this.name=createuserForm.name;
    this.password=createuserForm.password;
    this.cPassword=createuserForm.cPassword;
    //this.companyID=createuserForm.companyID;
    this.displayName=createuserForm.displayName;
    this.unit=createuserForm.unit;
    this.order=createuserForm.order;
    this.projectName=createuserForm.projectName;
    this.roleName=createuserForm.roleName;
    this.correcttodecimalplace=createuserForm.correcttodecimalplace;

    if(this.name.length===0||
      this.displayName.length===0||
      this.unit.length===0||this.order.length===0||this.roleName.length===0||this.correcttodecimalplace.length===0){
        console.log(this.phoneNumber,this.name,this.password,
          this.cPassword,this.displayName,this.unit,
          this.order,this.projectName,this.roleName,this.correcttodecimalplace);
       alert('Please Fill All Field');
       return;
    }else{
      console.log('new user:', this.object);
      //this.loading= true;
    
      this.usersrv.postAddObject(this.object.getdevice._id,this.object).subscribe((res: any)=>{
        this.loading= true;
        console.log('submitted', res);
        this.loading=false;
        alert('User Created Successfully');
        this.router.navigateByUrl('/userhome/manageUser');
       },error =>{
         this.loading=false;
        console.error('error in post api of create user');
        alert('user could not be added, Try again');
        this.router.navigateByUrl('/userhome/manageUser');
        return throwError(error);
       }
      );
       
    }
    
 
  
  }
  createDevice(){
    console.log('createobject');
   this.router.navigate(['/userhome/createobject']);
  }
  createObject(){
    console.log('createobject');
   this.router.navigate(['/userhome/createobject']);
  }
  cancleuser(){
    console.log('cancel User');
    this.router.navigate(['/userhome/manageUser']);
  }

  validateUser(){
    let rex = /^[^-_@\s][A-Za-z0-9.&@-_\s]{2,50}$/;
    if(rex.test(this.object.name)==true){
      console.log('match');
      this.cuser=false;
   }else{
     console.log('not match');
     this.cuser = true;
   }
  
   }
   validatecomm(){
    console.log(this.object.correcttodecimalplace);
    let rex =  /^[a-zA-Z\s]{2,50}$/;
    if(rex.test(this.object.correcttodecimalplace)==false){
      this.lName=true;
    }else{
      this.lName=false;
  
    }
  
  
   }

   validatedisplayName(){
    console.log('validate displayName');
    let rex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(rex.test(this.object.displayName)==false){
          this.cudisplayName = true;
      }else{
        this.cudisplayName = false;
      }
  }
  
  validatefName(){
    console.log(this.object.unit);
    let rex = /^[a-zA-Z\s]{2,50}$/;
    if (rex.test(this.object.unit)==false) {
      this.fName = true;
    } else {
      this.fName=false;
    }
  }
  
  validatelName(){
    console.log(this.object.order);
    let rex =  /^[a-zA-Z\s]{2,50}$/;
    if(rex.test(this.object.order)==false){
      this.lName=true;
    }else{
      this.lName=false;
  
    }
  
  }
  validatecorrecttodecimalplace(){
    console.log(this.object.correcttodecimalplace);
    let rex =  /^[a-zA-Z\s]{2,50}$/;
    if(rex.test(this.object.correcttodecimalplace)==false){
      this.lName=true;
    }else{
      this.lName=false;
  
    }
  
  }


  
  
}
