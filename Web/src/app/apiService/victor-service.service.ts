import { Injectable } from '@angular/core';

import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { User } from '../modal/User';
import { map } from 'rxjs/operators';
import { Observable, Subject } from "rxjs";
import { MyLead } from '../modal/MyLead';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Project } from '../modal/project';
import { Document } from '../modal/document';
import { Company } from '../modal/company';
import { BehaviorSubject } from 'rxjs';
import { ResourceURI } from '../apilist/ResourceURI';
import { Registration } from '../modal/Registration';
import {Device} from '../modal/device';
import { ResourceLoader } from '@angular/compiler';
import { Integrations } from '../modal/integrations';
import { Protocol } from '../modal/Protocol';
import { Objects } from '../modal/object';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
//import 'rxjs/add/observable/merge';
//import 'rxjs/add/operator/map';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const httpOptions1 = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};


const httpOptions2 = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data',
                              'boundary': ','    })
};
@Injectable({
  providedIn: 'root'
})
export class VictorServiceService {
   httpOptionsAuth = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                               'Authorization': 'Bearer ' +sessionStorage.getItem('vctoken')})
  };
 
  


  constructor(private http: HttpClient) { 
   
  }

 //login
 public sendPost(userData: User):Observable<any> {
            console.log('Login API called');
            console.log(userData.username);
            console.log(userData.password)
            return this.http.post(ResourceURI.pLogin,
              "username="+userData.username+"&password="+userData.password+
              "&grant_type="+userData.grant_type,httpOptions1);
       } // end of login


  // uploads excel file
  public uploadsLeadsExcelFile(formdata: FormData,userName):Observable<any> {
      
        return this.http.post(ResourceURI.pUploadLeads+'?userName='+userName, formdata);
   } 
 // get raw leads, ie all leads
 public uploadsDocument(formdata: FormData,prjID):Observable<any> {
      let prjIDn = +prjID;
  return this.http.post(ResourceURI.pDocumentOfProject+prjIDn+'/Document', formdata);
} // end of login

//get rawleads by login username
 public getRawLeads(userName) {
            return this.http.get(ResourceURI.gRawLeads + userName, httpOptions);
       }// end of getUrlLeads

//get Raw leads by Company Id
  public getRawLeadsCmp(companyId) {
        return this.http.get(ResourceURI.gRawLeadsCmp + companyId, httpOptions);
   }// end of getUrlLeads
   public getCmpLeadsByStatus(companyId,statusId) {
    return this.http.get(ResourceURI.gLeadsWithStatusIdAndCompanyId + companyId+'&statusid='+statusId, httpOptions);
}// end of getUrlLeads

//get all user by companyId
getAllUserCmp(companyId){
  return this.http.get(ResourceURI.gUserCmp+companyId, httpOptions);
}

public getTenRawLeadsNew(pageNumber) {
        // console.log('at raw ten leads service');
pageNumber = String(pageNumber);
return this.http.get(ResourceURI.gTenRawLeadsPno+sessionStorage.getItem('userName')+
                    '&pagesize=10&pagenumber='+pageNumber,httpOptions);
         }// end of geTentUrlLeads 
public getTenRawLeads(pageNumber)
     {
      pageNumber = String(pageNumber);
       return this.http.get(ResourceURI.gTenRawLeadsPno+sessionStorage.getItem('userName')+
                               '&pagesize=10&pagenumber='+pageNumber,httpOptions);
           }// e
public getTenRawLeads1(companyId,pageNumber)
           {
            pageNumber = String(pageNumber);
             return this.http.get(ResourceURI.gRawLeadsByCompId+companyId+
                                 '&pageSize=10&pageNumber='+pageNumber,httpOptions);
                 }//
  // get count of all type of leads
public getDetails(userName) {
    //console.log('at service');
               return this.http.get(ResourceURI.gLeadCount + userName,httpOptions);
        }

//  get leads by statusid
public getUserLeads(statusId,userName) {
                return this.http.get(ResourceURI.gLeadsByStatusId+userName+'&statusid='+statusId, httpOptions);
 
      }// end of get leads by status id

 // get list of assignee
public getAssigneeList() {
                 return this.http.get(ResourceURI.gUser, httpOptions);
         }// end of get Assignee 
  public getAssigneeListA(id) {
          return this.http.get(ResourceURI.gUsers+id + '/Users', httpOptions);
  }// end of get Assignee 

 public getAllProjects(userName){
          return this.http.get(ResourceURI.gAllProjects+userName, httpOptions);
        }   
        public getAllProjectsA(id){
          return this.http.get(ResourceURI.gAllProjects + id, httpOptions);
        }  
public getProjectsOfCompany(companyId){
          return this.http.get(ResourceURI.gProjectsOfCompany+companyId, httpOptions);
        }

public getAllDocuments(){
          return this.http.get(ResourceURI.gAllDocuments, httpOptions);
        }        

// get all documents of a particular project
public getDocumentsOfProject(projectID){
  console.log('get doc of projId:', projectID);        
  return this.http.get(ResourceURI.gDocumentByProjectID+projectID+'/documents', httpOptions);
        }

// post project
public postProject(project: Project):Observable<any>{
          return this.http.post(ResourceURI.pProject,project, this.httpOptionsAuth);
        } // end of post project


// post Lead




//assining the raw lead


                    public exportAsExcelFile(json: any[], excelFileName: string): void {
                      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
                      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                      this.saveAsExcelFile(excelBuffer, excelFileName);
                    }
                    private saveAsExcelFile(buffer: any, fileName: string): void {
                       const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
                       FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
                    }


                    getIpAddress() {
                      return this.http.get('https://ipinfo.io/json',httpOptions);
                            
                  }
       
     
        
         
         
          updateCompany(cmp: Company,companyId):Observable<any>{
            return this.http.put( ResourceURI.uCompany + companyId,cmp, httpOptions);
          // return  this.http.post(this.postAddDocUrl, formData, options)
          }
          postAddCompany(cmp: Company ):Observable<any>{
            return this.http.post( ResourceURI.pCompany,cmp, httpOptions);
          // return  this.http.post(this.postAddDocUrl, formData, options)
          }
          postAddUser(usr: Registration ):Observable<any>{
            console.log('user')
            return this.http.post(ResourceURI.pAddUser,usr, httpOptions);
          // return  this.http.post(this.postAddDocUrl, formData, options)
          }
          postAddDevice(usr:Device):Observable<any>{
            console.log('device')
            return this.http.post(ResourceURI.pDevice,usr, httpOptions);
          // return  this.http.post(this.postAddDocUrl, formData, options)
          }
          postAddProtocol(name,user:Protocol):Observable<any>{
            console.log('device')
            return this.http.post(ResourceURI.gProtocol + name + '/Protocol',user, httpOptions);
          // return  this.http.post(this.postAddDocUrl, formData, options)
          }
          postAddObject(name,user:Objects):Observable<any>{
            console.log('device')
            return this.http.post(ResourceURI.gObject + name + '/Object',user, httpOptions);
          // return  this.http.post(this.postAddDocUrl, formData, options)
          }
          getUserRoles(){
            return this.http.get(ResourceURI.gUserRole, httpOptions);
          }

          getDevice(){
            console.log('device')
            return this.http.get(ResourceURI.pDevice, httpOptions);
          // return  this.http.post(this.postAddDocUrl, formData, options)
          }
          getUserProject(userName: any){
            return this.http.get(ResourceURI.gUserProject+userName, httpOptions);
          }
          updateUser(usr: Registration ):Observable<any>{
            return this.http.put(ResourceURI.uUser,usr, httpOptions);
          // return  this.http.post(this.postAddDocUrl, formData, options)
          }

          deleteUser(usr: Registration ):Observable<any>{
            return this.http.delete(ResourceURI.dUser, httpOptions);
          // return  this.http.post(this.postAddDocUrl, formData, options)
          }

          getAllUser(userName){
            return this.http.get(ResourceURI.gUser+userName, httpOptions);
          }

          getAllDevice(){
            return this.http.get(ResourceURI.gDevice, httpOptions);
          }
          getAllProtocol(){
            return this.http.get(ResourceURI.gProtocol, httpOptions);
          }

          getAllCompanies(){
           const httpOptionsAuthG = {
              headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                         'Authorization': 'Bearer ' +sessionStorage.getItem('vctoken')})
            };
            //this.vcheaders.append('Authorization', sessionStorage.getItem('vctoken'));
            return this.http.get(ResourceURI.gCompanies, httpOptionsAuthG);
          }
         
         // addCompany(id){
           // return this.http.get(ResourceURI.pCompany, httpOptions);
         // }
          deleteCompany(id){
            return this.http.get(ResourceURI.dCompany, httpOptions);
          }
//1/Integrations
          public getIntegrations(compId){
            return this.http.get(ResourceURI.gIntegrataions + compId+ '/Integrations', httpOptions);
          }  
          public postIntegrations(cid, newIntegration:Integrations){
            return this.http.post(ResourceURI.pIntegration + cid + '/Integrations',newIntegration, httpOptions);
          }  
          public getCompany(id){
          
            return this.http.get(ResourceURI.gCompany,httpOptions);
          }

          public postLeads(lead: MyLead, LeadId:any):Observable<any>{
            return this.http.put(ResourceURI.pLeads + LeadId, lead,httpOptions);
          }
          public getLocations(userName){
            return this.http.get(ResourceURI.gLocations + userName ,httpOptions);
            //return this.http.get(ResourceURI.gLocations + userName ,httpOptions);
          }
        
      public postTestIntegration(sDate,eDate,CompanyId,newIntegration:Integrations[]):Observable<any>{
        //startDate=09/11/2018&endDate=11/11/2018&CompanyId=46
        let addUrl = 'startDate='+sDate+'&endDate='+eDate+'&CompanyId='+CompanyId;
            return this.http.post(ResourceURI.pTestIntegration+addUrl,newIntegration,httpOptions);
      }

      // public getTestApi(){
      //   return this.http.get(ResourceURI.gtestapi);

      // }
}

//https://angular.io/guide/form-validation
//https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/