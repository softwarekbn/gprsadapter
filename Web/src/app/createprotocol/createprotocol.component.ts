import { Component, OnInit } from '@angular/core';
import { Protocol } from '../modal/Protocol';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Project } from '../modal/project';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {throwError} from 'rxjs';
import { Company } from '../modal/company';
import { getDevice } from '../modal/getdevice';


@Component({
  selector: 'app-createprotocol',
  templateUrl: './createprotocol.component.html',
  styleUrls: ['./createprotocol.component.css']
})

export class CreateprotocolComponent implements OnInit {
  createuserForm;
  phoneB=false;
  phoneB0=false;
  bSelectProject=true;
  cuser=false;
  pass=false;
  cpass=false;
  comp=false;
  cuvalueseprator=false;
  fName=false;
  lName=false;
  companyName;
  lblComp=false;
  loading=false;


  /*end-validation-part*/
  phoneNumber="";
  communicationstartswith="";
  password="";
  cPassword="";
  companyID="";
  valueseprator="";
  recordseprator="";
  communicationendswith="";
  roleName="";
  projectName="";
  allDevices: getDevice[];
protocol: Protocol;
companies:Company[];
protocol1: Protocol;
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
    this.protocol =new Protocol();
    this.allDevices=[];
    
    this.protocol.getdevice = new getDevice();
    this.protocol1 = new Protocol();
    this.protocol1.getdevice = new getDevice();
    this.devices = [];
    
   
    //  this.user.getdevice = new getDevice();
    //  this.user1.getdevice = new getDevice();
    

    this.createuserForm=new FormGroup({
      'phoneNumber':new FormControl('',Validators.compose([Validators.required])),
      'companyID':new FormControl('',Validators.compose([Validators.required])),
      'communicationstartswith':new FormControl('',Validators.compose([Validators.required])),
      'password':new FormControl('',Validators.compose([Validators.required])),
      'cPassword':new FormControl('',Validators.compose([Validators.required])),
      'valueseprator':new FormControl('',Validators.compose([Validators.required])),
      'recordseprator':new FormControl('',Validators.compose([Validators.required])),
      'communicationendswith':new FormControl('',Validators.compose([Validators.required])),
      'projectName':new FormControl('',Validators.compose([Validators.required])),
      'roleName':new FormControl('',Validators.compose([Validators.required])),
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
      for(let protocol of data){
          this.devices.push(protocol.name);

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
    console.log(this.protocol.getdevice.name);
    for(let i =0;i<this.allDevices.length;i++){
                  if(this.protocol.getdevice.name===this.allDevices[i].name)
                      {
                        this.protocol.getdevice._id= this.allDevices[i]._id;
                        console.log(this.protocol.getdevice._id)
                        return;

                      }
       }
    }
 
  
  createUser(createuserForm){
    console.log('form submitted',this.protocol);
    this.phoneNumber=createuserForm.phoneNumber;
    this.communicationstartswith=createuserForm.communicationstartswith;
    this.password=createuserForm.password;
    this.cPassword=createuserForm.cPassword;
    //this.companyID=createuserForm.companyID;
    this.valueseprator=createuserForm.valueseprator;
    this.recordseprator=createuserForm.recordseprator;
    this.communicationendswith=createuserForm.communicationendswith;
    this.projectName=createuserForm.projectName;
    this.roleName=createuserForm.roleName;

    if(this.communicationstartswith.length===0||
      this.valueseprator.length===0||
      this.recordseprator.length===0||this.communicationendswith.length===0||this.roleName.length===0){
        console.log(this.phoneNumber,this.communicationstartswith,this.password,
          this.cPassword,this.valueseprator,this.recordseprator,
          this.communicationendswith,this.projectName,this.roleName);
       alert('Please Fill All Field');
       return;
    }else{
      console.log('new user:', this.protocol);
      //this.loading= true;
    
      this.usersrv.postAddProtocol(this.protocol.getdevice._id,this.protocol).subscribe((res: any)=>{
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
    console.log('createProtocol');
   this.router.navigate(['/userhome/createprotocol']);
  }
  createObject(){
    console.log('createProtocol');
   this.router.navigate(['/userhome/createobject']);
  }
  cancleuser(){
    console.log('cancel User');
    this.router.navigate(['/userhome/manageUser']);
  }

  validateUser(){
    let rex = /^[^-_@\s][A-Za-z0-9.&@-_\s]{2,50}$/;
    if(rex.test(this.protocol.communicationstartswith)==true){
      console.log('match');
      this.cuser=false;
   }else{
     console.log('not match');
     this.cuser = true;
   }
  
   }

   validatevalueseprator(){
    console.log('validate valueseprator');
    let rex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(rex.test(this.protocol.valueseprator)==false){
          this.cuvalueseprator = true;
      }else{
        this.cuvalueseprator = false;
      }
  }
  
  validatefName(){
    console.log(this.protocol.recordseprator);
    let rex = /^[a-zA-Z\s]{2,50}$/;
    if (rex.test(this.protocol.recordseprator)==false) {
      this.fName = true;
    } else {
      this.fName=false;
    }
  }
  
  validatelName(){
    console.log(this.protocol.communicationendswith);
    let rex =  /^[a-zA-Z\s]{2,50}$/;
    if(rex.test(this.protocol.communicationendswith)==false){
      this.lName=true;
    }else{
      this.lName=false;
  
    }
  
  }



  
  
}
