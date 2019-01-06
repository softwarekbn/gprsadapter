import { Component, OnInit } from '@angular/core';
import { Registration } from '../modal/Registration';
import { VictorServiceService } from '../apiService/victor-service.service';
import { Router } from '@angular/router';
  import {throwError} from 'rxjs';
import { Role } from '../modal/Role';
import { Project } from '../modal/project';
@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  user: Registration;
  users: Registration[];
  cpy=false;
  updateIndex;
  allRoles: Role[];
  bRole;
  //companyIds =[1,2,3,4,5];
  updatedUser: Registration;
  cpn=false;
  roles: string[];
  projects: string[];
  projectList: Project[];
    constructor(private usersrv: VictorServiceService, private router: Router) { 

      if(sessionStorage.getItem('userName')===null){
        console.log('sesson strorage', sessionStorage.getItem('userName'));
        this.router.navigate(['']);
      }
      this.user =new Registration();
      this.user.role = new Role();
      this.users = [];
      this.roles = [];
      this.projects =[];
      if(sessionStorage.getItem('role')==='Caller' ||  sessionStorage.getItem('role')==='Closure'){
          this.bRole=true;
      }else{
        this.bRole=false;
      }
      this.usersrv.getAllUserCmp(sessionStorage.getItem('updatedCid')).subscribe((data: Registration[])=>{
        this.users = data;
        console.log('All User',this.users);
     // this.updateIndex =this.users.indexOf({ "id": 1 });
     for(let i =0;i<this.users.length;i++){
          if(this.users[i].id===sessionStorage.getItem('updateId')){
            this.updateIndex = i;
            this.updatedUser = this.users[i];
            
            console.log('before update',this.updatedUser);
            break;
          }
     }
      });
      this.usersrv.getUserRoles().subscribe((data: Role[])=>{
        this.allRoles=data;
           console.log('role',this.allRoles);
           for(let user of data){
               this.roles.push(user.name);
           }
         });
     
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
    confirmPassword(event: any){
       //console.log('cp',event.target.value);
      // console.log('p',this.user.password);
       if(this.updatedUser.password === event.target.value){
          this.cpy = true;
          this.cpn = false;
       }else{
        this.cpy = false;
        this.cpn = true;
       }
        //this.user.password = event.target.value;
       // console.log('password', this.user.password);
    }
    selectedRole(){
      //  console.log(this.user.roleName);
      for(let i =0;i<this.allRoles.length;i++){
        if(this.updatedUser.role.name===this.allRoles[i].name)
            {
              this.updatedUser.role.roleID= this.allRoles[i].roleID;
              this.updatedUser.role.name=this.allRoles[i].name;
              return;

            }
}
      }
    selectedProject(){
    //  console.log(this.user.projectName);
    //updatedUser.project.projectName
    for(let index=0;index<this.projectList.length;index++){
       if(this.updatedUser.project.projectName==this.projectList[index].projectName){
          this.updatedUser.project.projectId=this.projectList[index].projectId;
          this.updatedUser.projectId= this.projectList[index].projectId;
       }
      }
    }
    selectedCompanyId(){

    }
    updateUser(){
      console.log('user updated',this.updatedUser);
      
    //console.log(this.user.phoneNumber);
  console.log('updateduser',this.updatedUser);
    this.usersrv.updateUser(this.updatedUser).subscribe((res: any)=>{
     console.log(res);
     alert('update user successfully');
     this.router.navigate(['/userhome/manageUser']);

    },error=>{
      console.error('error in post api of update user');
      alert(' could not be updated, Try again');
      this.router.navigateByUrl('/userhome/manageIntegrations');
      return throwError(error);
      
    });
  }
    cancelUpdate(){
      this.router.navigate(['/userhome/manageUser']);
    }
}
