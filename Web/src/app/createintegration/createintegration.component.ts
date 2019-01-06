import { Component, OnInit } from '@angular/core';
import { Integrations } from '../modal/integrations';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import { IdName } from '../modal/id-name';
import { VictorServiceService } from '../apiService/victor-service.service';
import { FormGroup, FormControl , Validators } from '@angular/forms';

import {throwError} from 'rxjs';
import { Company } from '../modal/company';

@Component({
  selector: 'app-createintegration',
  templateUrl: './createintegration.component.html',
  styleUrls: ['./createintegration.component.css']
})
export class CreateintegrationComponent implements OnInit {
newIntegration: Integrations;
createIntergrationForm;
listIntegration: Integrations[];
companies: Company[];
lblComp = false;
lblUser = false;
lblPass = false;
companyName;
bTestIntegBtn=true;
bStartDate=false;
bEndDate=false;
name="";
bHideBtn=true;
show=true;
companyId="";
userName="";
value="";
loading=false;
compId;
cmpIdForInteg=sessionStorage.getItem('cmpIdForInteg');
cmpNameForInteg=sessionStorage.getItem('cmpNameForInteg');
sDate: string;
eDate: string;

bsRangeValue: Date[];
// sessionStorage.setItem('cmpIdForInteg',this.companyId);
//sessionStorage.setItem('cmpNameForInteg',this.companyName);
//y2PMAab10Yk~~~~~~3D
  constructor(private router: Router, private srv: VictorServiceService, private datePipe: DatePipe) {
    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
    this.listIntegration=[];
    this.newIntegration = new Integrations();
    this.newIntegration.sourceType = new IdName();
    //sessionStorage.setItem('CompanyId',res.CompanyId);
    this.companyId = sessionStorage.getItem('CompanyId');
  this.newIntegration.companyId= +sessionStorage.getItem('cmpIdForInteg');
  this.newIntegration.sourceType.id=0;//assigning nothing, will be assign by back-end
    this.createIntergrationForm=new FormGroup({
      'Name':new FormControl('',Validators.compose([Validators.required])),
      'userName':new FormControl('',Validators.compose([Validators.required])),
      'value':new FormControl('',Validators.compose([Validators.required])),
    });

    this.srv.getAllCompanies().subscribe((data: Company[])=>{
      // console.log(data);
       this.companies = data;
       console.log('CompanyList',this.companies);
       this.loading=false;
     }, error=>{
      this.loading=false;
      console.error('Error in API');
      return throwError(error);
     }
    );

   }

  ngOnInit() {
    
    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
  }
  testIntegrationWithDate(){
    return;
  }
 
     //newIntegration.value
     createIntegration1(createIntergrationForm){
       this.name=createIntergrationForm.Name;
      // this.companyId=sessionStorage.getItem('cmpIdForInteg');
       this.userName=createIntergrationForm.userName;
       this.value=createIntergrationForm.value;
       if(this.name.length===0||this.userName.length===0||
           this.value.length===0){
             console.log(this.name,this.userName,this.value);
        alert('Please Fill All Filed');
        return;
       }else{
         this.loading=true;
         
         console.log('created integration:',this.newIntegration);
        this.srv.postIntegrations(sessionStorage.getItem('cmpIdForInteg'), this.newIntegration).subscribe((res:any)=>{
          console.log('integ created: ', res);
          this.loading=false;
        },error =>{
          this.loading=false;
          alert('Integration could not be added, Try again');
          this.router.navigateByUrl('/userhome/manageIntegrations');
          console.error('error in create integration api');
          return throwError(error);
        }
      );
        alert('Company Intergatred Successfully');
        this.router.navigateByUrl('/userhome/manageIntegrations');
       }
 
     }
     cancelIntegration(){
      this.router.navigate(['/userhome/manageIntegrations']);
    }

    validateComp(){
      this.newIntegration.companyId=1;
      for(let i=0;i<=this.companies.length;i++){
        if(this.companyName===this.companies[i].companyName){
          this.newIntegration.companyId=this.companies[i].companyId;
          return;
        }
      }
         this.lblComp=true;
     }

     testIntegration(){
     // this.bsRangeValue = [this.sDate, this.eDate];
      console.log('new Integration',this.newIntegration);
      this.listIntegration.push(this.newIntegration);
      console.log('list',this.listIntegration);
      this.srv.postTestIntegration(this.sDate,this.eDate,this.companyId,this.listIntegration).subscribe((res:any)=>{
        console.log('integ created: ', res);
        alert('successfullt integration');
        this.bHideBtn=false;
       // this.loading=false;
      },error =>{
       // this.loading=false;
        alert('Fail Test Integration, Try again');
      //  this.router.navigateByUrl('/userhome/manageIntegrations');
        console.error('error in test integration api');
        return throwError(error);
      }
    );
     }
  
     selectStartDate(item:any){
       //console.log('Start Date',this.datePipe.transform(this.sDate,"MM/dd/yyyy"));
       this.sDate=this.datePipe.transform(item,"MM/dd/yyyy");
       let myDate = this.datePipe.transform(this.sDate,"MM/dd/yyyy");
       console.log('start date here',this.sDate);
       //this.datePipe.transform(date,"yyyy-MM-dd")
       this.bStartDate=true;
       if(this.bEndDate===true){
         this.bTestIntegBtn=false;
       }
     }
     
     selectEndDate(item:any){
      // console.log('End Date', this.eDate.getDay());
       this.eDate = this.datePipe.transform(item,"MM/dd/yyyy");
       console.log('end date here',this.eDate);
       this.bEndDate=false;
       if(this.bStartDate===true){
         this.bTestIntegBtn=false;

       }

     }
    selectedProject(){
      //   <option>99 Acres</option>
     // <option>Magicbricks</option>
     this.newIntegration.sourceType.id=+'1';
     this.newIntegration.companyId = +this.companyId;
     if(this.newIntegration.sourceType.name=="Magicbricks"){
        this.show= false;
     }else{
       this.show = true;
     }
      return;
          }
}
