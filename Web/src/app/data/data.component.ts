import { Component, OnInit } from '@angular/core';
import { Protocol } from '../modal/Protocol';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Router } from '@angular/router';
  import {throwError} from 'rxjs';
import { Role } from '../modal/Role';
import { Project } from '../modal/project';
import { getDevice } from '../modal/getdevice';
import { getControllerById } from '../modal/controllerbyid';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  user: getControllerById;
  users: getControllerById[];
  cpy=false;
  updateIndex;
  allDevices: getDevice[];
  bRole;
  //companyIds =[1,2,3,4,5];
  updatedUser: getControllerById;
  cpn=false;
  devices: string[];
  projects: string[];
  projectList: Project[];
    constructor(private usersrv: VictorServiceService, private router: Router) { 

      if(sessionStorage.getItem('userName')===null){
        console.log('sesson strorage', sessionStorage.getItem('userName'));
        this.router.navigate(['']);
      }
      this.user =new getControllerById();
      // this.user.getdevice = new getDevice();
      this.users = [];
      this.devices = [];
      this.projects =[];
      console.log(sessionStorage.getItem('updateId'))
      console.log('getfinally')
      if(sessionStorage.getItem('role')==='Caller' ||  sessionStorage.getItem('role')==='Closure'){
          this.bRole=true;
      }else{
        this.bRole=false;
      }
      this.usersrv.getcontrollerbyid(sessionStorage.getItem('updateId')).subscribe((data: getControllerById[])=>{
        this.users = data;
        console.log('Device Data',this.users);
     // this.updateIndex =this.users.indexOf({ "id": 1 });
     console.log(this.users.length)
     console.log('getting id',this.users[0].deviceId)
     for(let i =0;i<this.users.length;i++){
       console.log('for working',i)
       console.log('matching id detail',sessionStorage.getItem('updateId'))
       console.log('type of session',typeof(sessionStorage.getItem('updateId')))
       console.log('type of apiint',typeof(this.users[0].deviceId))
       var a = parseInt(sessionStorage.getItem('updateId'))
       console.log('type of a',typeof(a))
          if(this.users[i].deviceId===(a)){
            this.updateIndex = i;
            this.updatedUser = this.users[i];
            console.log('Details',this.updatedUser);
            break;
          }
     }
      });
      // this.usersrv.getUserRoles().subscribe((data: Role[])=>{
      //   this.allDevices=data;
      //      console.log('role',this.allRoles);
      //      for(let user of data){
      //          this.roles.push(user.name);
      //      }
      //    });
     
      this.usersrv.getUserProject(sessionStorage.getItem('userName')).subscribe((data:Project[])=>{
        this.projectList=data;
        console.log('user projects',this.projectList);
        for(let user of data){
          this.projects.push(user.projectName);
      }
      });
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
    gotoobjects(id:string,name:string){
      console.log('updateUser');
      sessionStorage.setItem('deviceid',id);
      sessionStorage.setItem('name',name);
      console.log('id',sessionStorage.getItem('deviceid'));
      this.router.navigate(['/userhome/deviceobject']);
   }}
