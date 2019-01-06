import { Component, OnInit } from '@angular/core';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Company } from '../modal/company';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {throwError} from 'rxjs';
@Component({
  selector: 'app-managecompanies',
  templateUrl: './managecompanies.component.html',
  styleUrls: ['./managecompanies.component.css']
})
export class ManagecompaniesComponent implements OnInit {
companies: Company[];
dCompany: Company;
sCompany : Company;
loading=false;
length;
  constructor(private cmpsrv: VictorServiceService, private router: Router) {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.companies = [];
    this.sCompany = new Company();
    this.loading=true;
    this.cmpsrv.getAllCompanies().subscribe((data: Company[])=>{
     // console.log(data);
      this.companies = data;
      this.loading=false;
      this.length=this.companies.length;
    },
    error => {
              this.loading = false;
              alert('Your session has been expired! Login Again');
              sessionStorage.clear();
              this.router.navigate(['']);
              console.error("Error in get Api of companies!");
              return throwError(error);  // Angular 6/RxJS 6
             }
    );

   }

  ngOnInit() {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
  
  }
  updateCompany(id){
    console.log('updateCompany');
    sessionStorage.setItem('companyId',id);
    this.router.navigate(['/userhome/updateCompany']);
  }
  
  createCompany(){
    console.log('createCompany');
   this.router.navigate(['/userhome/createCompany']);

  }
  showForm(){
    this.router.navigate(['/superadmin/createIntegration']);
   }
  //confirmDelete(myList)
  delete(myList:Company){
    console.log('delete');
    //this.display='none'; 
   // $.modal.close();
   this.dCompany = myList;
   console.log(this.dCompany);
  }
  confirmDelete(){
    console.log('confirm delete');
  }
  integration(companyId,name){
      sessionStorage.setItem('integCmpId',companyId);
      sessionStorage.setItem('integCmpName',name);
      this.router.navigate(['/userhome/manageIntegrations']);
  }

  showCompany(myList){
    this.sCompany=myList;
    console.log('show company',this.sCompany);
  }
}
