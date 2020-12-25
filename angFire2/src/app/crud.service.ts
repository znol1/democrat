import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import Item = firebase.analytics.Item;
import {element} from 'protractor';
import { ThrowStmt } from '@angular/compiler';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private usersAcc: any;
  constructor(public fireservices: AngularFirestore, private authservice: AuthService) { }
  k: boolean;
  us: any;
  us1: any;
  globalId: any;
  private actions: any;
  employeee: any;
  d: any;
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
  getAllemployee2(recordid)
  {
    return this.fireservices.collection('Employee').doc(recordid).collection('valuers').snapshotChanges();
  }

  updateEmployee(recordid, record): any
  {
    this.fireservices.doc('Employee/' + recordid).update(record);
    console.log(this.authservice.curUser);
    this.us = this.fireservices.collection<Item>('Employee/' + recordid + '/valusers');
    this.get_Allemployee().subscribe(data => {

      this.us = data.map(e => {
        return {
          user: e.payload.doc.data().user,
        };
      });
      console.log(this.us);
    });
  }

  delete_employee(recordid): any
  {
    this.fireservices.doc('Employee/' + recordid).delete();
  }
  valuersAccess(recordid): any {
    const Record = {
      userAccess: this.authservice.currentUserId
    };
    this.us = this.fireservices.doc('Employee/' + recordid).collection('/valuers').add(Record);
  }
  isAllowedProto(recordid): any {
    var arr: string[];
    arr = [];
    this.getAllemployee2(recordid).subscribe(data => {
       this.us1 = data.map(e => {
        return {
          userA: e.payload.doc.data().userAccess,
        };
      });
      this.us1.forEach(i => {
        arr.push(i.userA.toString());
        })
    });
    return arr;
  }
}
