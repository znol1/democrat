import { Component, OnInit } from '@angular/core';
import {CrudService} from '../crud.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  employee: any;
  employeeName: string;
  employeeGenre: string;
  employeeAge: number;
  employeeAddress: string;
  employeeUser: string;
  employeeMark: number;
  userId: string;
  message: string;


  constructor(public crudservice: CrudService, private authservice: AuthService){}

  ngOnInit(): any {
    this.employeeGenre = '';
    this.crudservice.get_Allemployee().subscribe(data => {

      this.employee = data.map(e => {
        return {
          id: e.payload.doc.id,
          isedit: false,
          name: e.payload.doc.data().name,
          genre: e.payload.doc.data().genre,
          age: e.payload.doc.data().age,
          address: e.payload.doc.data().address,
          user: e.payload.doc.data().user,
          mark: e.payload.doc.data().mark,
        };
      });
      console.log(this.employee);

    });
  }

  CreateRecord(): any
  {
    const Record = {
      name: 'Иван',
      genre: '',
      age: 0,
      address: 'string',
      user: this.authservice.curUser,
      mark: 0,
    };
    Record.name = this.employeeName;
    Record.genre = this.employeeGenre;
    Record.age = this.employeeAge;
    Record.address = this.employeeAddress;
    // Record.address = Record.address.replace('\n', '<br>');

    this.crudservice.create_Newemployee(Record).then(res => {

      this.employeeName = '';
      this.employeeGenre = '';
      this.employeeAge = undefined;
      this.employeeAddress = '';
      this.employeeUser = '';
      this.employeeMark = undefined;
      // this.userId = this.crudservice.addUser();
      console.log(res);
      this.message = 'Данные успешно сохранены';
    }).catch(error => {
      console.log(error);
    });

  }

  EditRecord(Record): any
  {
    Record.isedit = true;
    Record.editname = Record.name;
    Record.editage = Record.age;
    Record.editaddress = Record.address;

  }

  Updatarecord(recorddata): any
  {
    const record = {
      name: 'Иван',
      age: 0,
      address: 'string',
    };
    record.name = recorddata.editname;
    record.age = recorddata.editage;
    record.address = recorddata.editaddress;
    this.crudservice.updateEmployee(recorddata.id, record);
    recorddata.isedit = false;
  }

  Deleteemployee(recordid): any
  {
    this.crudservice.delete_employee(recordid);
  }

}
