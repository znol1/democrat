import { Component, OnInit } from '@angular/core';
import {CrudService} from '../crud.service';
import {AuthService} from '../auth.service';
import {isBooleanLiteralLike} from 'codelyzer/util/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  editmark: number;
  private usersAcc: any;
  k: boolean;
  u: any;
  employee: any;
  us1: any;
  ready: boolean;
  l = localStorage.getItem('bool');
  constructor(public crudservice: CrudService, private authservice: AuthService){}

  ngOnInit(): any {
    this.crudservice.get_Allemployee().subscribe(data => {

      this.employee = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          name: e.payload.doc.data().name,
          age: e.payload.doc.data().age,
          address: e.payload.doc.data().address,
          user: e.payload.doc.data().user,
          mark: e.payload.doc.data().mark,
        };
      });
    });
    this.ready = false;
    this.k = true;
    // this.crudservice.globalId = 'HKIsfUDMOWIjTHuCyOxF';
    // this.crudservice.getAllemployee2().subscribe(data1 => {
    //   this.us1 = data1.map(e => {
    //     return {
    //       userA: e.payload.doc.data().userAccess,
    //     };
    //   });
    // });
    // this.usersAcc = this.us1;
    // this.k = true;
    // if (this.usersAcc !== undefined) {
    //   for (const n of this.usersAcc) {
    //     console.log(n.userA);
    //     console.log('блаблабла');
    //     if (n.userA === this.authservice.curUser){
    //       this.k = false;
    //     }
    //     // this.k = n.userA !== this.authservice.curUser;
    //     console.log('Живе Беларусь');
    //   }
    // }else {
    //   console.log('даттебаё');
    // }
    // console.log(this.authservice.curUser);
  }

  UpdateMark(recorddata, recordid): any
  {
    const record = {
      mark: 0,
      userId: 'Иван',
    };
    this.crudservice.isAllowedProto(recordid);
    record.mark = Number(recorddata.editmark) + recorddata.mark;
    this.crudservice.updateEmployee(recordid, record);
    recorddata.isedit = false;
    record.userId = recorddata.user;
    this.crudservice.valuersAccess(recordid);
    console.log(record.userId);
    localStorage.setItem('bool', 'true');
    // this.l = localStorage.getItem('bool');
    // this.crudservice.isAllowed();
    this.crudservice.globalId = recordid;
    //   .subscribe(data1 => {
    //   this.us1 = data1.map(e => {
    //     return {
    //       userA: e.payload.doc.data().userAccess,
    //     };
    //   });
    // });
    this.usersAcc = this.us1;
    console.log(this.usersAcc);
    if (this.usersAcc !== undefined) {
      for (const n of this.usersAcc) {
        console.log(n.userA);
        if (n.userA === this.authservice.curUser){
          this.k = false;
        }
        // this.k = n.userA !== this.authservice.curUser;
        console.log('Живе Беларусь');
      }
    }
    console.log(this.k);
  }
}
