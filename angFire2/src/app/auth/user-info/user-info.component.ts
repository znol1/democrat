import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  curId: any;
  curName: any;

  constructor(public authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.curId = '';
    this.curName = '';
    setTimeout(() => {    
      this.curId = this.authservice.currentUserId,
      this.curName = this.authservice.currentUserName}, 100
    );
  }
  

}
