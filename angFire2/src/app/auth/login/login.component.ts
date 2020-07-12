import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = ''; // validation error handle
  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle
  constructor(public authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  clearErrorMessage(): any {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  login(): any
  {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.loginWithEmail(this.email, this.password)
        .then(() => {
          console.log('');
        }).catch(error => {
        this.error = error;
        this.router.navigate(['/login']);
      });
    }
  }
  logout(): any {
    this.router.navigate(['/login']);
    this.authservice.curUser = '';
  }
  validateForm(email, password): any {
    if (email.lenght === 0) {
      this.errorMessage = 'please enter email id';
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }

    if (password.lenght < 6) {
      this.errorMessage = 'password should be at least 6 char';
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}
