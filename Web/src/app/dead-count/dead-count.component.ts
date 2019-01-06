import { Component, OnInit } from '@angular/core';

import { MyLead } from '../modal/MyLead';
import { VictorServiceService } from '../apiService/victor-service.service';
import {throwError} from 'rxjs';
import { MyItems } from '../modal/MyItems';
import {HttpResponse } from '@angular/common/http';
import { RouterModule, Routes, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dead-count',
  templateUrl: './dead-count.component.html',
  styleUrls: ['./dead-count.component.css']
})
export class DeadCountComponent implements OnInit {

 blist;
  public myLead: MyLead[];
  public selectedLead: MyLead[];
    dropdownSettings = {};
    dropdownList = [];
    selectedUserList = [];
    userList = [];
    loading=false;
  
    dropdownSettingsA = {};
    dropdownListA = [];
    selectedUserListA = [];
    leadDetails:MyLead;
    indexL;
    indexLI;
    leadItems: MyItems[];
  
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
  
    constructor(private rawLeadService: VictorServiceService, private router: Router) {
      if(sessionStorage.getItem('userName')===null){
        console.log('sesson strorage', sessionStorage.getItem('userName'));
        this.router.navigate(['']);
      }
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
  //reload page on each click
  
  
  
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
  
     
  // calling get api for dead count leads: statusId=12,
     this.loading=true;
      this.rawLeadService.getUserLeads('12',sessionStorage.getItem('userName')).subscribe((data: MyLead[]) => {
             
                              this.indexL = data.length;
                             this.myLead = data;
                             this.loading=false;
                                    for(let i=0; i<this.indexL; i++ ) {
                                      for(let j=0; j<this.myLead[i].items.length; j++){
                                        this.userList.push(this.myLead[i].items[j].userName);
                                       
                                           } // end of inner for loop
                                    } // end of outer for loop
                          
                                      return true;
                                  },
                                  error => {
                                    this.loading=false;
                                    console.error("Error in Api!");
                                    return throwError(error);  // Angular 6/RxJS 6
                                  }
                                ); 
                                
    }  // end of ngOnInit
              onItemSelect(item: any, i) {
                             
      } // end of onItemSelect
  
      onItemSelectA(item: any) {
       // console.log(item);
        this.selectedUserListA;
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
                                    this.numberOfSelectedLead = this.numberOfSelectedLead -1;
                                 
                                }
                              }
                                  getDetails(myList:MyLead){
                                    this.leadDetails=myList;
                                   }
      
                                 
}
