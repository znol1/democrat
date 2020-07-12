import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import Item = firebase.analytics.Item;
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private usersAcc: any;
  constructor(public fireservices: AngularFirestore, private authservice: AuthService) { }
  k: boolean;
  us: any;
  private actions: any;
  create_Newemployee(Record): any
  {
    return this.fireservices.collection('Employee').add(Record);
  }
  addUser(Record): any
  {
    return this.fireservices.collection('Employee').add(Record);
  }
  get_Allemployee(): any
  {
    return this.fireservices.collection('Employee').snapshotChanges();
  }
  getAllemployee2(): any
  {
    return this.fireservices.collection('Employee/' + '7efXzZqteOujLUt0Urkv' + '/valuers').snapshotChanges();
  }

  update_employee(recordid, record): any
  {
    this.fireservices.doc('Employee/' + recordid).update(record);
    // this.us = this.fireservices.collection<Item>('Employee/' + recordid + '/valusers');
    // this.get_Allemployee().subscribe(data => {
    //
    //   this.us = data.map(e => {
    //     return {
    //       user: e.payload.doc.data().user,
    //     };
    //   });
    //   console.log(this.us);
    // });
  }

  delete_employee(recordid): any
  {
    this.fireservices.doc('Employee/' + recordid).delete();
  }
  valuersAccess(recordid): any {
    const Record = {
      userAccess: this.authservice.curUser
    };
    this.us = this.fireservices.doc('Employee/' + recordid).collection('/valuers').add(Record);
  }
  isAllowedProto(): any {
    // this.getAllemployee2().subscribe(data => {
    //    this.us1 = data.map(e => {
    //     return {
    //       userA: e.payload.doc.data().userAccess,
    //     };
    //   });
    // });
    console.log(this.usersAcc);
  }
  isAllowed(): any {
    this.isAllowedProto();
  }
}
