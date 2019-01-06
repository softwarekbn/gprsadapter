import { Component, OnInit } from '@angular/core';
import { Document } from '../modal/document';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
documents: Document[];
newDoc: Document;
form1 = false;
myFiles:string [] = [];
  myFile:string [] = [];
//message:string;
numberOfRecord;
//https://www.npmjs.com/package/excel-as-json
  constructor(private docService: VictorServiceService,
     private prjService: VictorServiceService,private router:Router){

      if(sessionStorage.getItem('userName')===null){
        console.log('sesson strorage', sessionStorage.getItem('userName'));
        this.router.navigate(['']);
      }
this.newDoc = new Document();
this.documents = [];
//this.data.currentMessage.subscribe(message => this.message = message);
//sessionStorage.setItem('prjID',this.message);
//console.log('prjID',sessionStorage.getItem('prjID'));

   }

  ngOnInit() {

    if(sessionStorage.getItem('userName')===null){
      console.log('sesson strorage', sessionStorage.getItem('userName'));
      this.router.navigate(['']);
    }
   console.log('document of project',sessionStorage.getItem('prjID'));
    this.docService.getDocumentsOfProject(sessionStorage.getItem('prjID')).subscribe((data: Document[])=>{
      this.documents = data;
      this.numberOfRecord = this.documents.length;
     //console.log('documents', this.documents);
    });
  }
  
  showForm(){
   this.router.navigate(['/userhome/createDocument']);
   //createDocument
   //this.router.navigate(['/admin']);
  }
  cancelForm(){
    this.form1= !this.form1;
  }
  fileChange($event){

  }

  getFileDetails (e) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
    //this.btnDisabled = false;

  }

  
  
 uploadExcelFiles(){
  const frmData = new FormData();
  for (var i = 0; i < this.myFiles.length; i++) { 
    frmData.append("file", this.myFiles[i]);
  }
  this.docService.uploadsLeadsExcelFile(frmData,sessionStorage.getItem('CompanyId')).subscribe(res=>{
    console.log('excel file uploaded',res);
    alert('file uploaded successfully');
  });
  this.router.navigate(['/userhome/home']);
 }
}
