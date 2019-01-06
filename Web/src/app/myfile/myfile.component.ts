import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {HttpResponse } from '@angular/common/http';
import { Leads } from '../modal/Leads';
import { Router } from '@angular/router';
import { ResourceURI } from '../apilist/ResourceURI';
import { VictorServiceService } from '../apiService/victor-service.service';
import {throwError} from 'rxjs';
//import { HttpErrorResponse } from '@angular/common/https/src/response';
const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}
// headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
@Component({
  selector: 'app-myfile',
  templateUrl: './myfile.component.html',
  styleUrls: ['./myfile.component.css']
})

export class MyfileComponent implements OnInit {
  myFiles:string [] = [];
  myFile:string [] = [];
  headers1: Headers;
  sMsg;
  fileList: Leads[];
  btnDisabled = true;

  
  constructor(private httpService: HttpClient, private router: Router, private srv: VictorServiceService) { 
    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
   this.fileList = [];
  }

  ngOnInit() {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
  }

  getFileDetails (e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
    this.btnDisabled = false;

  }

  cancel(){
    this.router.navigate(['/userhome/home']);
  }
  
 uploadExcelFiles(){
  const frmData = new FormData();
  for (var i = 0; i < this.myFiles.length; i++) { 
    frmData.append("File", this.myFiles[i]);
  }
  this.srv.uploadsLeadsExcelFile(frmData,sessionStorage.getItem('userName')).subscribe(res=>{
    console.log('excel file uploaded',res);
    alert('file uploaded successfully');
    this.router.navigate(['/userhome/home']);
  },error=>{
    //  alert('Wrong user name or password');
      //this.router.navigate(['']);
    // this.loading = false;
    alert('file could not uploadeded');
     console.error('Error in Upload raw leads');
    return throwError(error);
   });
  this.router.navigate(['/userhome/home']);
 }



 downloadFile(){
   console.log('File Downloaded');
 }
}
