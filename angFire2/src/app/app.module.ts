import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserInfoComponent } from './auth/user-info/user-info.component';
import { FilterPipe } from './pipes/filter.pipe';
import { RatePipe } from './pipes/rate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HeaderComponent,
    MainComponent,
    CreateComponent,
    LoginComponent,
    RegisterComponent,
    UserInfoComponent,
    FilterPipe,
    RatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
