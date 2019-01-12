import { Component, OnInit } from '@angular/core';
import { Device } from '../modal/device';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Role } from '../modal/Role';
import { Project } from '../modal/project';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {throwError} from 'rxjs';
import { Company } from '../modal/company';
@Component({
  selector: 'app-createdevice',
  templateUrl: './createdevice.component.html',
  styleUrls: ['./createdevice.component.css']
})
export class CreatedeviceComponent implements OnInit {
  createuserForm;
  phoneB=false;
  phoneB0=false;
  bSelectProject=true;
  cuser=false;
  pass=false;
  cpass=false;
  comp=false;
  cuemail=false;
  fName=false;
  lName=false;
  companyName;
  lblComp=false;
  loading=false;


  /*end-validation-part*/
  userName="";
  firstName="";
user: Device;
user1: Device;
role: Role;
//roleiid;
cpy=false;
cpn=false;

  constructor(private usersrv: VictorServiceService, private router:Router) { 

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.user =new Device();
    this.user1 = new Device();

    this.createuserForm=new FormGroup({
      'phoneNumber':new FormControl('',Validators.compose([Validators.required])),
      'companyID':new FormControl('',Validators.compose([Validators.required])),
      'userName':new FormControl('',Validators.compose([Validators.required])),
      'password':new FormControl('',Validators.compose([Validators.required])),
      'cPassword':new FormControl('',Validators.compose([Validators.required])),
      'email':new FormControl('',Validators.compose([Validators.required])),
      'firstName':new FormControl('',Validators.compose([Validators.required])),
      'lastName':new FormControl('',Validators.compose([Validators.required])),
      'projectName':new FormControl('',Validators.compose([Validators.required])),
      'roleName':new FormControl('',Validators.compose([Validators.required])),
    }); 

  }   
     
 
  ngOnInit() {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
     
  }
  
  createUser(createuserForm){
    console.log('form submitted',this.user);
    this.userName=createuserForm.userName;
    this.firstName=createuserForm.firstName;

    if(this.userName.length===0||
      this.firstName.length===0){
        console.log(this.userName,this.firstName);
       alert('Please Fill All Field');
       return;
    }else{
      console.log('new user:', this.user);
      //this.loading= true;
      this.usersrv.postAddDevice(this.user).subscribe((res: any)=>{
        this.loading= true;
        console.log('submitted', res);
        this.loading=false;
        alert('User Created Successfully');
        this.router.navigateByUrl('/userhome/managedevice');
       },error =>{
         this.loading=false;
        console.error('error in post api of create user');
        alert('user could not be added, Try again');
        this.router.navigateByUrl('/userhome/managedevice');
        return throwError(error);
       }
      );
       
    }
    
 
  
  }
  cancleuser(){
    console.log('cancel User');
    this.router.navigate(['/userhome/manageUser']);
  }

  validateUser(){
    let rex = /^[^-_@\s][A-Za-z0-9.&@-_\s]{2,50}$/;
    if(rex.test(this.user.userName)==true){
      console.log('match');
      this.cuser=false;
   }else{
     console.log('not match');
     this.cuser = true;
   }
  
   }


   
  
  validatefName(){
    console.log(this.user.firstName);
    let rex = /^[a-zA-Z\s]{2,50}$/;
    if (rex.test(this.user.firstName)==false) {
      this.fName = true;
    } else {
      this.fName=false;
    }
  }
  





  
}

