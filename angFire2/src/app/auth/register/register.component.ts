
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import {CrudService} from '../../crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userLogin: '';
  email = '';
  password = '';
  message = '';
  errorMessage = ''; // validation error handle
  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle

  constructor(public crudservice: CrudService, private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage(): any
  {
    this.errorMessage = '';
    this.error = {name : '' , message: ''};
  }
  CreateUser(): any
  {
    const Record = {
      name: this.userLogin,
      email: this.email,
    };

    this.crudservice.createNewUser(Record).then(res => {

      this.email = '';
      this.userLogin = '';
      // this.userId = this.crudservice.addUser();
      console.log(res);
      this.message = 'Данные успешно сохранены';
    }).catch(error => {
      console.log(error);
    });

  }

  register(): any
  {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.registerWithEmail(this.email, this.password)
        .then(() => {
          this.CreateUser(),
          console.log(this.authservice.currentUserId)
          this.message = 'you are register with data on firbase';
          this.router.navigate(['/userInfo']);
        }).catch(error => {
        this.error = error
        this.router.navigate(['/register']);
      });
    }
  }

  validateForm(email, password): any
  {
    if (email.lenght === 0)
    {
      this.errorMessage = 'please enter email id';
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }

    if (password.lenght < 6)
    {
      this.errorMessage = 'password should be at least 6 char';
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}
