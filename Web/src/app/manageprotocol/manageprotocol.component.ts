import { Component, OnInit } from '@angular/core';
import { Protocol } from '../modal/Protocol';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Router } from '@angular/router';
import { Role } from '../modal/Role';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { Company } from '../modal/company';
import { getDevice } from '../modal/getdevice';

@Component({
  selector: 'app-manageprotocol',
  templateUrl: './manageprotocol.component.html',
  styleUrls: ['./manageprotocol.component.css']
})
export class ManageprotocolComponent implements OnInit {

  devices: Protocol[];
  deviceD: Protocol;
  sdevice : Protocol;
  loading=false;
  companyName;
  getDevice:getDevice
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
      this.sdevice = new Protocol();
      this.sdevice.getdevice = new getDevice();
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
      this.deviceService.getProtocols().subscribe((data: Protocol[])=>{
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
  updateUser(id:string,cid:string){
    console.log('updateUser');
    sessionStorage.setItem('updateId',id);
    sessionStorage.setItem('updatedCid',cid);
    console.log('id',sessionStorage.getItem('updateId'));
    this.router.navigate(['/userhome/updateUser']);
  }
  objects(id:string,cid:string){
    this.router.navigate(['/userhome/manageobjects']);
  }
  deleteUser(deviceD:Protocol){
   // console.log('deleteUser');
    this.deviceD = deviceD;
   // console.log(deviceD);
  
  }
  
  createDevice(){
    console.log('createProtocol');
   this.router.navigate(['/userhome/createprotocol']);
  }
  confirmDelete(){
    console.log('confirm delete');
    //this.display='none'; 
   // $.modal.close();
    // this.deviceService.deleteUser().subscribe((res:any)=>{
    //   //this.devices = data;
    //  // console.log(this.devices);
    //   console.log(res);
    //   //console.log('projects', this.projects);
    // });
  
  }
  showUser(user:Protocol){
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
        this.deviceService.getAllUserCmp(this.companies[index].companyId).subscribe((data: Protocol[])=>{
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
  