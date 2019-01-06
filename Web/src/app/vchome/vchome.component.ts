import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vchome',
  templateUrl: './vchome.component.html',
  styleUrls: ['./vchome.component.css']
})
export class VchomeComponent implements OnInit {

  constructor(private router: Router) { 
    if(sessionStorage.getItem('userName')===null){
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

}
