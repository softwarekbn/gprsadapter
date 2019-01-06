import { Component, OnInit } from '@angular/core';
import { MyLead } from '../modal/MyLead';
import { VictorServiceService } from '../apiService/victor-service.service';
import {throwError} from 'rxjs';
import { MyItems } from '../modal/MyItems';
import {HttpResponse } from '@angular/common/http';
import { RouterModule, Routes, NavigationEnd, Router } from '@angular/router';
import { Company } from '../modal/company';

@Component({
  selector: 'app-currentleads',
  templateUrl: './currentleads.component.html',
  styleUrls: ['./currentleads.component.css']
})
export class CurrentleadsComponent implements OnInit {

  remarks;
  x:string[] = [];
  statusId='1'
  expand=[true,true,true,true,true,true,true,true,true,true];
  collapse=[false,false,false,false,false,false,false,false,false,false];
  expandN=[true,true,true,true,true,true,true,true,true,true];
  collapseN=[false,false,false,false,false,false,false,false,false,false];
  name;
  xN:string[]=[];
  selectedCompanyName;
  selectedCompanyId;
  companies: Company[];
  blist;
  loading = false;
  public myLead: MyLead[];
  public selectedLead: MyLead[];
  dropdownSettings = {};
  dropdownList = [];
  selectedUserList = [];
  userList = [];
  leadDetails:MyLead;
  dropdownSettingsA = {};
  dropdownListA = [];
  selectedUserListA = [];
  len;
  indexL;
  indexLI;
  leadItems: MyItems[];
  length;
  filter = false;
  isRowSelect= false;
  isUserSelect = false;
  isAssignSelect = false;
  isButton = false;
  msg = false;
  msg2 = false;
  public numberOfSelectedLead = 0;
  key;
  arr = [];
  newlist: string[];
 
   constructor(private currentLeadService: VictorServiceService, private router: Router,) {
     //this.myLead = new MyLead[10];

     if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
     this.newlist = [];
     this.myLead=[];
     this.selectedCompanyId=sessionStorage.getItem('CompanyId');
    // this.myLead= new MyItems;
    if(sessionStorage.getItem('role')==='SuperAdmin'){
                this.loading=true;
              this.currentLeadService.getAllCompanies().subscribe((data: Company[])=>{
                this.companies = data;
                this.loading=false;
                console.log('CompanyList',this.companies,this.companies.length);
                
                this.selectedCompanyName=this.companies[0].companyName;

              },error=>{
                this.loading=false;
                console.error('Error in get Api, Companies!');
                return throwError(error);
            });
          }//end of if statement
            // calling current leads api            
            this.loading=true;
        this.currentLeadService.getCmpLeadsByStatus(this.selectedCompanyId,this.statusId).subscribe((data:MyLead[])=>{
          this.myLead = data;
          this.length=this.myLead.length;
          console.log('current leads',this.myLead);
          this.loading=false;
          for(let i =0;i<this.myLead.length;i++){
            this.xN[i] = this.myLead[i].name.substring(0,20);
          }//cmpctLabel.substring
        },error=>{
          console.error('Error in calling Current Leads Api!');
          return throwError(error);
        });
    




 //
 
     this.selectedLead = [];
     this.router.routeReuseStrategy.shouldReuseRoute = function(){
       return false;
    }
 
    this.router.events.subscribe((evt) => {
       if (evt instanceof NavigationEnd) {
          // trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
          // if you need to scroll back to top, here is the right place
          window.scrollTo(0, 0);
       }
   });
    } // end of constructor
 
   ngOnInit() {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
  
     this.dropdownSettings = {
       singleSelection: false,
       idField: 'item_id',
       textField: 'item_text',
       unSelectAllText: 'UnSelect All',
       itemsShowLimit: 3,
       allowSearchFilter: true
     };
     this.dropdownSettingsA = {
       singleSelection: false,
       idField: 'item_id',
       textField: 'item_text',
       unSelectAllText: 'UnSelect All',
       itemsShowLimit: 3,
       allowSearchFilter: true
     };
                              
                               
   }  // end of ngOnInit
   getCurrentLeadsOfSelectedCmp(){

   }
             onItemSelect(item: any, i) {
                            //   console.log('Aarif');
                          //    console.log(this.myLead[i].selectedUserList);
                               } // end of onItemSelect
 
                                onItemSelectA(item: any) {
                                  
                                  if(this.selectedUserListA.length!=0){
                                      this.isUserSelect = true;
                                  }
      
                                 } // end of onItemSelectA
                                
                                // event on check box
                                 onRowSelect(event: any, i) {
                                 if(event== true){
                                 this.numberOfSelectedLead = this.numberOfSelectedLead +1;
                                 this.arr.push(i);
                              
                               }else{
                                 
                                   let index = this.arr.indexOf(i); // returns 0
                                   this.arr.splice(index, 1);
                                   //The first parameter is the index at which we want to remove,
                                   // and the second is the number of elements to remove, starting from that index.
                                 
                                 this.numberOfSelectedLead = this.numberOfSelectedLead -1;

                               }
                                 
                                 }
                                 getDetails(myList:MyLead){
                                  this.leadDetails=myList;
                                 }
                                 showN(name,i){
                                  this.expandN[i]=!this.expandN[i];
                                  this.collapseN[i]=!this.collapseN[i];
                                  this.name=name;
                                  console.log('Show more');
                                } 
     
    
}
