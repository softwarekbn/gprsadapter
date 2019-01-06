import { Component, OnInit } from '@angular/core';
import { Registration } from '../modal/Registration';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Role } from '../modal/Role';
import { Project } from '../modal/project';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {throwError} from 'rxjs';
import { Company } from '../modal/company';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
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
  phoneNumber="";
  userName="";
  password="";
  cPassword="";
  companyID="";
  email="";
  firstName="";
  lastName="";
  roleName="";
  projectName="";
  allRoles: Role[];
user: Registration;
companies:Company[];
user1: Registration;
role: Role;
//roleiid;
bRoleid = false;
project: Project;
cpy=false;
cpn=false;
roles: string[];
projects: string[];
projectList: Project[];

  constructor(private usersrv: VictorServiceService, private router:Router) { 

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.user =new Registration();
    this.allRoles=[];
   
    this.user.role = new Role();
    this.user.project = new Project();
    this.user1 = new Registration();
    this.user1.role = new Role();
    this.user1.project = new Project();
    this.roles = [];

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
   
    this.usersrv.getUserRoles().subscribe((data: Role[])=>{
   this.allRoles=data;
      console.log('role',this.allRoles);
      for(let user of data){
          this.roles.push(user.name);
      }
    });
    this.usersrv.getUserProject(sessionStorage.getItem('userName')).subscribe((data:Project[])=>{
      this.projectList=data;
      for(let user of data){
        this.projects.push(user.projectName);
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
  confirmPassword(event: any){
     // console.log(event.target.value);
     if(this.user.password == event.target.value){
        this.cpy = true;
        this.cpn = false;
     }else{
      this.cpy = false;
      this.cpn = true;
     }
      //this.user.password = event.target.value;
     // console.log('password', this.user.password);
  }
  selectedRole(){
    if(this.user.role.name=='Admin'){
        this.bSelectProject=true;
    }else{
      this.bSelectProject=false;
    }
     // console.log(this.user.role.name);
    for(let i =0;i<this.allRoles.length;i++){
                  if(this.user.role.name===this.allRoles[i].name)
                      {
                        this.user.role.roleID= this.allRoles[i].roleID;
                        return;

                      }
       }
    }
  selectedProject(){
    console.log('selected project');
    for(let index=0;index<this.projectList.length;index++){
      if(this.user.project.projectName==this.projectList[index].projectName){
         this.user.project.projectId=this.projectList[index].projectId;
         this.user.projectId=this.projectList[index].projectId;
      }
     }
    //console.log(this.user.projectName);
     
  }
  selectedCompanyId(){
    console.log(this.user.companyId);
  }
  
  createUser(createuserForm){
    console.log('form submitted',this.user);
    this.phoneNumber=createuserForm.phoneNumber;
    this.userName=createuserForm.userName;
    this.password=createuserForm.password;
    this.cPassword=createuserForm.cPassword;
    //this.companyID=createuserForm.companyID;
    this.email=createuserForm.email;
    this.firstName=createuserForm.firstName;
    this.lastName=createuserForm.lastName;
    this.projectName=createuserForm.projectName;
    this.roleName=createuserForm.roleName;

    if(this.phoneNumber.length===0||this.userName.length===0||
      this.password.length===0||this.cPassword.length===0||this.email.length===0||
      this.firstName.length===0||this.lastName.length===0||this.roleName.length===0){
        console.log(this.phoneNumber,this.userName,this.password,
          this.cPassword,this.email,this.firstName,
          this.lastName,this.projectName,this.roleName);
       alert('Please Fill All Field');
       return;
    }else{
      console.log('new user:', this.user);
      //this.loading= true;
      if(sessionStorage.getItem('role')==='SuperAdmin'){
        
        this.bRoleid=true;
      }else{
        this.bRoleid=false;
        this.user.companyId= +sessionStorage.getItem('CompanyId');
      }
      this.usersrv.postAddUser(this.user).subscribe((res: any)=>{
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

   validateComp(){
   
    for(let i=0;i<=this.companies.length;i++){
      if(this.companyName===this.companies[i].companyName){
        this.user.companyId= this.companies[i].companyId;
        return;
      }
   
    }
       this.lblComp=true;
      
   
   }

   validateEmail(){
    console.log('validate email');
    let rex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(rex.test(this.user.email)==false){
          this.cuemail = true;
      }else{
        this.cuemail = false;
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
  
  validatelName(){
    console.log(this.user.lastName);
    let rex =  /^[a-zA-Z\s]{2,50}$/;
    if(rex.test(this.user.lastName)==false){
      this.lName=true;
    }else{
      this.lName=false;
  
    }
  
  }



  validatePhone(){
    ///^[A-Za-z0-9]+([&_ -]){50}$/
    let rex = /^[0-9]{10}$/;
    console.log(this.user.phoneNumber);
    let len = this.user.phoneNumber.length;
    let v=+this.user.phoneNumber;
   
    let i=Math.pow(10,len-1);
    if(rex.test(this.user.phoneNumber)==true)
       {
              this.phoneB=false;
              if(v/i<1){
                this.phoneB0=true;
                this.phoneB=false;
                return;
                //this.lblP=false;
                }else{
            
                  this.phoneB0=false;
                  return;
                }
        }else{
                this.phoneB=true;
                this.phoneB0=false;
                return;
              }
  }
  
}
