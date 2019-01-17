import { Component, OnInit } from '@angular/core';
import { Protocol } from '../modal/Protocol';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Router } from '@angular/router';
  import {throwError} from 'rxjs';
import { Role } from '../modal/Role';
import { Project } from '../modal/project';
import { getDevice } from '../modal/getdevice';
import { getProtocolById } from '../modal/getprotocolbyid';
import { getObjectById } from '../modal/getobjectbyid';
import { Objects } from '../modal/object';

@Component({
  selector: 'app-deviceobject',
  templateUrl: './deviceobject.component.html',
  styleUrls: ['./deviceobject.component.css']
})
export class DeviceobjectComponent implements OnInit {

  object: getObjectById;
  objects: getObjectById[];
  cpy=false;
  updateIndex;
  allobjects:getObjectById;
  allDevices: getDevice[];
  bRole;
  a;
  //companyIds =[1,2,3,4,5];
  getobjects: getObjectById;
  cpn=false;
  devices: string[];
  projects: string[];
    constructor(private usersrv: VictorServiceService, private router: Router) { 

      if(sessionStorage.getItem('userName')===null){
        console.log('sesson strorage', sessionStorage.getItem('userName'));
        this.router.navigate(['']);
      }
      this.object =new getObjectById();
      // this.user.getdevice = new getDevice();
      this.objects = [];
      this.devices = [];
      this.projects =[];
      console.log(sessionStorage.getItem('deviceid'))
      console.log('getfinally')
      if(sessionStorage.getItem('role')==='Caller' ||  sessionStorage.getItem('role')==='Closure'){
          this.bRole=true;
      }else{
        this.bRole=false;
      }
      this.usersrv.getObjectsbyid(sessionStorage.getItem('deviceid')).subscribe((data: getObjectById[])=>{
        this.objects = data;
        console.log('All Objects',this.objects);
     // this.updateIndex =this.users.indexOf({ "id": 1 });
     console.log(this.objects.length)
     for(let i =0;i<this.objects.length;i++){
       this.allobjects = this.objects[i];
       this.a = sessionStorage.getItem('name')
       console.log('allobjects', this.allobjects)
       break;
     }

      });
      
      // this.usersrv.getUserRoles().subscribe((data: Role[])=>{
      //   this.allDevices=data;
      //      console.log('role',this.allRoles);
      //      for(let user of data){
      //          this.roles.push(user.name);
      //      }
      //    });
     
      
     // console.log(this.roles);
    }
  
    ngOnInit() {

      if(sessionStorage.getItem('userName')===null){
        console.log('sesson strorage', sessionStorage.getItem('userName'));
        this.router.navigate(['']);
      }
    }
    // confirmPassword(event: any){
    //    //console.log('cp',event.target.value);
    //   // console.log('p',this.user.password);
    //    if(this.updatedUser.password === event.target.value){
    //       this.cpy = true;
    //       this.cpn = false;
    //    }else{
    //     this.cpy = false;
    //     this.cpn = true;
    //    }
    //     //this.user.password = event.target.value;
    //    // console.log('password', this.user.password);
    // }
//     selectedRole(){
//       //  console.log(this.user.roleName);
//       for(let i =0;i<this.allRoles.length;i++){
//         if(this.updatedUser.role.name===this.allRoles[i].name)
//             {
//               this.updatedUser.role.roleID= this.allRoles[i].roleID;
//               this.updatedUser.role.name=this.allRoles[i].name;
//               return;

//             }
// }
//       }
    // selectedProject(){
    // //  console.log(this.user.projectName);
    // //updatedUser.project.projectName
    // for(let index=0;index<this.projectList.length;index++){
    //    if(this.updatedUser.project.projectName==this.projectList[index].projectName){
    //       this.updatedUser.project.projectId=this.projectList[index].projectId;
    //       this.updatedUser.projectId= this.projectList[index].projectId;
    //    }
    //   }
    // }
    selectedCompanyId(){

    }
    gotoobjects(id:string){
      console.log('updateUser');
      sessionStorage.setItem('deviceid',id);
      console.log('id',sessionStorage.getItem('deviceid'));
      this.router.navigate(['/userhome/deviceobject']);
   }}
