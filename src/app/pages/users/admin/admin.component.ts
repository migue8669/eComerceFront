import { EmployeeService } from './../../../service/employee.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  idType: any;
  employeesObject: any;
  constructor(private employeeService: EmployeeService) {
    this.idType = ['CC', 'CE', 'RC', 'TI'];
  }

  ngOnInit(): void {
    this.getEmployes();
  }

  employeeForm = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    id: new FormControl(''),
    idType: new FormControl(''),
    lockStatus: new FormControl(false),
  });

  onSubmit(formDirective: FormGroupDirective): void {
    for (let el of this.employeesObject) {
      console.log(el);
      if (el.id == this.employeeForm.value.id) {
        alert('Ya existe un empleado con esa identificacion');
        formDirective.resetForm();

        break;
      } else {
        console.log(this.employeeForm.value);
        this.employeeService
          .create(this.employeeForm.value)
          .subscribe((response) => {
            console.log(response);
          });
      }
    }
  }

  getEmployes(): void {
    this.employeeService.getAll().subscribe((data) => {
      this.employeesObject = data;
      console.log(data);
    });
  }
  update(index: any): void {
    this.employeesObject[index].lockStatus =
      !this.employeesObject[index].lockStatus;
    this.employeeService
      .update(this.employeesObject[index].id, this.employeesObject[index])
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
