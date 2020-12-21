import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  curUser = localStorage.getItem('user');
  authState: any = null;


  constructor(private afu: AngularFireAuth, private router: Router) {
    this.afu.authState.subscribe((autho => {
      this.authState = autho;
    }));
  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authState.email;
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    return (this.authState !== null) && (!this.isUserAnonymousLoggedIn);
  }

  registerWithEmail(email: string, password: string): any {
    return this.afu.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        localStorage.setItem('user', this.authState.user.uid);
        this.curUser = localStorage.getItem('user');
      })
      .catch(error => {
        console.log(error)
        throw error;
      });
  }



  loginWithEmail(email: string, password: string): any
  {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        localStorage.setItem('user', this.authState.user.uid);
        this.curUser = localStorage.getItem('user');
        console.log(this.curUser);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  singout(): void
  {
    this.afu.signOut();
    this.router.navigate(['/login']);
  }


}
