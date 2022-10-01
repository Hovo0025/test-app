import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

import { CustomValidators } from '@core/utils/custom-validators';
import { CreateEmployeeReqI } from '@core/intefaces/employees.inteface';
import { EmployeesApiService } from '../../services/employees-api.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEmployeeComponent implements OnInit {
  public createEmployeeForm: FormGroup;
  public nameMinLength = 3;
  public nameMaxLength = 50;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly employeesApiService: EmployeesApiService,
              private readonly toastr: ToastrService,
              private readonly location: Location) {
    this.createEmployeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      lastName: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      age: ['', [Validators.required, CustomValidators.numberValidator]],
      gender: ['', [Validators.required]],
      company: ['', []],
      email: ['', [Validators.required, CustomValidators.emailValidator]],
      phone: ['', []]
    });
  }

  ngOnInit(): void {
  }

  onCreateEmployee(): void {
    this.createEmployeeForm.markAllAsTouched();
    if (this.createEmployeeForm.invalid) {
      return;
    }
    const reqData = this.createEmployeeForm.value as CreateEmployeeReqI;
    reqData.id = uuidv4();
    reqData.registered = moment().format('YYYY-MM-DD hh:mm:ss');

    this.employeesApiService.createEmployee(reqData).subscribe((res) => {
      this.toastr.success('Employee created successfully');
      this.router.navigate(['../']);
    }, err => {
      this.toastr.error('Something went wrong while creating employee');
    });
  }

  back(): void {
    this.location.back();
  }
}
