import { Component, OnInit } from '@angular/core';
import { Registration } from '../modal/Registration';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Router } from '@angular/router';
import { Role } from '../modal/Role';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { Company } from '../modal/company';
@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
users: Registration[];
userD: Registration;
sUser : Registration;
loading=false;
companyName;
companies: Company[];
length;
//role: Role;
display;
  constructor(private userService:VictorServiceService, private router: Router,
  private spinner:NgxSpinnerService) {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.users = [];
    this.sUser = new Registration();
    this.sUser.role = new Role();
    this.loading=true;
    if(sessionStorage.getItem('role')==='SuperAdmin'){
      this.loading=true;
      this.userService.getAllCompanies().subscribe((data: Company[])=>{
        // console.log(data);
        this.companies = data;
         this.loading=false;
        // this.SuperAdminB = true;
         console.log('CompanyList',this.companies);
        // this.project.companyId= +sessionStorage.getItem('CompanyId');
         //this.loading=false;
       },error=>{
       this.loading = false;
         console.error('Error in get Api, Companies!');
        return throwError(error);
       });
    }
  
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

   }

  ngOnInit() {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
     /** spinner starts on init */
     this.spinner.show();
 
     setTimeout(() => {
         /** spinner ends after 5 seconds */
         this.spinner.hide();
     }, 3000);
  }
updateUser(id:string,cid:string){
  console.log('updateUser');
  sessionStorage.setItem('updateId',id);
  sessionStorage.setItem('updatedCid',cid);
  console.log('id',sessionStorage.getItem('updateId'));
  this.router.navigate(['/userhome/updateUser']);
}
deleteUser(userD:Registration){
 // console.log('deleteUser');
  this.userD = userD;
 // console.log(userD);

}

createUser(){
  console.log('createUser');
 this.router.navigate(['/userhome/createuser']);
}
confirmDelete(){
  console.log('confirm delete');
  //this.display='none'; 
 // $.modal.close();
  this.userService.deleteUser(this.userD).subscribe((res:any)=>{
    //this.users = data;
   // console.log(this.users);
    console.log(res);
    //console.log('projects', this.projects);
  });

}
showUser(user:Registration){
  console.log('Show User');
  this.sUser = user;
}
getUsersOfSelectedCompany(){
 // this.loading=true;
 console.log('get User of company');
  for(let index=0;index<this.companies.length;index++){
    if(this.companyName===this.companies[index].companyName){
      console.log(this.companyName);
      this.loading=true;
      this.userService.getAllUserCmp(this.companies[index].companyId).subscribe((data: Registration[])=>{
        this.users = data;
        console.log('Selected company User',this.users);
       this.loading=false;
        this.length= this.users.length;
      }, error=>{
       this.loading=false;
        console.error('Error in get all user bu companyId api, try again later');
        return throwError(error);
      }
    );
      break; 
    }
}
}
}
