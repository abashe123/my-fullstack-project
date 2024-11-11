import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  userRole:any

  
  ngOnInit(): void {
    this.userRole = localStorage.getItem('currentUser')
    console.log("testing",this.userRole)
    console.log("testing boolean",this.userRole.includes('user'))
  }
  
}

