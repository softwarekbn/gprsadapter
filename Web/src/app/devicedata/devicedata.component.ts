import { Component, OnInit } from '@angular/core';
import { Registration } from '../modal/Registration';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Router } from '@angular/router';
import { Role } from '../modal/Role';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { Company } from '../modal/company';

@Component({
  selector: 'app-devicedata',
  templateUrl: './devicedata.component.html',
  styleUrls: ['./devicedata.component.css']
})
export class DevicedataComponent implements OnInit {
  devices: Registration[];
deviceD: Registration;
sdevice : Registration;
loading=false;
companyName;
companies: Company[];
length;
//role: Role;
display;
  constructor(private deviceService:VictorServiceService, private router: Router,
  private spinner:NgxSpinnerService) {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.devices = [];
    this.sdevice = new Registration();
    this.sdevice.role = new Role();
    this.loading=true;
    if(sessionStorage.getItem('role')==='SuperAdmin'){
      this.loading=true;
      this.deviceService.getAllCompanies().subscribe((data: Company[])=>{
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
    this.deviceService.getAllDevice().subscribe((data: Registration[])=>{
      this.devices = data;
      this.loading=false;
      this.length= this.devices.length;
      console.log('User List',this.devices);
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
updateUser(name:string){
  console.log('updateUser',name);
  sessionStorage.setItem('updateId',name);
  console.log('id',sessionStorage.getItem('updateId'));
  this.router.navigate(['/userhome/data']);
}

protocols(){
  console.log('protocols');
  this.router.navigate(['/userhome/manageprotocol']);
}
deleteUser(deviceD:Registration){
 // console.log('deleteUser');
  this.deviceD = deviceD;
 // console.log(deviceD);

}

createDevice(){
  console.log('createDevice');
 this.router.navigate(['/userhome/createdevice']);
}
confirmDelete(){
  console.log('confirm delete');
  //this.display='none'; 
 // $.modal.close();
  this.deviceService.deleteUser(this.deviceD).subscribe((res:any)=>{
    //this.devices = data;
   // console.log(this.devices);
    console.log(res);
    //console.log('projects', this.projects);
  });

}
showUser(user:Registration){
  console.log('Show User');
  this.sdevice = user;
}
getdevicesOfSelectedCompany(){
 // this.loading=true;
 console.log('get User of company');
  for(let index=0;index<this.companies.length;index++){
    if(this.companyName===this.companies[index].companyName){
      console.log(this.companyName);
      this.loading=true;
      this.deviceService.getAllUserCmp(this.companies[index].companyId).subscribe((data: Registration[])=>{
        this.devices = data;
        console.log('Selected company User',this.devices);
       this.loading=false;
        this.length= this.devices.length;
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
